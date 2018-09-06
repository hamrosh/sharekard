import Visitors from "../../models/VisitorModel";
import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date
  type Visitor {
    fullName: String!
    mobileNumber: String!
    gender: String
    companyName: String
    OTP: String
    isOTPVerified: Boolean
    OTPVerifiedDate: Date

    mobileIMEI: String
    mobileModel: String
  }
  type Query {
    allVisitors: [Visitor]
    VisitorById(id: String): Visitor
  }

  type Mutation {
    addVisitor(input: VisitorInput): Visitor
  }
  input VisitorInput {
    fullName: String!
    mobileNumber: String!
    gender: String
    companyName: String
    # OTP: String
    # isOTPVerified: Boolean
    # OTPVerifiedDate: Date

    mobileIMEI: String
    mobileModel: String
  }
`;
export const resolvers = {
  Query: {
    allVisitors: () => {
      return Visitors.find({});
    },
    VisitorById: (root, { id }, context) => {
      //      console.log(id);
      return Visitors.findById(id);
    }
  },
  Mutation: {
    addVisitor: (root, { input }, context) => {
      return new Promise((resolve, reject) => {
        //console.log(input);
        let newVisitor = new Visitors(input);
        console.log(newVisitor);
        newVisitor.save((error, nVisitor) => {
          resolve(nVisitor);
        });
      });
    }
  }
};
