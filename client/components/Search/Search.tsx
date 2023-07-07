import React from "react";
import styles from "./index.module.scss";
import { useSearch } from "../../Contexts/Search";
import { X } from "@phosphor-icons/react";

function Search({
  typingDelay,
  withShadow,
  placeholder,
}: {
  typingDelay?: number;
  withShadow?: boolean;
  placeholder?: string;
}) {
  const { setQuery, query: contextQuery } = useSearch();
  const [timeout, setTimeoutState] = React.useState<NodeJS.Timeout | null>(
    null
  );
  const [query, setQueryState] = React.useState<string>(contextQuery);

  React.useEffect(() => {
    return () => {
      if (query) {
        setQuery(query);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  React.useEffect(() => {
    if (query !== contextQuery) {
      setQueryState(contextQuery);
    }
  }, [contextQuery]);

  React.useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setTimeoutState(
      setTimeout(() => {
        setQuery(query);
      }, typingDelay || 120)
    );

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [query]);

  return (
    <div className={styles.search}>
      <input
        type="text"
        onChange={(e) => setQueryState(e.target.value)}
        placeholder={placeholder || "Search..."}
        value={query || ""}
        className={withShadow ? styles.withShadow : ""}
      />
      <button
        className={styles.clearSearch}
        onClick={() => {
          setQueryState("");
          setQuery("");
        }}
      >
        <X />
      </button>
    </div>
  );
}

export default Search;
