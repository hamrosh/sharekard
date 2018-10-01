import mongoose from "mongoose";
import { AddressSchema } from "./AddressModel";
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  gender: String,
  companyName: String,
  OTP: String,
  OTPCreatedDate: { type: Date, default: Date.now },
  isOTPVerified: { type: Boolean, default: false },
  OTPVerifiedDate: Date,
  createdDate: { type: Date, default: Date.now },
  createdBy: { identifier: String, creatorType: String }, // user/admin/vendor

  mobileIMEI: String,
  mobileModel: String,
  vCardFront: String,
  vCardBack: String,
  profilePic: String,
  companyLogo: String,
  address: AddressSchema
});

const Visitors = mongoose.model("visitor", VisitorSchema);
export default Visitors;
