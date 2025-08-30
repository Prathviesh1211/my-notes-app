import Note from "../models/noteModel"
import { Request, Response } from 'express';

export const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find({ user: (req as any).user.id })
        res.json(notes);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
}
export const createNote = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ msg: 'Please add a title and content.' });
    }

    try {
        const newNote = await Note.create({
            user: (req as any).user.id,
            title,
            content
        })
        const note = await newNote.save();

        res.status(201).json(note);

    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
}


export const deleteNote = async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id)

        if (note && note.user.toString() === (req as any).user.id) {
            await note.deleteOne();
            res.json({ msg: 'Note removed' });
        } else {
            res.status(404).json({ msg: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
}