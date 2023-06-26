import { Router } from "express";
import { knowledgeBaseService } from "..";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Missing required fields. Required: title, content.",
      });
    }

    const note = await knowledgeBaseService.addNoteDU({
      title,
      content,
    });

    if (note) {
      return res
        .status(200)
        .json({ message: "Note added successfully.", data: note });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error("Error adding note to default user.", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await knowledgeBaseService.getNotesDU();

    if (notes) {
      return res.status(200).json({ message: "Notes found.", data: notes });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error("Error getting notes for default user.", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({
        message: "Missing required fields. Required: id.",
      });
    }

    const note = await knowledgeBaseService.getNoteByIdDU(Number(id));

    if (note) {
      return res.status(200).json({ message: "Note found.", data: note });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error(
      "Error getting note by id for default user.",
      error
    );
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.put("/:id", async (req, res) => {
  try {
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

    const note = await knowledgeBaseService.updateNoteByIdDU(Number(id), {
      title,
      content,
    });

    if (note) {
      return res
        .status(200)
        .json({ message: "Note updated successfully.", data: note });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error(
      "Error updating note by id for default user.",
      error
    );
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({
        message: "Missing required fields. Required: id.",
      });
    }

    const note = await knowledgeBaseService.deleteNoteByIdDU(Number(id));

    if (note) {
      return res.status(200).json({ message: "Note deleted.", data: note });
    } else {
      return res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    knowledgeBaseService.error(
      "Error deleting note by id for default user.",
      error
    );
    res.status(500).json({ message: "Something went wrong." });
  }
});

export default router;
