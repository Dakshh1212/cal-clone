# 📅 Cal.com Clone (Booking System)

A full-stack scheduling application inspired by Cal.com, allowing users to create event types and let others book available time slots.

---

## 🚀 Features

### Core Features

* Create and manage event types (15, 30, 60 mins)
* Set weekly availability
* Generate dynamic time slots based on duration
* Book meetings with name & email
* Prevent double bookings using database constraints

### Bonus Features

* 📧 Email confirmation using Nodemailer
* 📱 Responsive design (mobile, tablet, desktop)
* ❌ Cancel booking functionality
* 🚫 Disabled already booked slots in UI
* ⚡ Clean UI inspired by Cal.com

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd cal-clone
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=8000
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cal_clone

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Assumptions

* Single default user (no authentication required)
* All event types belong to one user
* Availability is fixed for weekdays (Mon–Fri)
* Time slots generated dynamically using duration
* Booking conflicts handled at database level

---

## 📸 Screens

* Dashboard (Event Types)
* Booking Page
* Confirmation Page

---

## 📌 Future Improvements

* Rescheduling bookings
* Google Calendar integration
* Multiple users with authentication
* Advanced availability (date overrides, custom schedules)

---

## 🙌 Author

Daksh Thakral

---

## 🔗 Links

* Frontend: (add after deployment)
* Backend API: (add after deployment)

---

## 📌 Notes

This project was built as part of a full-stack/backend assignment.
Focus was on clean architecture, real-world features, and scalable design.
