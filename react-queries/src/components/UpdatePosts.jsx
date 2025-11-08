import { useState } from "react";
import useUpdate from "./useUpdate";

const UpdatePosts = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutation } = useUpdate();

  console.log("Mutation State:", mutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      alert("Please provide both title and body");
      return;
    }

    mutation.mutate({
      title: trimmedTitle,
      body: trimmedBody,
      userId: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={mutation.isLoading}
      />
      <textarea
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={mutation.isLoading}
      />
      <button type="submit" disabled={mutation.isLoading}>
        Submit
      </button>

      {mutation.isError && (
        <p style={{ color: "red" }}>Error: {mutation.error?.message}</p>
      )}

      {mutation.isSuccess && (
        <p style={{ color: "green" }}>Post created (id: {mutation.data?.id})</p>
      )}
    </form>
  );
};

export default UpdatePosts;
