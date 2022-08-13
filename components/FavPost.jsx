import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { TOGGLE_FAVORITE } from "../graphql/queries";
import { useAuth } from "../lib/auth.js";
import { Button, useDisclosure } from "@chakra-ui/react";
import SignIn from "./SignIn";

const FavPost = ({ post, me }) => {
  // const { isSignedIn } = useAuth();

  const [favorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: post.id }
  });

  const [favorited, setFavorited] = useState(
    me?.favorites?.blogs?.filter((blog) => blog?.id === post.id).length > 0
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  return (
    <>
      {favorited ? (
        <Button
          as={motion.button}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.1 }
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
          size="sm"
          leftIcon={<BsBookmarksFill />}
          fontSize="16px"
          colorScheme="blue"
          variant="ghost"
          onClick={() => {
            setFavorited(!favorited);
            favorite();
          }}
        >
          11k
        </Button>
      ) : (
        <Button
          as={motion.button}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.1 }
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
          size="sm"
          leftIcon={<BsBookmarks />}
          fontSize="16px"
          colorScheme="blue"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log(8);
            // if (isSignedIn()) {
            //   setFavorited(!favorited);
            //   favorite();
            // } else {
            //   onOpen();
            // }
          }}
        >
          11k
        </Button>
      )}
      {/* <SignIn
        isOpen={isOpen}
        onOpen={onOpen}
        initialRef={initialRef}
        onClose={onClose}
      /> */}
    </>
  );
};

export default FavPost;
