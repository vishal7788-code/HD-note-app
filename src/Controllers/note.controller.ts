import { Request, Response } from "express";
import {Note} from "../Models/notes.model";

// create a new note
export const createNote = async(req:Request, res:Response): Promise<void> => {
    try {
        const {Title,Content}=req.body
        const userId=req.id
        if(!Title || !Content){
            res.status(400).json({
                message:"Please provide all fields to create a note.",
                success:false
            })
            return;
        }         
        const newNote=await Note.create({
            Title,
            Content,
            user:userId
        })
        res.status(200).json({
            message:"Note created successfully.",
            success:true,
            newNote
        })
    } catch (error) {
        console.error("Error in createNote:",(error as Error).message)
        res.status(500).json({
            message:"Something went wrong.",
        })
        return;
    }
}

// to soft delete a note

export const deleteNote = async(req:Request, res:Response) : Promise<void> => {
    try {
        const noteId = req.params.id;
        const userId = req.id;
        if(!noteId){
            res.status(400).json({
                message:"Note Id is required.",
                success:false,

            })
            return;
        }
        const note = await Note.findOne({ _id: noteId, user: userId, isDelete: false })
        if(!note){
            res.status(400).json({
                message:"Note not found or already deleted.",
                success:false,
            })
            return;
        }
        note.isDelete=true;
        await note.save();
        res.status(200).json({
            message:"Note deleted successfully.",
            success:true,
        })
        return;
    } catch (error) {
        console.error("Error in deleteNote:",(error as Error).message)
        res.status(500).json({
            message:"Something went wrong.",
            success:false,
        })
        
    }
}
export const getAllNotes = async(req:Request, res:Response): Promise<void> => {
    try {
        const userId=req.params.id;
        const noteId = req.id;
        if(!userId){
            res.status(400).json({
                message:"User Id is required.",
                success:false,
            })
            return;
        }
        const notes= await Note.find({ user:userId, isDelete:false})
        res.status(200).json({
            message:"Notes fetched successfully.",
            success:true,
            notes
        })
        
    } catch (error) {
        console.error("Error in getAllNotes:",(error as Error).message)
        res.status(500).json({
            message:"Something went wrong.",
            success:false,
        })

    }
}