import React from "react";
import { useGetListedServices } from "../../Hooks/fetching/services";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const serviceMapper = {
  "knowledge_base service - version 1.0.0": {
    endpoint: "knowledge_base",
  },
};

function index() {
  const { data: listedServices } = useGetListedServices({
    runOnMount: true,
  });

  const getFormattedServiceName = (name: string) => {
    let newName = name;
    newName = newName.replace(/-/g, " ");
    newName = newName.replace(/_/g, " ");
    return newName;
  };

  return (
    <div className={styles.services}>
      <h1>Services</h1>
      <div className={styles.list}>
        {listedServices?.map((service) => {
          return (
            <Link
              className={styles.service}
              key={service.title}
              to={serviceMapper[service.formatted_name].endpoint}
            >
              <h2>{getFormattedServiceName(service.name)}</h2>
              <p>{service.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default index;
