import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      
      <h1 className="text-3xl font-bold mb-4">
        Cal Clone Booking App 🚀
      </h1>

      <p className="text-gray-600 mb-6">
        Book meetings easily with our scheduling system
      </p>

      <Link
        href="/dashboard"
        className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
      >
        Go to Dashboard
      </Link>

    </div>
  );
}