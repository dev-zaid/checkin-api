import { ObjectId } from "mongodb";
import database from "../../loaders/database";
import { User } from "../../helper/models/schema";
import ErrorClass from "../../helper/types/error";
import { google } from "googleapis";
import config from "../../config";
const updateSheet = async (data: any) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "../../../keys.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();

  const googleSheetsInstance = google.sheets({ version: "v4", auth: client });
  const spreadsheetID = config.google.sheetURL;
  await googleSheetsInstance.spreadsheets.values.append({
    auth,
    spreadsheetID,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[data._id, data.name, data.regNo, data.domain, data.email]],
    },
  });
};
export const addUserData = async (userID: string, domain: string) => {
  try {
    const id = new ObjectId(userID);

    //Search for user in DB
    const data = await (await database())
      .collection<User>("users")
      .findOne({ _id: id });
    if (!data) {
      throw new ErrorClass("User does not exist", 400);
    }

    //Add user to Domain Collection
    const addUserDomain = await (await database())
      .collection<User>(domain)
      .insertOne({ ...data });
    if (!addUserDomain) {
      throw new ErrorClass("User could not be added to domain db", 400);
    }
    await updateSheet(data);
    return { success: true, status: 201, message: "User found", data: data };
  } catch (error) {
    throw new ErrorClass(
      error.message ?? "Error adding User",
      error.status.code ?? 500
    );
  }
};
