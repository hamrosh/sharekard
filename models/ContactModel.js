import mongoose from "mongoose";

export const ContactSchema = new mongoose.Schema(
  {
    contactPerson: String,
    mobileNumber: String
  },
  { _id: false }
);
