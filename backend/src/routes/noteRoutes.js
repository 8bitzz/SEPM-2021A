const router = require("express").Router();
const { createNote, deleteNote, getAllNote, getNoteById } = require("../controllers/noteControllers");
const { loginRequired } = require("../controllers/userControllers");

router.get("/", loginRequired, getAllNote);
router.post("/", loginRequired, createNote);
router.delete("/:note_id", loginRequired, deleteNote);
router.get("/:note_id", loginRequired, getNoteById);

module.exports = router;
