import Note from "../models/note";
import { dataSource } from "..";
import Logger from "../../utils/logger";
import { getDefaultUser } from "./user";
import { levenDistance } from "../../utils/search";
import User from "../models/user";

const noteOperationsLogger = new Logger({
  name: "Note Operations",
});

export const addNoteToDefaultUser = async (note: {
  title: Note["title"];
  content: Note["content"];
}) => {
  try {
    const defaultUser = await getDefaultUser(["notes"]);

    if (!defaultUser) {
      noteOperationsLogger.error("No default user found");
      return null;
    }

    const newNote = new Note();
    newNote.title = note.title;
    newNote.content = note.content;
    newNote.user = defaultUser;

    await dataSource.manager.save(newNote);

    return newNote;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const getNotesForDefaultUser = async () => {
  try {
    const defaultUser = await getDefaultUser(["notes"]);

    if (!defaultUser) {
      noteOperationsLogger.error("No default user found");
      return null;
    }

    const notes = defaultUser.notes;

    return notes;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const getNoteByIdForDefaultUser = async (id: Note["id"]) => {
  try {
    const defaultUser = await getDefaultUser(["notes"]);

    if (!defaultUser) {
      noteOperationsLogger.error("No default user found");
      return null;
    }

    const note = await dataSource.manager.findOne(Note, {
      where: {
        id,
        user: {
          id: defaultUser.id,
        },
      },
    });

    if (!note) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    return note;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const updateNoteByIdForDefaultUser = async (
  id: Note["id"],
  note: Partial<{
    title: Note["title"];
    content: Note["content"];
  }>
) => {
  try {
    const defaultUser = await getDefaultUser(["notes"]);

    if (!defaultUser) {
      noteOperationsLogger.error("No default user found");
      return null;
    }

    const noteToUpdate = await dataSource.manager.findOne(Note, {
      where: {
        id,
        user: {
          id: defaultUser.id,
        },
      },
    });

    if (!noteToUpdate) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    if (note.title) noteToUpdate.title = note.title;
    if (note.content) noteToUpdate.content = note.content;

    const updatedNote = await dataSource.manager.save(noteToUpdate);

    return updatedNote;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const deleteNoteByIdForDefaultUser = async (id: Note["id"]) => {
  try {
    const defaultUser = await getDefaultUser(["notes"]);

    if (!defaultUser) {
      noteOperationsLogger.error("No default user found");
      return null;
    }

    const noteToDelete = await dataSource.manager.findOne(Note, {
      where: {
        id,
        user: {
          id: defaultUser.id,
        },
      },
    });

    if (!noteToDelete) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    await dataSource.manager.remove(Note, noteToDelete);

    return noteToDelete;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const searchNotesForDefaultUser = async (
  text: string,
  limit: number,
  threshold = -1
) => {
  try {
    const defaultUser = await getDefaultUser(["notes"]);

    if (!defaultUser) {
      noteOperationsLogger.error("No default user found");
      return null;
    }

    const notes = defaultUser.notes;

    const similarNotes = notes
      .map((note) => {
        const distanceContent = levenDistance(text, note.content);
        const distanceTitle = levenDistance(text, note.title);
        const minDistance = Math.min(distanceContent, distanceTitle);

        return {
          note,
          distance: minDistance,
        };
      })
      .filter((note) => {
        if (threshold < 0) return true;
        return note.distance <= threshold;
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit)
      .map((note) => ({ ...note.note, distance: note.distance }));

    return similarNotes;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const createNote = async (note: {
  title: Note["title"];
  content: Note["content"];
  userId: Note["user"]["id"];
}) => {
  try {
    const user = await dataSource.manager.findOne(User, {
      where: {
        id: note.userId,
      },
    });

    if (!user) {
      noteOperationsLogger.error(`No user found with id ${note.userId}`);
      return null;
    }

    const newNote = new Note();
    newNote.title = note.title;
    newNote.content = note.content;
    newNote.user = user;

    await dataSource.manager.save(newNote);

    return newNote;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const getNotes = async () => {
  try {
    const notes = await dataSource.manager.find(Note);

    return notes;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const getUserNotes = async (userId: User["id"]) => {
  try {
    const user = await dataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!user) {
      noteOperationsLogger.error(`No user found with id ${userId}`);
      return null;
    }

    const notes = await dataSource.manager.find(Note, {
      where: {
        user: {
          id: userId,
        },
      },
    });

    return notes;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const getNoteById = async (id: Note["id"]) => {
  try {
    const note = await dataSource.manager.findOne(Note, {
      where: {
        id,
      },
    });

    if (!note) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    return note;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const getUserNoteById = async (id: Note["id"], userId: User["id"]) => {
  try {
    const user = await dataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!user) {
      noteOperationsLogger.error(`No user found with id ${userId}`);
      return null;
    }

    const note = await dataSource.manager.findOne(Note, {
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!note) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    return note;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const updateNoteById = async (
  id: Note["id"],
  note: Partial<{
    title: Note["title"];
    content: Note["content"];
  }>
) => {
  try {
    const noteToUpdate = await dataSource.manager.findOne(Note, {
      where: {
        id,
      },
    });

    if (!noteToUpdate) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    if (note.title) noteToUpdate.title = note.title;
    if (note.content) noteToUpdate.content = note.content;

    const updatedNote = await dataSource.manager.save(noteToUpdate);

    return updatedNote;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const updateNoteByIdForUser = async (
  id: Note["id"],
  userId: User["id"],
  note: Partial<{
    title: Note["title"];
    content: Note["content"];
  }>
) => {
  try {
    const user = await dataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!user) {
      noteOperationsLogger.error(`No user found with id ${userId}`);
      return null;
    }

    const noteToUpdate = await dataSource.manager.findOne(Note, {
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!noteToUpdate) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    if (note.title) noteToUpdate.title = note.title;
    if (note.content) noteToUpdate.content = note.content;

    const updatedNote = await dataSource.manager.save(noteToUpdate);

    return updatedNote;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const deleteNoteById = async (id: Note["id"]) => {
  try {
    const noteToDelete = await dataSource.manager.findOne(Note, {
      where: {
        id,
      },
    });

    if (!noteToDelete) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    await dataSource.manager.remove(Note, noteToDelete);

    return noteToDelete;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const deleteNoteByIdForUser = async (
  id: Note["id"],
  userId: User["id"]
) => {
  try {
    const user = await dataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!user) {
      noteOperationsLogger.error(`No user found with id ${userId}`);
      return null;
    }

    const noteToDelete = await dataSource.manager.findOne(Note, {
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!noteToDelete) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    await dataSource.manager.remove(Note, noteToDelete);

    return noteToDelete;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const searchNotes = async (
  text: string,
  limit: number,
  threshold = -1
) => {
  try {
    const notes = await dataSource.manager.find(Note);

    const similarNotes = notes
      .map((note) => {
        const distanceContent = levenDistance(text, note.content);
        const distanceTitle = levenDistance(text, note.title);
        const minDistance = Math.min(distanceContent, distanceTitle);

        return {
          note,
          distance: minDistance,
        };
      })
      .filter((note) => {
        if (threshold < 0) return true;
        return note.distance <= threshold;
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit)
      .map((note) => ({ ...note.note, distance: note.distance }));

    return similarNotes;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const searchUserNotes = async (
  text: string,
  userId: User["id"],
  limit: number,
  threshold = -1
) => {
  try {
    const user = await dataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!user) {
      noteOperationsLogger.error(`No user found with id ${userId}`);
      return null;
    }

    const notes = await dataSource.manager.find(Note, {
      where: {
        user: {
          id: userId,
        },
      },
    });

    const similarNotes = notes
      .map((note) => {
        const distanceContent = levenDistance(text, note.content);
        const distanceTitle = levenDistance(text, note.title);
        const minDistance = Math.min(distanceContent, distanceTitle);

        return {
          note,
          distance: minDistance,
        };
      })
      .filter((note) => {
        if (threshold < 0) return true;
        return note.distance <= threshold;
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit)
      .map((note) => ({ ...note.note, distance: note.distance }));

    return similarNotes;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};
