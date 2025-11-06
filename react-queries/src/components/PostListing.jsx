import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../API/api";
import { Link } from "react-router-dom";

const PostListing = () => {
  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    staleTime: 30_000,
    cacheTime: 60_000,
  });

  return (
    <div className="container">
      <h1>Post Listing</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}

      {postData?.map((post) => (
        <div className="post" key={post.id}>
          <div>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </div>
          {post?.tags?.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostListing;
