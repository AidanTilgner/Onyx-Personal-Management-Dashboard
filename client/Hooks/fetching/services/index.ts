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
      title: string;
      description: string;
      version: string;
    }[]
  >
) => {
  return useServicesFetch<
    undefined,
    { title: string; description: string; version: string }[]
  >({
    appendUrl: "/listed",
    ...options,
  });
};
