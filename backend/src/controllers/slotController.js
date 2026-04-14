import pool from "../config/db.js";

const BUFFER_MINUTES = 10;

export const getAvailableSlots = async (req, res) => {
  try {

    // 🔥 AUTO DELETE PAST BOOKINGS (ADD THIS)
    await pool.query("DELETE FROM bookings WHERE start_time < NOW()");

    const { date, eventId } = req.query;

    const selectedDate = new Date(date);
    const day = selectedDate.getDay();

    // ✅ Check if selected date is today
    const now = new Date();
    const isToday = now.toDateString() === selectedDate.toDateString();

    // 1. Availability
    const availabilityRes = await pool.query(
      "SELECT * FROM availability WHERE user_id = $1 AND day_of_week = $2",
      [1, day]
    );

    if (availabilityRes.rows.length === 0) {
      return res.json([]);
    }

    const availability = availabilityRes.rows[0];

    // 2. Event duration
    const eventRes = await pool.query(
      "SELECT duration FROM event_types WHERE id = $1",
      [eventId]
    );

    const duration = eventRes.rows[0].duration;

    // 3. Existing bookings
    const bookingsRes = await pool.query(
      "SELECT start_time, end_time FROM bookings WHERE event_type_id = $1",
      [eventId]
    );

    const bookings = bookingsRes.rows;

    const slots = [];

    let start = new Date(`${date}T${availability.start_time}`);
    const end = new Date(`${date}T${availability.end_time}`);

    const bufferMs = BUFFER_MINUTES * 60 * 1000;

    while (start < end) {
      const slotStart = new Date(start);
      const slotEnd = new Date(start.getTime() + duration * 60000);

      // ✅ Skip past slots ONLY for today
      if (isToday && slotStart <= now) {
        start = new Date(start.getTime() + duration * 60000);
        continue;
      }

      if (slotEnd <= end) {

        const isBlocked = bookings.some(b => {
          const bookingStart = new Date(b.start_time);
          const bookingEnd = new Date(b.end_time);

          const bufferEnd = new Date(bookingEnd.getTime() + bufferMs);

          return (
            slotStart < bufferEnd &&
            slotEnd > bookingStart
          );
        });

        if (!isBlocked) {
          slots.push(slotStart.toTimeString().slice(0, 5));
        }
      }

      // ✅ clean slot movement
      start = new Date(start.getTime() + duration * 60000);
    }

    res.json(slots);

  } catch (error) {
    console.error("SLOT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};