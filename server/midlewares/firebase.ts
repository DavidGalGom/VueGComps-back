import admin from "firebase-admin";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("components:firebase");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "vuegcomps.appspot.com",
});

const firebase = async (req, res, next) => {
  const bucket = admin.storage().bucket();
  await bucket.upload(req.file.path);
  await bucket.file(req.file.filename).makePublic();
  const fileURL = bucket.file(req.file.filename).publicUrl();
  debug(chalk.green(fileURL));
  req.file.fileURL = fileURL;
  next();
};

export default firebase;
