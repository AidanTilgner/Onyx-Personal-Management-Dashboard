import { Service } from "../construct";
import {
  addNoteToDefaultUser,
  getNotesForDefaultUser,
  getNoteByIdForDefaultUser,
  deleteNoteByIdForDefaultUser,
  updateNoteByIdForDefaultUser,
  searchNotesForDefaultUser,
  createNote,
  getNotes,
  getUserNotes,
  getNoteById,
  getUserNoteById,
  updateNoteById,
  updateNoteByIdForUser,
  deleteNoteById,
  deleteNoteByIdForUser,
  searchNotes,
  searchUserNotes,
} from "../../database/operations/notes";
import Note from "../../database/models/note";

class KnowledgeBaseService extends Service {
  constructor() {
    super({
      name: "knowledge_base",
      version: "1.0.0",
      description:
        "Manage knowledge with notes, reminders, logs, and other features.",
      availableViaClient: true,
    });
  }

  public async addNoteDU(note: {
    title: Note["title"];
    content: Note["content"];
  }) {
    try {
      return await addNoteToDefaultUser(note);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getNotesDU() {
    try {
      return await getNotesForDefaultUser();
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getNoteByIdDU(id: Note["id"]) {
    try {
      return await getNoteByIdForDefaultUser(id);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async deleteNoteByIdDU(id: Note["id"]) {
    try {
      return await deleteNoteByIdForDefaultUser(id);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async updateNoteByIdDU(
    id: Note["id"],
    note: Partial<{
      title: Note["title"];
      content: Note["content"];
    }>
  ) {
    try {
      return await updateNoteByIdForDefaultUser(id, note);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getSimilarNotesDU(
    text: string,
    limit: number,
    threshold: number
  ) {
    try {
      return await searchNotesForDefaultUser(text, limit, threshold);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async createNote(
    userId: Note["user"]["id"],
    note: {
      title: Note["title"];
      content: Note["content"];
    }
  ) {
    try {
      return await createNote({
        content: note.content,
        title: note.title,
        userId,
      });
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getNotes() {
    try {
      return await getNotes();
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getUserNotes(userId: Note["user"]["id"]) {
    try {
      return await getUserNotes(userId);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getNoteById(id: Note["id"]) {
    try {
      return await getNoteById(id);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getUserNoteById(userId: Note["user"]["id"], id: Note["id"]) {
    try {
      return await getUserNoteById(userId, id);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async updateNoteById(
    id: Note["id"],
    note: Partial<{
      title: Note["title"];
      content: Note["content"];
    }>
  ) {
    try {
      return await updateNoteById(id, note);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async updateNoteByIdForUser(
    id: Note["id"],
    userId: Note["user"]["id"],
    note: Partial<{
      title: Note["title"];
      content: Note["content"];
    }>
  ) {
    try {
      return await updateNoteByIdForUser(id, userId, note);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async deleteNoteById(id: Note["id"]) {
    try {
      return await deleteNoteById(id);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async deleteNoteByIdForUser(
    id: Note["id"],
    userId: Note["user"]["id"]
  ) {
    try {
      return await deleteNoteByIdForUser(id, userId);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getSimilarNotes(text: string, limit: number, threshold: number) {
    try {
      return await searchNotes(text, limit, threshold);
    } catch (error) {
      this.error(error);
      return null;
    }
  }

  public async getSimilarUserNotes(
    userId: Note["user"]["id"],
    text: string,
    limit: number,
    threshold: number
  ) {
    try {
      return await searchUserNotes(text, userId, limit, threshold);
    } catch (error) {
      this.error(error);
      return null;
    }
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();
import router from "./router";

export const config = {
  router,
  service: knowledgeBaseService,
};
