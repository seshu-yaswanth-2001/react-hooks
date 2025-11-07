export const fetchData = async () => {
  // const response = await fetch(`http://localhost:3000/posts`);
  const response = await fetch(`https://dummyjson.com/posts`);

  if (!response.ok) throw new Error("Network response was not ok");

  const postData = response.json();

  return postData;
};

export const fetchPaginatedData = async(page, limit) => {

  const skip = (page - 1) * limit;

  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  
  if(!response.ok) throw new Error("Network response was not ok");

  const postData = response.json();

  console.log(response);
  
  return postData;
}

export const fetchPostsInfinite = async({pageParam = 0}) => {
  const limit = 9;
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${pageParam}`);

  if(!response.ok) throw new Error("Network response was not ok");

  const postData = response.json();

  return postData;
}

export const singlePost = async (id) => {
  // const response = await fetch(`http://localhost:3000/posts?id=${id}`);
  const response = await fetch(`https://dummyjson.com/posts/${id}`);

  if (!response.ok) throw new Error("Network response was not ok");

  const postData = response.json();

  return postData;
};
