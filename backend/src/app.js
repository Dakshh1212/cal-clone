import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use("/api/events", eventRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/test-db", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("DB Error");
    }
  });

export default app;