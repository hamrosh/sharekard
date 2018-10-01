import mongoose from "mongoose";
import { AddressSchema } from "./AddressModel";
import { ContactSchema } from "./ContactModel";

const Schema = mongoose.Schema;

//EventSchema.index({ userName: 1 }, { unique: true });

const EventSchema = new Schema({
  eventName: { type: String, required: true },
  //ID for company log in FOR ALL
  //vendorID: { type: String, required: true, unique: true },

  eventLogo: String,
  eventLogoThumb: String,

  //ownerNumber: { type: String, required: true, unique: true },
  entryFees: [{ amount: String, type: String, description: String }],
  fromDate: Date,
  toDate: Date,
  timeSlots: [{ startTime: Date, endTime: Date }],
  createdDate: { type: Date, default: Date.now },
  address: AddressSchema,
  contacts: [ContactSchema],
  city: String,
  area: String,
  venue: String,
  categories: [String], //industries
  totalVendors: String,
  website: String,
  frequency: String //annual etc
});
EventSchema.index({ city: 1 });
EventSchema.index({ area: 1 });
const Events = mongoose.model("event", EventSchema);
export default Events;
