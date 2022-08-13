import { useQuery } from "@apollo/client";
import { GET_MY_BLOGS } from "../graphql/queries";
import Feed from "../components/Feed";

const MyPosts = () => {
  const { fetchMore, error } = useQuery(GET_MY_BLOGS);

  const fetchPosts = (args) => {
    return new Promise((resolve) => {
      fetchMore(args)
        .then((data) => {
          resolve(data.data.me.blogFeed);
        })
        .catch(() => {});
    });
  };

  if (error) return <p>Error loading blogs</p>;

  return <Feed fetchMore={fetchPosts} />;
};

export default MyPosts;
