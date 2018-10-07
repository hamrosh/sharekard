import Visitors from "../../models/VisitorModel";
import { gql } from "apollo-server";
import randomize from "randomatic";
import { fetch } from "apollo-server-env";
import queryString from "querystring";
import { app as appVar } from "../../config/config";

import axios from "axios";

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
    OTPCreatedDate: Date
    mobileIMEI: String
    mobileModel: String
  }
  type Query {
    allVisitors: [Visitor]
    visitorById(id: String): Visitor
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
    OTPCreatedDate: Date
    mobileIMEI: String
    mobileModel: String
  }
`;
export const resolvers = {
  Query: {
    allVisitors: async () => {
      return await Visitors.find({});
    },
    visitorById: async (root, { id }, context) => {
      //      console.log(id);
      return await Visitors.findById(id);
    },
    OTPVerifier: async (root, { id, enteredOTP }, context) => {
      //OTPVerification(id, enteredOTP);
      // console.log(id, " ", enteredOTP);

      let data = await Visitors.findById(id);

      // check for OTP expiry

      let min = appVar.OTPExpiry;

      // console.log("Milli sec: ", min);
      // console.log("DATA: ", data.OTPCreatedDate);
      // //console.log(Date() - new Date(data.OTPCreatedDate));

      var date1 = new Date();
      var date2 = new Date(data.OTPCreatedDate);
      var timeDiff = Math.abs(date2 - date1);
      var diff = Math.ceil(timeDiff / (1000 * 60)) - 1;
      console.log(date1);
      console.log(date2);
      console.log(diff);
      return new Promise((resolve, reject) => {
        if (diff < min) {
          console.log("ON");
          if (data.OTP === enteredOTP) {
            // OTP matched -- set isVerified=true and VerificatonDate =date1
            Visitors.findByIdAndUpdate(
              id,
              {
                isOTPVerified: true,
                OTPVeriedDate: date1
              }
              //{dateUpdated:  Date.now()}
            ).exec((err, res) => {
              if (err) reject(err);
              else resolve("OTP verified successfully!");
            });
            //return "OTP verified successfully!!!!";
          } else {
            console.log("OTP is incorrect!");
            return resolve("OTP is incorrect!");
          }
        } else {
          // console.log("OTP EXPIRED!");
          return resolve("OTP EXPIRED!");
        }
      });
    }
  },
  Mutation: {
    addVisitor: (root, { input }, context) => {
       return new Promise((resolve, reject) => {
        console.log(input);

        let OTP = randomOTPGenerator();
        console.log(".......");
        console.log(OTP);
        input.OTP = OTP;
        let mobile = input.mobileNumber;
        let newVisitor = new Visitors(input);
        console.log(newVisitor);
        newVisitor.save((error, nVisitor) => {
          if (error) return reject(error);

          // commented for testing   --uncomment it later
          sendOTPtoVisitor(OTP, mobile);

          resolve(nVisitor);
          //console.log("SEND AN SMS WITH OTP...");
        });
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
  OTP = randomize("0", 6, { exclude: "0" });
  return OTP;
}

function OTPVerification(id, enteredOTP) {
  //console.log(id + "," + enteredOTP);
}

function sendOTPtoVisitor(otp, mobile) {
  let msg = "OTP for registration on ShareKard is " + otp,
    username = "hamroshroy@gmail.com",
    hash = "07ca7be8d9da49ceb018a38af7883d47a71f31c90d48dd67d3b90c36b10a7b69",
    sender = "SHRKRD";

  let getqs =
    "?username=" +
    username +
    "&hash=" +
    hash +
    "&numbers=" +
    mobile +
    "&sender=" +
    sender +
    "&message=" +
    msg +
    "&test=0";

  // console.log("qs : ", qs);
  axios
    .get("http://api.textlocal.in/send/" + getqs, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(err => console.log(err));
}
