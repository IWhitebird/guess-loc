const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const cron = require('node-cron');

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

router.post("/storescore", authorize, async (req, res) => {
  try {
    const { score } = req.body; 

    console.log(req.body)

    if(!score){
      return res.status(400).json({ error: "Score is required" });
    }

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
      return res.status(200).json({ change : true ,  message: "Max score updated successfully" });
    } else {
      return res.status(200).json({ change : false , message: "Max score remains unchanged" });
    }
  } catch (error) {
    console.error("Error while updating max score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/counter" , async (req , res) => {
  try{
    const result = await pool.query(`
      SELECT counter_value
      FROM daily_counter
    `);
    const counterValue = result.rows[0].counter_value;
    res.json({ counterValue });
  }
  catch(error){
    console.error('Error getting counter:', error);
    res.status(500).send("Server error");
  }
})

router.get("/update-counter" , async (req , res) => {
  try {
    // Increment the counter and return the updated value
    const result = await pool.query(`
      UPDATE daily_counter
      SET counter_value = counter_value + 1
      RETURNING counter_value
    `);

    const counterValue = result.rows[0].counter_value;
    res.json({ counterValue });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

async function resetCounter() {
  try {
    await pool.query(`
      UPDATE daily_counter
      SET counter_value = 0
    `);
    console.log('Counter has been reset to 0.');
  } catch (error) {
    console.error('Error resetting counter:', error);
  }
}

cron.schedule('0 0 * * *', resetCounter);

module.exports = router;