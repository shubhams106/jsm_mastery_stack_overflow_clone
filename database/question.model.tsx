import { Schema, model, models, Document } from "mongoose";

export interface Iquestion extends Document {
  title: string;
  tags: Schema.Types.String[];
  content: string;
  upvotes: Schema.Types.String[];
  downvotes: Schema.Types.String[];
  author: Schema.Types.String;
  answers: Schema.Types.String[];
  views: number;
  createdAt: Date;
}
const QuestionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  createdAt: { type: Date, default: Date.now },
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
