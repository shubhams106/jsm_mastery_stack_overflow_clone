"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath, revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: any) {
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
    console.log(error, "while getting user by id");
    throw error;
  }
}

export async function updateUser(param: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = param;
    const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
    return updatedUser;
  } catch (error) {
    console.log(error, "while getting user by id");
    throw error;
  }
}

export async function deleteUser(param: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = param;
    const user = await User.findOne({ clerkId });
    if (!user) {
      return console.log("user not found");
    }
    // delete user intarctions from ques, answers, tags, etc

    await Question.deleteMany({ author: user._id });

    const userQuestionsId = await Question.find({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error, "while getting user by id");
    throw error;
  }
}
