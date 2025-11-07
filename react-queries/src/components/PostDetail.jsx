import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { singlePost } from "../API/api";

const PostDetail = () => {
  const { id } = useParams();

  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => singlePost(id),
    enabled: !!id,
    staleTime: 30_000,
    cacheTime: 60_000,
  });

  console.log(postData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{postData.title}</h1>
    </div>
  );
};

export default PostDetail;
