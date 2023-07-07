import { UseFetchConfig } from "../../../useFetch";
import { useServicesFetch } from "..";
import { Note } from "../../../../declarations/services/knowledge_base";

export const useGetNotes = (options?: UseFetchConfig<undefined, Note[]>) => {
  return useServicesFetch({
    appendUrl: "/knowledge_base-v1.0.0/notes/for_user",
    method: "GET",
    ...options,
  });
};
