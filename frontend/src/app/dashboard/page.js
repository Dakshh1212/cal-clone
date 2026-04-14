"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-2xl font-semibold mb-6">Event Types</h1>

      <div className="space-y-4">
        {events.map(event => (
          <div
            key={event.id}
            className="p-5 bg-white border rounded-2xl shadow-sm hover:shadow transition"
          >
            <h2 className="text-lg font-medium">{event.title}</h2>
            <p className="text-sm text-gray-500">{event.duration} mins</p>

            <Link
              href={`/book/${event.slug}`}
              className="inline-block mt-3 text-sm text-blue-600 hover:underline"
            >
              View Booking Page →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}