import Events from "../../models/EventModel";
import { gql } from "apollo-server";

export const typeDefs = gql`
  type Event {
    eventName: String!
    eventLogo: String
    eventLogoThumb: String
    entryFees: [EntryFees]
    fromDate: Date
    toDate: Date
    timeSlots: [TimeSlot]
    createdDate: Date
    address: Address
    contacts: [Contact]
    city: String
    area: String
    venue: String
    categories: [String]
    totalVendors: String
    website: String
    frequency: String
  }
  type TimeSlot {
    startTime: Date
    endTime: Date
  }
  type EntryFees {
    amount: String
    type: String
    description: String
  }
  extend type Query {
    allEvents: [Event]
    # eventByVenue(venue: String): Event
  }
  extend type Mutation {
    addEvent(input: EventInput): Event
    # updateEvent(input: EventInput): Event
    # delEvent(id: ID): String
  }
  input EventInput {
    eventName: String!
    eventLogo: String
    eventLogoThumb: String
    entryFees: [EntryFeesInput]
    fromDate: Date
    toDate: Date
    timeSlots: [TimeSlotInput]
    createdDate: Date
    address: AddressInput
    contacts: [ContactInput]
    city: String
    area: String
    venue: String
    categories: [String]
    totalVendors: String
    website: String
    frequency: String
  }
  input EntryFeesInput {
    amount: String
    type: String
    description: String
  }
  input TimeSlotInput {
    startTime: Date
    endTime: Date
  }
`;

export const resolvers = {
  Query: {
    allEvents: async () => {
      return await Events.find({});
    }
  },

  Mutation: {
    addEvent: (root, { input }, context) => {}
  }
};
