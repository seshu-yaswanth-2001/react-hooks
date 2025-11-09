import { useState } from "react";
import useUpdate from "./useUpdate";

const UpdatePosts = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { addMutation } = useUpdate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      alert("Please provide both title and body");
      return;
    }

    addMutation.mutate({
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
        disabled={addMutation.isLoading}
      />
      <textarea
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={addMutation.isLoading}
      />
      <button type="submit" disabled={addMutation.isLoading}>
        Submit
      </button>

      {addMutation.isError && (
        <p style={{ color: "red" }}>Error: {addMutation.error?.message}</p>
      )}

      {addMutation.isSuccess && (
        <p style={{ color: "green" }}>
          Post updated (id: {addMutation.data?.id})
        </p>
      )}
    </form>
  );
};

export default UpdatePosts;
