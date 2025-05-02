require("dotenv").config();
const db = require("./utils/db");
const express = require("express");
const routes  = require("./routes");
const cors = require('cors');


try {
  const app = express();
  app.use(express.json()); 
  app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed methods
    credentials: true // If you need to send cookies
  }));
  app.use('/api/v1', routes)

  // Global error handler (500)
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  app.listen(process.env.PORT, () => {
    db.db();
    console.log(`🚀 app listening on port ${process.env.PORT}`);
  });
} catch (error) {
  console.error(`Error starting the Server \nError Stack: ${error}`);
}
