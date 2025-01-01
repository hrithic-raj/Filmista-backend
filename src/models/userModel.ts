import mongoose, { Schema, Document } from "mongoose";

interface IExample extends Document {
  name: string;
  description: string;
}

const exampleSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Example = mongoose.model<IExample>("Example", exampleSchema);

export default Example;