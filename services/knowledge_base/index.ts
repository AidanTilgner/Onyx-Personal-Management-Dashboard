import { Service } from "../construct";
import {
  addNoteToDefaultUser,
  getNotesForDefaultUser,
  getNoteByIdForDefaultUser,
  deleteNoteByIdForDefaultUser,
  updateNoteByIdForDefaultUser,
} from "../../database/operations/notes";
import { Note } from "../../database/models/note";

class KnowledgeBaseService extends Service {
  constructor() {
    super({ name: "knowledge_base", version: "1.0.0" });
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
}

export const knowledgeBaseService = new KnowledgeBaseService();
import router from "./router";

export const config = {
  router,
  service: knowledgeBaseService,
};
