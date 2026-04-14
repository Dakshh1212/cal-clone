"use client";
import React, { useEffect, useState } from "react";

export default function BookingPage({ params }) {
  const { slug } = React.use(params);

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Fetch event
  useEffect(() => {
    fetch("http://localhost:8000/api/events")
      .then(res => res.json())
      .then(data => {
        const found = data.find(e => e.slug === slug);
        setEvent(found || null);
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingEvent(false));
  }, [slug]);

  // ✅ Fetch slots
  const fetchSlots = async (selectedDate) => {
    if (!event) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/slots?date=${selectedDate}&eventId=${event.id}`
      );
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Booking
  const handleBooking = async () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          name,
          email,
          date,
          time: selectedSlot,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔄 Loading state
  if (loadingEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading event...</p>
      </div>
    );
  }

  // ❌ Event not found
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Event not found</p>
      </div>
    );
  }

  // ✅ Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow border text-center w-full max-w-sm">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Booking Confirmed 🎉
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {date} at {selectedSlot}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl shadow border p-4 sm:p-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {event.title}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {event.description}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            ⏱ {event.duration} mins
          </p>
        </div>

        {/* Date Picker */}
        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-black outline-none"
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setDate(e.target.value);
            setSelectedSlot(null);
            fetchSlots(e.target.value);
          }}
        />

        {/* Slots */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {loading ? (
            <p className="text-sm text-gray-500 col-span-full">
              Loading slots...
            </p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-gray-400 col-span-full">
              No slots available
            </p>
          ) : (
            slots.map((slot, i) => (
              <button
                key={i}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 text-sm rounded-lg border transition ${
                  selectedSlot === slot
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                {slot}
              </button>
            ))
          )}
        </div>

        {/* Form */}
        {selectedSlot && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-600">
              Selected: <b>{selectedSlot}</b>
            </p>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-black outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-black outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleBooking}
              className="w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}