import { Router } from "express";
import { enabledServices, services } from ".";
import { writeFileSync } from "fs";
import { logMetaData } from "../utils/logger";

const router = Router();

const metadataLocation = "storage/metadata/service-routes.txt";

const enabledRouters = enabledServices.map(({ service, router }) => {
  return {
    name: service.getServiceRouteName(),
    router,
  };
});

const writeRoutesToMetadata = () => {
  const routes = enabledRouters.map(
    (service) => `/api/services/${service.name}/`
  );
  logMetaData("service-routes.txt", routes.join("\n"), false);
};

writeRoutesToMetadata();

enabledRouters.forEach((service) => {
  router.use(`/${service.name}`, service.router);
});

export default router;
