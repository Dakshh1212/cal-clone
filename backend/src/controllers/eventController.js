import pool from "../config/db.js";

export const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM event_types");
    res.json(result.rows);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
export const createEvent = async (req, res) => {
    try {
      const { title, description, duration, slug } = req.body;
  
      const result = await pool.query(
        `INSERT INTO event_types (user_id, title, description, duration, slug)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [1, title, description, duration, slug] // user_id = 1 (default)
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("CREATE EVENT ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  };
  export const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      await pool.query("DELETE FROM event_types WHERE id = $1", [id]);
  
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("DELETE EVENT ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  };