import express from 'express';
import { createNote, deleteNote, getAllNotes } from '../Controllers/note.controller';
import authMiddleware from '../Middleware/authMiddleware';


const router = express.Router();

router.route("/createnote").post(authMiddleware, createNote)
router.route("/allnotes/:id").get(authMiddleware, getAllNotes)
router.route("/deletenote/:id").delete(authMiddleware, deleteNote)

export default router;