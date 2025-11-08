import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPaginatedData } from "../API/api";

const useFetch = (page = 1, limit = 5) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => fetchPaginatedData(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const prefetchNextPage = () => {
    if (query?.data?.total) {
      const totalPages = Math.ceil(query?.data.total / limit);
      if (page < totalPages) {
        queryClient.prefetchQuery({
          queryKey: ["posts", page + 1, limit],
          queryFn: () => fetchPaginatedData(page + 1, limit),
        });
      }
    }
  };

  return { ...query, prefetchNextPage };
};

export default useFetch;
