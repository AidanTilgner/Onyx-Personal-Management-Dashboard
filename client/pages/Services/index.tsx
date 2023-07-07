import React from "react";
import { useGetListedServices } from "../../Hooks/fetching/services";

function index() {
  const { data: listedServices } = useGetListedServices({
    runOnMount: true,
  });

  console.log("Listed Services: ", listedServices);

  return <div>index</div>;
}

export default index;
