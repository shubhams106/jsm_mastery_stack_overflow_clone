"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionSchema } from "@/lib/Validations";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

const type = "create";

interface Props {
  mongoUserId: string;
}

const Question = ({ mongoUserId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(false);

    try {
      // hello
      await createQuestion({
        title: values.title,
        tags: values.tags,
        content: values.explanation,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });

      router.push("/");
    } catch (error) {
      console.log(error, "while submiiting the form");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "tag must be less than 15 characters",
          });
        }
        // else {
        //   console.log(tagValue, "getting my point");
        // }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
          console.log(form.getValues("tags"), "tagggggg");
        }
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    console.log(tag, "tag", field.name);
    const newTags = field.value.filter((tags: string) => tags !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-1">
                <Input
                  className="no-focus text-dark300_light700 background-light900_dark300 paragraph-regular light-border-2 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-3.5 text-light-500">
                Be specific and imagine you are asking ques to another person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-1">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-3.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 100 characters
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-1">
                <>
                  <Input
                    placeholder="Add tags..."
                    className="no-focus text-dark300_light700 background-light900_dark300 paragraph-regular light-border-2 min-h-[56px] border"
                    // {...field}
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="mt-2.5 flex gap-2.5">
                      {field.value.map((tag: any) => {
                        return (
                          <Badge
                            key={tag}
                            className="flex-center background-light800_dark300 text-light400_light500 subtle-medium gap-2 rounded-md border-none px-4 py-2 capitalize"
                            onClick={() => handleTagRemove(tag, field)}
                          >
                            {tag}
                            <Image
                              width={12}
                              height={12}
                              src="/assets/icons/close.svg"
                              alt="close"
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-3.5 text-light-500">
                Add upto 3 tags to describe what your Question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "create" ? "Posting..." : "Editing..."}</>
          ) : type === "create" ? (
            "Ask a  Question"
          ) : (
            "Edit Question"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
