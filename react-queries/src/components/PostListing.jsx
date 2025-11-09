import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useFetch from "./useFetch";
import useUpdate from "./useUpdate";
import { useQueryClient } from "@tanstack/react-query";

const PostListing = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const { updateMutation, deleteMutation } = useUpdate();

  const queryClient = useQueryClient();

  const handleDelete = (id) => {
    if (!confirm("Delete this post?")) return;
    deleteMutation.mutate(id);
  };

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

  const startEditing = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleSave = (id) => {
    const trimmed = (editTitle || "").trim();
    if (!trimmed) {
      alert("Title cannot be empty");
      return;
    }

    setEditingId(null);
    setEditTitle("");

    updateMutation.mutate(
      { id, patch: { title: trimmed } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (err) => {
          alert(err?.message || "Update failed");
        },
      }
    );
  };

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

          {editingId === post.id ? (
            <div style={{ marginTop: 8 }}>
              <input
                type="text"
                placeholder="Edit title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                disabled={updateMutation.isLoading}
                style={{ padding: 6, width: "60%" }}
              />
              <button
                onClick={() => handleSave(post.id)}
                disabled={updateMutation.isLoading}
                style={{ marginLeft: 8 }}
              >
                {updateMutation.isLoading ? "Saving..." : "Save"}
              </button>
              <button onClick={cancelEditing} style={{ marginLeft: 6 }}>
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ marginTop: 8 }}>
              <button onClick={() => startEditing(post)}>Edit</button>
            </div>
          )}

          <button
            onClick={() => handleDelete(post.id)}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "Deleting..." : "Delete"}
          </button>

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
