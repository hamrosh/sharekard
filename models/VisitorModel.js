import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  gender: String,
  companyName: String,
  OTP: String,
  isOTPVerified: { type: Boolean, default: false },
  OTPVerifiedDate: Date,
  createdDate: { type: Date, default: Date.now },
  mobileIMEI: String,
  mobileModel: String
});

const Visitors = mongoose.model("visitor", VisitorSchema);
export default Visitors;
