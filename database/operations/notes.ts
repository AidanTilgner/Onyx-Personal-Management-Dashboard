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

    const savedNote = await dataSource.manager.save(newNote);

    noteOperationsLogger.info(`Added note ${savedNote.id} to default user`);

    return savedNote;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const getNotesForDefaultUser = async () => {
  try {
    const defaultUser = await getDefaultUser();

    if (!defaultUser) {
      noteOperationsLogger.error("No default user found");
      return null;
    }

    const notes = await dataSource.manager.find(Note, {
      where: {
        user: defaultUser,
      },
    });

    noteOperationsLogger.info(`Found ${notes.length} notes for default user`);

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
        user: defaultUser,
      },
    });

    if (!note) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    noteOperationsLogger.info(`Found note ${note.id} for default user`);

    return note;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};

export const updateNoteByIdForDefaultUser = async (
  id: Note["id"],
  note: {
    title: Note["title"];
    content: Note["content"];
  }
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
        user: defaultUser,
      },
    });

    if (!noteToUpdate) {
      noteOperationsLogger.error(`No note found with id ${id}`);
      return null;
    }

    noteToUpdate.title = note.title;
    noteToUpdate.content = note.content;

    const updatedNote = await dataSource.manager.save(noteToUpdate);

    noteOperationsLogger.info(
      `Updated note ${updatedNote.id} for default user`
    );

    return updatedNote;
  } catch (error) {
    noteOperationsLogger.error(error);
    return null;
  }
};
