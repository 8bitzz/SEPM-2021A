const Note = require("../models/note");

const createNote = async (req, res) => {
    try {
        let { video, note, video_timeline } = req.body;
        if (!video) return res.status(400).json({ error: "Video Id is missing in body!" });
        let user = req.user._id;
        let nt = new Note({ video, note, user, video_timeline });
        await nt.save();
        res.json({ message: "Note saved for user", data: nt });
    } catch (error) {
        return res.status(400).send(error);
    }
};

const deleteNote = async (req, res) => {
    try {
        let { note_id } = req.params;
        if (!note_id) return res.status(400).json({ error: "Note Id is missing in params!" });
        let deleteNote = await Note.findOneAndDelete({ _id: note_id }).exec();
        if (!deleteNote) return res.status(400).json({ message: "Note is not avaialble to delete!" });
        res.json({ message: "Note has deleted successfully for user!", data: deleteNote });
    } catch (error) {
        return res.status(400).send(error);
    }
};

const getAllNote = async (req, res) => {
    try {
        let user = req.user._id;
        let nts = await Note.find({ user }).populate("user video").exec();
        res.json(nts);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const getNoteById = async (req, res) => {
    try {
        let { note_id } = req.params;
        if (!note_id) return res.status(400).json({ error: "Note Id is missing in params!" });
        let nt = await Note.findOne({ _id: note_id }).populate("video user").exec();
        if (!nt) return res.status(400).json({ code: false, message: "No note found!" });
        res.json({ code: true, message: "Note found!", data: nt });
    } catch (error) {
        return res.status(400).send(error);
    }
};

module.exports = {
    createNote,
    deleteNote,
    getAllNote,
    getNoteById,
};
