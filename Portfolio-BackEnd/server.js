import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Contact from "./models/conctact.js"; 
dotenv.config();
import {connectDB} from "./config/db.js"; // Import the database connection

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/api/contact", async (req, res) => {
    try {
        const contact = new Contact(req.body);

        await contact.save();

        console.log("Contact information saved successfully");

        res.status(201).json({
            message: "Contact information saved successfully",
            receivedData: contact
        });

    } catch (error) {
        console.error("Error saving contact information:", error);

        res.status(500).json({
            message: "Error saving contact information",
            error: error.message
        });
    }
});

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();