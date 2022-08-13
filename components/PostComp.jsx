import { VStack, Heading, Text } from "@chakra-ui/react";
import { format } from "date-and-time";

const PostComp = ({ post }) => {
  return (
    <>
      <VStack align="start" className="w-full max-w-4xl pr-20 pl-6">
        <Heading size="lg" className="mb-4 text-[#072D4B]">
          {post.title}
        </Heading>
        <Text className="text-[#072D4B] opacity-[85%] text-sm font-sans leading-normal">
          {post.content}
        </Text>
        <Text className="text-[#072D4B] opacity-[85%] text-sm font-sans leading-normal">
          {format(post.createedAt, "ddd, MMM DD YYYY HH:mm:ss")}
        </Text>
      </VStack>
    </>
  );
};

export default PostComp;
