import pool from "../config/db.js";
import { sendBookingEmail } from "../services/emailService.js";

// ✅ CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { eventId, name, email, date, time } = req.body;

    // Convert to Date
    const startTime = new Date(`${date}T${time}`);

    // 🔍 Get event details (duration + title)
    const eventRes = await pool.query(
      "SELECT duration, title FROM event_types WHERE id = $1",
      [eventId]
    );

    if (eventRes.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const duration = eventRes.rows[0].duration;
    const eventTitle = eventRes.rows[0].title;

    // Calculate end time
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // 🧠 Insert booking (unique constraint prevents double booking)
    const result = await pool.query(
      `INSERT INTO bookings (event_type_id, name, email, start_time, end_time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [eventId, name, email, startTime, endTime]
    );

    // 📧 Send confirmation email (non-blocking)
    sendBookingEmail(email, eventTitle, date, time);

    // ✅ Response
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("BOOKING ERROR:", error);

    // Handle duplicate booking
    if (error.code === "23505") {
      return res.status(400).json({ error: "Slot already booked" });
    }

    res.status(500).json({ error: error.message });
  }
};



// ✅ GET ALL BOOKINGS
export const getBookings = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bookings ORDER BY start_time ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};



// ❌ CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE bookings SET status = 'cancelled' WHERE id = $1",
      [id]
    );

    res.json({ message: "Booking cancelled" });
  } catch (error) {
    console.error("CANCEL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};