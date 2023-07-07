import { Router } from "express";
import { knowledgeBaseService } from "..";

const router = Router();

router.post("/for_user", async (req, res) => {
  try {
    const decoded = req.body.decoded;

    if (!decoded) {
      return res.status(400).json({
        message: "Missing required fields. Required: decoded.",
      });
    }

    const userId = decoded.id;

    const { content, title } = req.body;

    const added = await knowledgeBaseService.createNote(userId, {
      content,
      title,
    });

    if (added) {
      return res
        .status(200)
        .json({ message: "Note added successfully.", data: added });
    }

    return res.status(500).json({ message: "Something went wrong." });
  } catch (error) {
    knowledgeBaseService.error("Error creating note for user.", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/for_user", async (req, res) => {
  try {
    const decoded = req.body.decoded;

    if (!decoded) {
      return res.status(400).json({
        message: "Missing required fields. Required: decoded.",
      });
    }

    const userId = decoded.id;

    const notes = await knowledgeBaseService.getUserNotes(userId);

    if (notes) {
      return res.status(200).json({ message: "Notes found.", data: notes });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error("Error getting notes for user.", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/for_user/:id", async (req, res) => {
  try {
    const decoded = req.body.decoded;

    if (!decoded) {
      return res.status(400).json({
        message: "Missing required fields. Required: decoded.",
      });
    }

    const userId = decoded.id;

    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({
        message: "Missing required fields. Required: id.",
      });
    }

    const note = await knowledgeBaseService.getUserNoteById(userId, Number(id));

    if (note) {
      return res.status(200).json({ message: "Note found.", data: note });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error("Error getting note by id for user.", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.put("/for_user/:id", async (req, res) => {
  try {
    const decoded = req.body.decoded;

    if (!decoded) {
      return res.status(400).json({
        message: "Missing required fields. Required: decoded.",
      });
    }

    const userId = decoded.id;

    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({
        message: "Missing required fields. Required: id.",
      });
    }

    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({
        message: "Missing required fields. Required: title, content.",
      });
    }

    const note = await knowledgeBaseService.updateNoteByIdForUser(
      userId,
      Number(id),
      {
        title,
        content,
      }
    );

    if (note) {
      return res
        .status(200)
        .json({ message: "Note updated successfully.", data: note });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error("Error updating note by id for user.", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.delete("/for_user/:id", async (req, res) => {
  try {
    const decoded = req.body.decoded;

    if (!decoded) {
      return res.status(400).json({
        message: "Missing required fields. Required: decoded.",
      });
    }

    const userId = decoded.id;

    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({
        message: "Missing required fields. Required: id.",
      });
    }

    const note = await knowledgeBaseService.deleteNoteByIdForUser(
      userId,
      Number(id)
    );

    if (note) {
      return res.status(200).json({ message: "Note deleted.", data: note });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error("Error deleting note by id for user.", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

export default router;
