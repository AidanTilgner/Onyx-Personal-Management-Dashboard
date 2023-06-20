import { Router } from "express";
import { enabledServices, services } from ".";

const router = Router();

const enabledRouters = [
  {
    name: services.email.emailService.getServiceRouteName(),
    router: services.email.emailRouter,
  },
];

enabledRouters.forEach((service) => {
  router.use(`/${service.name}`, service.router);
});

export default router;
