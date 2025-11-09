import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost, deletePost } from "../API/api";

const useUpdate = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("Created:", data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post Created Successfully!");
    },
    onError: (err) => {
      alert(err?.message ?? "Failed to create post");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Grab the previous cached pages data for all pages
      const previousPages = [];

      // Get all queries related to posts (paged)
      const queries = queryClient.getQueryCache().findAll(["posts"]);

      // Update each cached paginated page
      queries.forEach(({ queryKey }) => {
        const previousData = queryClient.getQueryData(queryKey);
        previousPages.push({ queryKey, previousData });

        queryClient.setQueryData(queryKey, (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            posts: oldData.posts.map((post) =>
              post.id === id ? { ...post, ...patch } : post
            ),
          };
        });
      });

      return { previousPages };
    },
    onError: (err, variables, context) => {
      // Rollback all affected cached pages on error
      context.previousPages.forEach(({ queryKey, previousData }) => {
        queryClient.setQueryData(queryKey, previousData);
      });
    },
    onSuccess: (data, variables) => {
      // Instead of invalidating, directly update cache with fresh server data
      // data is the updated post returned by the server
      const queries = queryClient.getQueryCache().findAll(["posts"]);

      queries.forEach(({ queryKey }) => {
        queryClient.setQueryData(queryKey, (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            posts: oldData.posts.map((post) =>
              post.id === data.id ? data : post
            ),
          };
        });
      });
    },
    onSettled: () => {
      // Refetch all pages after mutation is settled
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      // Invalidate posts namespace
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Remove any single-post cache
      queryClient.removeQueries({ queryKey: ["post", data.id] });
    },
    onError: (err) => {
      console.error("Delete failed:", err);
    },
  });

  return { addMutation, updateMutation, deleteMutation };
};

export default useUpdate;
