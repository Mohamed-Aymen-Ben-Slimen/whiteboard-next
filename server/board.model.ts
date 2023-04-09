import mongoose from 'mongoose';
const { Schema } = mongoose;

const BoardSchema = new Schema({
  board: Object,
  user: String,
  roomId: String,
  createdAt: Date,
});

const BoardModel = mongoose.model('Board', BoardSchema);

export {
    BoardModel,
    BoardSchema,
};