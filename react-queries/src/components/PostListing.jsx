import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useFetch from "./useFetch";

const PostListing = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: postData,
    isLoading,
    isError,
    error,
    isPreviousData,
    prefetchNextPage,
  } = useFetch(page, limit);

  useEffect(() => {
    prefetchNextPage();
  }, [page, prefetchNextPage]);

  const totalPages = postData ? Math.ceil(postData.total / limit) : 0;
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

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
