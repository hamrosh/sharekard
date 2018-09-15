import mongoose from "mongoose";
import { AddressSchema } from "./AddressModel";
import { ContactSchema } from "./ContactModel";

const Schema = mongoose.Schema;

const OrganiserSchema = new Schema({
  organiserName: { type: String, required: true },
  //ID for company log in FOR ALL
  organiserID: String,
  profilePic: String,
  ownerName: String,
  ownerNumber: { type: String, required: true, unique: true },
  createdDate: { type: Date, default: Date.now },
  vCardFront: String,
  vCardBack: String,
  profilePic: String,
  organiserLogo: String,
  address: AddressSchema,
  contacts: [ContactSchema]
  // users: [
  //   {
  //     role: String,
  //     userName: String,
  //     password: String,
  //     isActivated: Boolean
  //   }
  // ]
});

const Organisers = mongoose.model("organiser", OrganiserSchema);
export default Organisers;
