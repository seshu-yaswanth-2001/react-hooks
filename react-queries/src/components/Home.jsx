import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/posts">View Posts</Link>
      <Link to="/postsInfinite">Posts Infinite Scroll</Link>
    </div>
  );
};

export default Home;
