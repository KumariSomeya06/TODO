import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: { type: String, },
    id: { type: String, },
    status: { type: String, },
    date: { type: Date, default: Date.now },
})


const TodoModel = mongoose.model('Task', todoSchema);

export default TodoModel