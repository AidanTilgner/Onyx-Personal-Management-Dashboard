import { Service } from "../construct";

class KnowledgeBaseService extends Service {
  constructor() {
    super({ name: "knowledge_base", version: "1.0.0" });
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();
export { default as knowledgeBaseRouter } from "./router";
