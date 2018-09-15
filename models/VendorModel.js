import mongoose from "mongoose";
import { AddressSchema } from "./AddressModel";
import { ContactSchema } from "./ContactModel";

const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  vendorName: { type: String, required: true },
  //ID for company log in FOR ALL
  vendorID: String,

  profilePic: String,
  ownerName: String,
  ownerNumber: { type: String, required: true, unique: true },

  createdDate: { type: Date, default: Date.now },
  vCardFront: String,
  vCardBack: String,
  profilePic: String,
  vendorLogo: String,
  address: AddressSchema,
  contacts: [ContactSchema],
  users: [
    {
      // admin , sales_person
      role: String,
      userName: { type: String, unique: true },
      password: String,
      isActivated: Boolean
    }
  ]
});

const Venders = mongoose.model("vendor", VendorSchema);
export default Vendors;
