export const fetchData = async () => {
  const response = await fetch(`http://localhost:3000/posts`);

  if (!response.ok) throw new Error("Network response was not ok");

  const postData = response.json();

  return postData;
};

export const singlePost = async (id) => {
  const response = await fetch(`http://localhost:3000/posts?id=${id}`);

  if (!response.ok) throw new Error("Network response was not ok");

  const postData = response.json();

  return postData;
};
