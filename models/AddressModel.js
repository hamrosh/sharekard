import mongoose from "mongoose";

export const AddressSchema = new mongoose.Schema(
  {
    address1: String,
    address2: String,
    landmark: String,
    city: String,
    state: String,
    pincode: String
  },
  { _id: false }
);
