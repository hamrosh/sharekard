import Organisers from "../../models/OrganiserModel";
import { gql } from "apollo-server";

export const typeDefs = gql`
  type Organiser {
    organiserName: String!
    #   ID for company log in FOR ALL
    organiserID: String
    profilePic: String
    ownerName: String!
    ownerNumber: String!
    createdDate: Date
    vCardFront: String
    vCardBack: String
    organiserLogo: String
    # Address/Contact and its Inputs all are defined in VendorSchema
    address: Address
    contacts: [Contact]
  }
  #   type Contact {
  #     contactPerson: String
  #     mobileNumber: String
  #   }
  extend type Query {
    allOrganisers: [Organiser]
    # organiserById(venue: String): Organiser
  }
  extend type Mutation {
    addOrganiser(input: OrganiserInput): Organiser
    updateOrganiser(id: ID, input: OrganiserInput): Organiser
    delOrganiser(id: ID): String
  }

  input OrganiserInput {
    organiserName: String!
    #   ID for company log in FOR ALL
    organiserID: String
    profilePic: String
    ownerName: String
    ownerNumber: String
    createdDate: Date
    vCardFront: String
    vCardBack: String
    profilePic: String
    organiserLogo: String
    address: AddressInput
    contacts: [ContactInput]
  }
`;

export const resolvers = {
  Query: {
    allOrganisers: async () => {
      return await Organisers.find({});
    }
  },

  Mutation: {
    addOrganiser: async (root, { input }, context) => {
      console.log(input);
      let newOrganiser = new Organisers(input);
      let nOrganiser = await newOrganiser.save();
      return nOrganiser;
    },
    delOrganiser: (root, { id }, context) => {
      return new Promise((resolve, reject) => {
        console.log(id);

        Organisers.findByIdAndRemove(
          id

          //{dateUpdated:  Date.now()}
        ).exec((err, res) => {
          if (err) reject(err);
          else resolve("Removed successfully!");
        });
      });
    },
    updateOrganiser: (root, { id, input }, context) => {
      return new Promise((resolve, reject) => {
        console.log(input);

        Organisers.findByIdAndUpdate(
          id,
          input,
          { new: true }
          //{dateUpdated:  Date.now()}
        ).exec((err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    }
  }
};
