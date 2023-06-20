import { Router } from "express";
import { enabledServices, services } from ".";
import { writeFileSync } from "fs";

const router = Router();

const metadataLocation = "storage/metadata/service-routes.txt";

const enabledRouters = [
  {
    name: services.email.emailService.getServiceRouteName(),
    router: services.email.emailRouter,
  },
];

const writeRoutesToMetadata = () => {
  const routes = enabledRouters.map((service) => `/${service.name}/`);
  writeFileSync(metadataLocation, routes.join("\n"));
};

writeRoutesToMetadata();

enabledRouters.forEach((service) => {
  router.use(`/${service.name}`, service.router);
});

export default router;
