import { useQuery } from "@apollo/client";
import { GET_MY_FAVORITES } from "../graphql/queries";
import Feed from "../components/Feed";

const Saved = () => {
  const { fetchMore, error } = useQuery(GET_MY_FAVORITES);

  const fetchPosts = (args) => {
    return new Promise((resolve) => {
      fetchMore(args)
        .then((data) => {
          resolve(data.data.me.favorites);
        })
        .catch(() => {});
    });
  };

  if (error) return <p>Error loading blogs</p>;

  return <Feed fetchMore={fetchPosts} />;
};

export default Saved;
