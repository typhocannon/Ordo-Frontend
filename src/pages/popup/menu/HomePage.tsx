import { Box, Button, Image } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { useContext } from "react";
import { PageContext } from "../context/PageProvider";

export default function HomePage() {
  const {setCurrentPage} = useContext(PageContext);
  return (
    <>
      <Box className="mt-[72px] mb-[48px]">
        <Image src="/logo.png" alt="Ordo Logo" />
      </Box>
      <Box className="my-4 text-center">
        <Text fontSize="lg">Clean, efficient inbox</Text>
        <Text fontSize="sm" color="grey">A stress-free way to organize and remove unwanted emails</Text>
      </Box>
      <Box className="flex flex-col gap-4 pb-10">
        <Button bg="#0082FF" color="white"  _hover={{bg: "#104490"}}_active={{bg: "#104490"}} onClick={() => setCurrentPage("Trash")}>
            Delete Emails
        </Button>
        <Button bg="#0082FF" color="white"  _hover={{bg: "#104490"}}_active={{bg: "#104490"}} onClick={() => setCurrentPage("Organize")}>
            Organize Emails
        </Button>
      </Box>
    </>
  );
}
