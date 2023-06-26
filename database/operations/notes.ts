import { Note } from "../models/note";
import { dataSource } from "..";
import Logger from "../../utils/logger";
import { getDefaultUser } from "./user";

const noteOperationsLogger = new Logger({
  name: "Note Operations",
});

export const addNoteToDefaultUser = async (note: {
  title: Note["title"];
  content: Note["content"];
}) => {
  try {
    const defaultUser = await getDefaultUser();

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
    const defaultUser = await getDefaultUser();

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
    const defaultUser = await getDefaultUser();

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
    const defaultUser = await getDefaultUser();

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
