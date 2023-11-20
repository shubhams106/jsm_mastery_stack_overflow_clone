import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const hotQues = [
  {
    _id: 1,
    title:
      "title six stuck moving social well log leader page asleep especially go ask list bring coming excitement angry blow driver eleven it sign light",
  },
  {
    _id: 2,
    title:
      "title six stuck moving social well log leader page asleep especially go ask list bring coming excitement angry blow driver eleven it sign light",
  },
  {
    _id: 3,
    title:
      "title six stuck moving social well log leader page asleep especially go ask list bring coming excitement angry blow driver eleven it sign light",
  },
];

const popularTags = [
  { _id: 1, name: "JS", totalQuestions: 5 },
  { _id: 2, name: "React", totalQuestions: 2 },
  { _id: 3, name: "CSS", totalQuestions: 4 },
  { _id: 4, name: "Html", totalQuestions: 3 },
  { _id: 5, name: "JS", totalQuestions: 5 },
];

const RightSidebar = () => {
  return (
    <section
      className="background-light900_dark200 
  light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px]
   flex-col overflow-y-auto border-l p-6
    pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div className="">
        <h3 className="h3-bold">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px] ">
          {hotQues.map((question) => {
            return (
              <Link
                href={`/questions/${question._id}`}
                key={question._id}
                className="flex-between cursor-pointer gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  width={20}
                  height={20}
                  alt={question.title}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
