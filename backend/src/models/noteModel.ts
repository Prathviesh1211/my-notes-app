import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
}

const noteSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Note = mongoose.model<INote>('Note', noteSchema);
export default Note;