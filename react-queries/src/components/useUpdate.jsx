import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../API/api";

const useUpdate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
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

  return { mutation };
};

export default useUpdate;
