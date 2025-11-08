export const fetchData = async () => {
  // const response = await fetch(`http://localhost:3000/posts`);
  const url = `https://dummyjson.com/posts`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`
      );
    }

    const postData = await response.json();

    return postData;
  } catch (err) {
    throw new Error("Unable to reach server");
  }
};

export const fetchPaginatedData = async (page, limit) => {
  const skip = (page - 1) * limit;

  const url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`
      );
    }
    const postData = await response.json();

    return postData;
  } catch (err) {
    console.error("Fetch failed:", err);
    throw new Error("Unable to reach server");
  }
};

export const fetchPostsInfinite = async ({ pageParam = 0 }) => {
  const limit = 9;

  try {
    const response = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${pageParam}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`
      );
    }

    const postData = await response.json();

    return postData;
  } catch (err) {
    throw new Error("Unable to reach server");
  }
};

export const singlePost = async (id) => {
  // const response = await fetch(`http://localhost:3000/posts?id=${id}`);
  const response = await fetch(`https://dummyjson.com/posts/${id}`);

  if (!response.ok) throw new Error("Network response was not ok");

  const postData = response.json();

  return postData;
};

export const createPost = async (newPost) => {
  try {
    const response = await fetch(`https://dummyjson.com/posts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      const errMessage = await response.text();
      throw new Error(
        `Create failed: ${response.status} ${errMessage || response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
