import { ObjectId } from "mongodb";
import database from "../../loaders/database";
import { User } from "../../helper/models/schema";
import ErrorClass from "../../helper/types/error";

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
    return { success: true, status: 201, message: "User found", data: data };
  } catch (error) {
    throw new ErrorClass(
      error.message ?? "Error adding User",
      error.status.code ?? 500
    );
  }
};
