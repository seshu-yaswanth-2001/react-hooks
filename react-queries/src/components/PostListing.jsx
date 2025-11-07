import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPaginatedData } from "../API/api";
import { Link } from "react-router-dom";

const PostListing = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const queryClient = useQueryClient();
  
  const {
    data: postData,
    isLoading,
    isError,
    error,
    isPreviousData
  } = useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => fetchPaginatedData(page, limit),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if(postData && page < Math.ceil(postData.total / limit)) {
      queryClient.prefetchQuery({
        queryKey: ["posts", page + 1, limit],
        queryFn: () => fetchPaginatedData(page + 1, limit),
        staleTime: 5 * 60 * 1000,
      })
    }
  }, [page, limit, queryClient, postData]);

  const totalPages = postData ? Math.ceil(postData.total / limit) : 0;
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return (
    <div className="container">
      <h1>Post Listing</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}

      {postData?.posts?.map((post) => (
        <div className="post" key={post.id}>
          <div>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <p>PostId - {post.id}</p>
          </div>
          {post?.tags?.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ))}

      <div className="pagination">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={!hasPreviousPage}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={!hasNextPage || isPreviousData}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostListing;
