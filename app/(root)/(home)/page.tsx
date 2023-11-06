import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import RenderTag from "@/components/shared/RenderTag";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import link from "next/link";
import Link from "next/link";

const questions = [
  // {
  //   _id: 1,
  //   title: "tall depend alive height oldest grown afresh personal instant g",
  //   tags: [
  //     { _id: 1, name: "python" },
  //     { _id: 2, name: "js" },
  //   ],
  //   auther: "Shubham singla",
  //   upvotes: 20,
  //   views: 2,
  //   answers: 43,
  //   createdAt: "2021-09-01T12:00:00.000Z",
  // },
  // {
  //   _id: 2,
  //   title: "tall depend alive height oldest grown afresh personal instant g",
  //   tags: [
  //     { _id: 1, name: "abc" },
  //     { _id: 2, name: "next" },
  //   ],
  //   auther: "Shubham",
  //   upvotes: 20,
  //   views: 2,
  //   answers: 483,
  //   createdAt: "2021-09-01T12:00:00.000Z",
  // },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className=" flex justify-end max-sm:w-full">
          <Button className=" primary-gradient px-4 py-3 text-light-900 ">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="flex-between mt-11 gap-5 max-sm:flex max-sm:flex-col ">
        <LocalSearchBar
          route="/"
          placeholder="Search for questions"
          imgSrc="/assets/icons/search.svg"
          iconPosition="left"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          questions.map((question) => {
            return "QuestionCard";
          })
        ) : (
          <NoResult
            title="There's no Question to show"
            description="Be the first to break the silence. Ask a question and kickstart the discussion. Your query could be the next big thing we can learn from.Get involved!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
{
  /* <>
<h3 className="" key={question._id}>
  {question.title}
</h3>
<div className="">
  {question.tags.map((tag) => {
    return (
      <div className="flex gap-2" key={tag._id}>
        <RenderTag _id={tag._id} name={tag.name} />
      </div>
    );
  })}
</div>
</> */
}
