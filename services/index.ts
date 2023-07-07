import { config as EmailService } from "./email";
import { config as KnowledgeBaseService } from "./knowledge_base";

export const services = {
  email: EmailService,
  knowledge_base: KnowledgeBaseService,
};

export const enabledServices = [services.email, services.knowledge_base];

export const enabledServicesAvailableViaClient = enabledServices.filter((s) => {
  return s.service.isAvailableViaClient();
});
