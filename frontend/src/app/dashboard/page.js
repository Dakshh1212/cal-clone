"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const BASE_URL = "https://cal-backend-gzoc.onrender.com";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Event Types
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading events...</p>
      )}

      {/* No events */}
      {!loading && events.length === 0 && (
        <p className="text-gray-400">No events available</p>
      )}

      {/* Events list */}
      <div className="space-y-4 max-w-xl">
        {events.map(event => (
          <div
            key={event.id}
            className="p-5 bg-white border rounded-2xl shadow-sm hover:shadow transition flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {event.title}
              </h2>
              <p className="text-sm text-gray-500">
                {event.duration} mins
              </p>
            </div>

            <Link
              href={`/book/${event.slug}`}
              className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              View Page
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}