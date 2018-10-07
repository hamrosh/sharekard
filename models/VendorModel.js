import mongoose from "mongoose";
import { AddressSchema } from "./AddressModel";
import { ContactSchema } from "./ContactModel";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // admin , sales_person
    role: String,
    userName: { type: String, required: true },
    password: String,
    isActivated: Boolean
  },
  { _id: false }
);
userSchema.index({ userName: 1 });
//userSchema.index({ userName: 1 }, { unique: true }, { sparse: true });

// userSchema.pre("save", next => {
//   console.log("");
//   let user = Vendors.users.id("5ba62bc5be0c0b1900b0e567");
//   console.log("IN PRE SAVE");
//   console.log(user);
//   next();
// });

const VendorSchema = new Schema({
  vendorName: { type: String, required: true },
  //ID for company log in FOR ALL
  vendorID: { type: String, required: true, unique: true },

  profilePic: String,
  ownerName: { type: String, required: true },
  ownerNumber: { type: String, required: true },

  createdDate: { type: Date, default: Date.now },
  vCardFront: String,
  vCardBack: String,
  profilePic: String,
  vendorLogo: String,
  address: [AddressSchema],
  contacts: [ContactSchema],
  users: [userSchema]
});

const Vendors = mongoose.model("vendor", VendorSchema);
export default Vendors;
