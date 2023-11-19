import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = auth();
  // const userId = "user_2XkiEslIxmSunFJj1lRATLH8Z1N";
  console.log({ userId });

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  console.log(JSON.stringify(mongoUser._id), "user");

  return (
    <div className="">
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-10">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default page;
