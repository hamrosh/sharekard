import Vendors from "../../models/VendorModel";
import { gql } from "apollo-server";
//import { doesNotReject } from "assert";

export const typeDefs = gql`
  #   scalar Date
  type Vendor {
    id: String
    vendorName: String!
    #   ID for company log in FOR ALL
    vendorID: String!

    profilePic: String
    ownerName: String!
    #   required
    ownerNumber: String!

    vCardFront: String
    vCardBack: String

    # vendorLogo: String
    # address: [Address]
    # contacts: [Contact]
    users: [User]
  }
  type User {
    #    admin , sales_person
    role: String!
    userName: String!
    password: String!
    isActivated: Boolean
  }

  type Address {
    address1: String
    address2: String
    landmark: String
    city: String
    state: String
    pincode: String
  }
  type Contact {
    contactPerson: String
    mobileNumber: String
  }
  extend type Query {
    allVendors: [Vendor]
    vendorById(id: String): Vendor
    vendorByName(vendorName: String): [Vendor]
    VendorActivation(id: ID): String
  }
  extend type Mutation {
    addVendor(input: VendorInput): Vendor
    updateVendor(vendorID: ID, input: VendorInput): Vendor
    delVendor(id: ID): String
    createVendorUser(vendorID: ID, input: UserInput): String
  }

  input VendorInput {
    vendorName: String!
    #   ID for company log in FOR ALL
    vendorID: String!

    profilePic: String
    ownerName: String
    #   required
    ownerNumber: String

    vCardFront: String
    vCardBack: String
    profilePic: String
    vendorLogo: String
    address: [AddressInput]
    contacts: [ContactInput]
    users: [UserInput]
  }
  input UserInput {
    #    admin , sales_person
    role: String!
    userName: String!
    password: String!
    isActivated: Boolean
  }
  input AddressInput {
    address1: String
    address2: String
    landmark: String
    city: String
    state: String
    pincode: String
  }
  input ContactInput {
    contactPerson: String
    mobileNumber: String
  }
`;

export const resolvers = {
  Query: {
    allVendors: (root, args, context) => {
      return Vendors.find({});
    },
    vendorById: (root, args, context) => {
      return Vendors.findById(args.id);
    },
    vendorByName: (root, args, context) => {
      console.log(args.vendorName.toString().toUpperCase());
      return Vendors.find({
        vendorName: new RegExp("\\b" + args.vendorName, "i")
      });
    }
  },
  Mutation: {
    addVendor: async (root, { input }, context) => {
      console.log(input);
      let newVendor = new Vendors(input);
      let nVendor = await newVendor.save();
      return nVendor;
    },
    updateVendor: (root, { vendorID, input }, context) => {
      return new Promise((resolve, reject) => {
        console.log(input);
        Vendors.findByIdAndUpdate(
          { _id: vendorID },
          input,
          { new: true }
          //{dateUpdated:  Date.now()}
        ).exec((err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    delVendor: (root, { id }, context) => {
      return new Promise((resolve, reject) => {
        console.log(id);

        Vendors.findByIdAndRemove(
          id

          //{dateUpdated:  Date.now()}
        ).exec((err, res) => {
          if (err) reject(err);
          else resolve("Removed successfully!");
        });
      });
    },
    createVendorUser: async (root, { vendorID, input }, context) => {
      // console.log("xxx", vendorID, "  ", input);

      let userName = input.userName;

      return new Promise(async (resolve, reject) => {
        const userExist = userExists(userName, vendorID);

        userExist.then(present => {
          console.log("Present", present);
          console.log("Vendor ID", vendorID);

          if (!present) {
            Vendors.findOneAndUpdate(
              { _id: vendorID },
              {
                $push: {
                  users: input
                }
              },
              { new: true },
              (err, doc, res) => {
                if (err) resolve(err);
                else {
                  console.log(res);
                  console.log(doc);
                  resolve("Updated successfully!");
                }
              }
            );
          } else {
            resolve("User already exists!");
          }
        });
      });
    }
  }
};

async function userExists(userName, vendorID) {
  console.log("User being inserted : ", userName);
  let flag = false;
  return new Promise(function(resolve, reject) {
    Vendors.findById(
      {
        _id: vendorID
      },
      (err, res) => {
        if (err) reject("Not Found!");
        if (res) {
          // resolve(res); //FOUND
          res.users.some(user => {
            console.log(user.userName);
            if (user.userName === userName) {
              flag = true;
              return user.userName === userName;
            } else {
              flag = false;
              return;
            }
          });
          return resolve(flag);
        }
      }
    );
  });
}
