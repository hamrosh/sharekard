import Visitors from "../../models/VisitorModel";
import { gql } from "apollo-server";
import randomize from "randomatic";

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
    OTPVerifier(id: ID, enteredOTP: String): String
  }

  type Mutation {
    addVisitor(input: VisitorInput): Visitor
    updateVisitor(input: VisitorInput): Visitor
    delVisitor(id: ID): String
  }
  input VisitorInput {
    id: ID
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
    allVisitors: async () => {
      return await Visitors.find({});
    },
    VisitorById: async (root, { id }, context) => {
      //      console.log(id);
      return await Visitors.findById(id);
    },
    OTPVerifier: async (root, { id, enteredOTP }, context) => {
      //OTPVerification(id, enteredOTP);
      // console.log(id, " ", enteredOTP);

      let data = await Visitors.findById(id);
      if (data.OTP === enteredOTP) return "OTP verified successfully!!!!";
      else return "OTP is incorrect !!!!";
      //
      //   return new Promise((resolve, reject) => {
      //     Visitors.findById(id, (err, data) => {
      //       if (data.OTP === enteredOTP) resolve("OTP verified successfully!!!!");
      //       else resolve("OTP is incorrect !!!!");
      //     });
      //   });
    }
  },
  Mutation: {
    addVisitor: (root, { input }, context) => {
      return new Promise((resolve, reject) => {
        //console.log(input);
        let OTP = randomOTPGenerator();
        console.log(".......");
        console.log(OTP);
        input.OTP = OTP;
        let newVisitor = new Visitors(input);
        console.log(newVisitor);
        newVisitor.save((error, nVisitor) => {
          resolve(nVisitor);
        });

        // send an SMS with OTP for verification
        console.log(
          "Your OTP is " +
            OTP +
            ". Please enter it in your OTP verification box..."
        );
      });
    },

    updateVisitor: (root, { input }, context) => {
      return new Promise((resolve, reject) => {
        console.log(input);

        Visitors.findByIdAndUpdate(
          input.id,
          { fullName: input.fullName }
          //{dateUpdated:  Date.now()}
        ).exec((err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    delVisitor: (root, { id }, context) => {
      return new Promise((resolve, reject) => {
        console.log(id);

        Visitors.findByIdAndRemove(
          id

          //{dateUpdated:  Date.now()}
        ).exec((err, res) => {
          if (err) reject(err);
          else resolve("Removed successfully!");
        });
      });
    }
  }
};

function randomOTPGenerator() {
  let OTP = "";
  OTP = randomize("0", 5, { exclude: "0" });
  return OTP;
}

function OTPVerification(id, enteredOTP) {
  //console.log(id + "," + enteredOTP);
}
