import {
  VStack,
  Text,
  HStack,
  Icon,
  Box,
  useBreakpointValue
} from "@chakra-ui/react";
import { FiHome, FiFeather, FiUser } from "react-icons/fi";
import { TbBookmarks } from "react-icons/tb";
import { IoEllipse } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/router";

const Sidebar = () => {
  const isSmall = useBreakpointValue({
    base: true,
    md: false
  });
  const router = useRouter();
  const [hovered, setHovered] = useState(undefined);

  const [selected, setSelected] = useState(router.pathname);

  if (selected === "/post/[id]") {
    setSelected("/");
  }

  const menus = [
    { title: "Home", src: "/", icon: FiHome, size: "24px" },
    {
      title: "Saved",
      src: "/saved",
      icon: TbBookmarks,
      spacing: "18px",
      size: "27px"
    },
    {
      title: "My Stories",
      src: "/saved",
      icon: FiFeather,
      size: "24px"
    },
    { title: "Profile", src: "/profile", icon: FiUser, size: "24px" },
    {
      title: "Inbox",
      src: "/saved",
      icon: FiHome,
      size: "24px"
    },
    { title: "Accounts", src: "/saved", gap: true, icon: FiHome, size: "24px" },
    { title: "Search", src: "/saved", icon: FiHome, size: "24px" },
    { title: "Setting", src: "/saved", icon: FiHome, size: "24px" }
  ];

  useEffect(() => {
    if (router.pathname === "/post/[id]") {
      return;
    }
    setSelected(router.pathname);
  }, [router.pathname]);

  return (
    <VStack
      align="start"
      minW={{ base: "95px", md: "220px", xl: "260px" }}
      borderRightColor="gray.100"
      borderRightWidth={2}
      className="pt-2 pb-6 sticky top-0 "
    >
      <Logo isSmall={isSmall} />
      {menus.map((menu, index) => (
        <NextLink key={index} href={menu.src}>
          <Box
            key={index}
            w={{ base: "95px", md: "200px", xl: "235px" }}
            className="h-[50px] relative rounded-r-full"
            onMouseEnter={() => {
              setHovered(index + 1);
            }}
            onMouseLeave={() => {
              setHovered(undefined);
            }}
            onClick={() => {
              setSelected(menu.src);
            }}
          >
            <AnimatePresence>
              {hovered === index + 1 && !isSmall && (
                <Box
                  as={motion.div}
                  initial={{
                    width: 0,
                    opacity: 1
                  }}
                  animate={{
                    width: "100%",
                    opacity: 1
                  }}
                  exit={{
                    width: 0,
                    opacity: 0
                  }}
                  className="bg-[#2F9FF8]/[0.1] absolute h-full top-0 left-0 rounded-r-full"
                ></Box>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selected === menu.src && !isSmall && (
                <Box
                  as={motion.div}
                  initial={{
                    width: 0,
                    opacity: 1
                  }}
                  animate={{
                    width: "100%",
                    opacity: 1
                  }}
                  exit={{
                    width: 0,
                    opacity: 0
                  }}
                  className="bg-[#2F9FF8]/[0.15] absolute h-full top-0 left-0 rounded-r-full"
                ></Box>
              )}
            </AnimatePresence>
            {selected === menu.src ? (
              <HStack
                as={motion.div}
                className="pl-[15px] relative cursor-pointer h-full w-full text-blue-800"
                justify="start"
                whileTap={{ scale: 0.95, color: "#2F9FF8" }}
                spacing={menu?.spacing || "22px"}
              >
                <HStack
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  spacing="12px"
                >
                  <Icon as={IoEllipse} boxSize="8px" color="#2F9FF8" />
                  <Icon as={menu.icon} boxSize={menu.size} color="#2F9FF8" />
                </HStack>
                {!isSmall && (
                  <Text as={motion.p} className="text-[#2F9FF8] font-bold">
                    {menu.title}
                  </Text>
                )}
              </HStack>
            ) : (
              <HStack
                as={motion.div}
                className="pl-[35px] relative cursor-pointer h-full w-full"
                justify="start"
                spacing={menu?.spacing || "22px"}
                whileHover={isSmall && { scale: 1.1 }}
                whileTap={{ scale: 0.95, color: "#2F9FF8" }}
              >
                <Icon as={menu.icon} color="#072D4B" boxSize={menu.size} />
                {!isSmall && (
                  <Text as={motion.p} textColor="#072D4B" fontWeight="500">
                    {menu.title}
                  </Text>
                )}
              </HStack>
            )}
          </Box>
        </NextLink>
      ))}
    </VStack>
  );
};

export default Sidebar;
