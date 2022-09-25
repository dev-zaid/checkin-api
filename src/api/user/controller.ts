import { ObjectId } from "mongodb";
import { User } from "../../helper/models/schema";
import ErrorClass from "../../helper/types/error";
import database from "../../loaders/database";

export const findUser = async (userID: any) => {
  try {
    const id = new ObjectId(userID);
    const data = await (await database())
      .collection<User>("users")
      .findOne({ _id: id });
    if (!data) {
      throw new ErrorClass("User does not exist", 400);
    }
    return { success: true, status: 201, message: "User found", data: data };
  } catch (error) {
    throw new ErrorClass(
      error.message ?? "Error finding User",
      error.status.code ?? 500
    );
  }
};
