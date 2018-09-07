import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema(
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

const VisitorSchema = new Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  gender: String,
  companyName: String,
  OTP: String,
  isOTPVerified: { type: Boolean, default: false },
  OTPVerifiedDate: Date,
  createdDate: { type: Date, default: Date.now },
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
