const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/userinfo", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name , user_maxscore FROM users WHERE user_id = $1",
      [req.user.id] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/storescore", authorize, async (req, res) => {
  try {
    const { score } = req.body;

    // Step 1: Retrieve the current maximum score of the user from the database
    const userResult = await pool.query(
      "SELECT user_name, user_maxscore FROM users WHERE user_id = $1",
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];
    const currentMaxScore = user.user_maxscore;

    // Step 2: Compare the current maximum score with the new score
    if (score > currentMaxScore) {
      // Step 3: If the new score is higher, update the maximum score in the database
      await pool.query(
        "UPDATE users SET user_maxscore = $1 WHERE user_id = $2",
        [score, req.user.id]
      );
      res.json({ message: "Max score updated successfully" });
    } else {
      res.json({ message: "Max score remains unchanged" });
    }
  } catch (error) {
    console.error("Error while updating max score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;