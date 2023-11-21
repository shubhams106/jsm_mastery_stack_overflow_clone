"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import error from "next/error";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error, "while getting user by id");
    throw error;
  }
}

export async function createUser(param: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(param);
    return newUser;
  } catch (error) {
    console.log(error, "while createUser user");
    throw error;
  }
}

export async function updateUser(param: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = param;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error, "while getting user by id");
    throw error;
  }
}

export async function deleteUser(param: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = param;
    // const user = await User.findOneAndDelete({ clerkId });
    // not sure if i usefindOneAndDelete
    const user = await User.findOne({ clerkId });
    if (!user) {
      return console.log("user not found");
    }
    // delete user intarctions from ques, answers, tags, etc

    await Question.deleteMany({ author: user._id });

    // const userQuestionsId = await Question.find({ author: user._id }).distinct("_id");

    const deletedUser = await User.findByIdAndDelete({ clerkId: user._id });
    // const deletedUser = await User.findByIdAndDelete(user._id);

    // deleted user

    return deletedUser;
  } catch (error) {
    console.log(error, "while getting user by id");
    throw error;
  }
}
