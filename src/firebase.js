// import { initializeApp } from "firebase-admin/app";
// import { getAuth } from "@firebase/auth";


// const firebaseConfig = {
//     apiKey: "AIzaSyBn2Seq2SIPI7aF1D2rjlhPfOR1pAdjssM",
  
//     authDomain: "webapp-appointments.firebaseapp.com",
  
//     databaseURL: "https://webapp-appointments-default-rtdb.firebaseio.com",
  
//     projectId: "webapp-appointments",
  
//     storageBucket: "webapp-appointments.appspot.com",
  
//     messagingSenderId: "204832763234",
  
//     appId: "1:204832763234:web:7ee115084b59ad59c8503b",
  
//     measurementId: "G-XYHRX0CXZW",
//   };

//   const admin = require("firebase-admin");
// //   const { getDatabase } = require('firebase-admin/database');

// // // Get a database reference to our blog
// // const db = getDatabase();
// // const ref = db.ref('server/saving-data/fireblog');


// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://webapp-appointments-default-rtdb.firebaseio.com",
//   databaseAuthVariableOverride: {
//     uid: "my-service-worker"
//   }

// });

// // As an admin, the app has access to read and write all data, regardless of Security Rules
// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// admin.auth().listUsers().then(data=>{console.log(data.users)})

//   export const app = initializeApp(firebaseConfig);
//   export const auth = getAuth(app);
