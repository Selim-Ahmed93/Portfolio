import mongoose from "mongoose";

const { Schema, model } = mongoose;

const contactSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        subject: { type: String, required: true }
    },
    { timestamps: true }
)

const Contact = model("Contact", contactSchema);

export default Contact;
