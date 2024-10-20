import { Text, Button, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { PageContext } from "../context/PageProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ErrorPage() {
    const { setCurrentPage } = useContext(PageContext);
  return (
    <Box className='flex flex-col justify-center items-center gap-4 mt-32'>
        <FontAwesomeIcon icon={faTriangleExclamation} size="4x" color="red" />
      <Text fontSize="xl" textAlign="center">
        An error occurred while processing your request. Please try again.
      </Text>
      <Button onClick={() => setCurrentPage("Home")}>Go Back Home</Button>
    </Box>
  );
}