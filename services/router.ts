import { Router } from "express";
import { enabledServices } from ".";
import { logMetaData } from "../utils/logger";
import { verifyAPIKey, checkToken } from "../middleware/auth";

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

const writeClientRoutesToMetadata = () => {
  const routes = clientAvailableRouters.map(
    (service) => `/api/services/from_client/${service.name}/`
  );
  logMetaData("client-service-routes.txt", routes.join("\n"), false);
};

writeRoutesToMetadata();
writeClientRoutesToMetadata();

router.get("/listed", (req, res) => {
  res.json({
    message: "Successfully listed services",
    data: enabledServices.map((s) => {
      return s.service.getServiceTitleAndDescription();
    }),
  });
});

router.get("/from_client/listed", (req, res) => {
  res.json({
    message: "Successfully listed services available via client",
    data: clientAvailableRouters.map((s) => {
      return s.service.getServiceTitleAndDescription();
    }),
  });
});

enabledRouters.forEach((service) => {
  router.use(`/${service.name}`, verifyAPIKey, service.router);
});

clientAvailableRouters.forEach((service) => {
  router.use(`/from_client/${service.name}`, checkToken, service.router);
});

export default router;
