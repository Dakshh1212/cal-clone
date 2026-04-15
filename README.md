# Cal.com Clone - Booking System 🚀

## 🔗 Deployed App
Frontend: https://cal-clone-iota-eight.vercel.app  
Backend: https://cal-backend-gzoc.onrender.com  

---

## 📌 Overview
This is a full-stack Cal.com-style booking application where users can view event types and book available time slots.

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL (Render)

---

## ⚙️ Features

- View event types (30 min, 60 min, etc.)
- Dynamic booking page using slug
- Time slot generation based on availability
- Prevent double bookings
- Store bookings (name, email, time)
- Responsive UI (mobile + desktop)
- Deployed on Vercel & Render

---

## 🚀 How It Works

1. User selects an event
2. Picks a date
3. Available slots are generated
4. User enters name & email
5. Booking is saved in PostgreSQL

---

## 🧠 Database Design

### Tables:
- event_types
- availability
- bookings

---

## ⚠️ Assumptions

- Single user system (no login required)
- Default availability (9 AM – 5 PM)
- Same schedule for weekdays

---

## 🔥 Challenges Faced

- CORS issues during deployment
- Connecting Render PostgreSQL with backend
- Handling environment variables correctly
- Fixing wrong database connections

---

## 👨‍💻 Author

Daksh Thakral  
Chitkara University (2027)