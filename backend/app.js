const express = require("express");
const dbConnection = require("./dbConfig");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoute");
const answerRoutes = require("./routes/answerRoute");
const questionRoutes = require("./routes/questionRoute");

app.use(express.json());

app.use(cors());

// Middleware to serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// User routes middleware
app.use("/api/user", userRoutes);

// Question routes middleware
app.use("/api/question", questionRoutes);

// Answers routes middleware
app.use("/api/answer", answerRoutes);

// Catch-all handler for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const start = async () => {
  try {
    const result = await dbConnection.execute("select 'test' ");
    app.listen(PORT, () => {
      console.log("Database connection established.");
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server:", error.message);
  }
};

start();
