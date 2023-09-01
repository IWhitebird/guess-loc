const express= require("express");
const app = express();
const cors = require("cors");

//middleware

const PORT = process.env.PORT || 5000;

app.use(cors(
    [
        "http://localhost:3000",
        "http://localhost:5000",
        "https://geolocquiz.netlify.app",
        "https://guess-loc.vercel.app"
    ]
));
app.use(express.json());

//routes

app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));  

app.listen(PORT, () => {
    console.log("Server is running on port 5000");
    }
);

