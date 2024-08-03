import { useQueryState } from "nuqs";

const useQueryHooks = () => {
  const [query, setQuery] = useQueryState("query", { defaultValue: "" });

  return {
    query,
    setQuery,
  };
};

export default useQueryHooks;
