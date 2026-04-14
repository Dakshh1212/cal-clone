import pool from "../config/db.js";

// SET availability
export const setAvailability = async (req, res) => {
  try {
    const { day_of_week, start_time, end_time, timezone } = req.body;

    const result = await pool.query(
      `INSERT INTO availability (user_id, day_of_week, start_time, end_time, timezone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [1, day_of_week, start_time, end_time, timezone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("SET AVAILABILITY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET availability
export const getAvailability = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM availability WHERE user_id = $1",
      [1]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET AVAILABILITY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};