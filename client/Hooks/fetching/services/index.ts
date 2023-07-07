import useFetch, { UseFetchConfig } from "../../useFetch";

export const useServicesFetch = <B, D>(
  options?: UseFetchConfig<B, D> & { appendUrl?: string }
) => {
  return useFetch<B, D>({
    url: "/services/from_client" + (options?.appendUrl || ""),
    ...options,
  });
};

export const useGetListedServices = (
  options?: UseFetchConfig<
    undefined,
    {
      name: string;
      title: string;
      description: string;
      version: string;
      formatted_name: string;
    }[]
  >
) => {
  return useServicesFetch<
    undefined,
    {
      title: string;
      description: string;
      version: string;
      name: string;
      formatted_name: string;
    }[]
  >({
    appendUrl: "/listed",
    ...options,
  });
};
