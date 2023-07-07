import { Router } from "express";
import { enabledServices } from ".";
import { logMetaData } from "../utils/logger";
import { verifyAPIKey, checkAdmin } from "../middleware/auth";

const router = Router();

const enabledRouters = enabledServices.map(({ service, router }) => {
  return {
    name: service.getServiceRouteName(),
    router,
    service,
  };
});

const clientAvailableRouters = enabledRouters.filter((e) => {
  return e.service.isAvailableViaClient();
});

const writeRoutesToMetadata = () => {
  const routes = enabledRouters.map(
    (service) => `/api/services/${service.name}/`
  );
  logMetaData("service-routes.txt", routes.join("\n"), false);
};

writeRoutesToMetadata();

enabledRouters.forEach((service) => {
  router.use(`/${service.name}`, verifyAPIKey, service.router);
});

clientAvailableRouters.forEach((service) => {
  router.use(`/from_client/${service.name}`, checkAdmin, service.router);
});

export default router;
