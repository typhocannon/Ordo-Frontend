import { Box, Button, Divider, Stack, StackDivider } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faTrash, faGear } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { PageContext } from "../context/PageProvider";

export default function Navbar() {
    const {currentPage, setCurrentPage} = useContext(PageContext);

    return (
        <Stack direction="row" p={4} divider={<StackDivider borderColor='gray.200' />} justify="end">
            {<Button variant="link" size="sm" color={currentPage == "Home" ? "#1EBCFE" : "#D6D6D6"} onClick={() => setCurrentPage("Home")} _hover={{color: "#1EBCFE"}} _active={{color: "1EBCFE"}}>
                <FontAwesomeIcon size="xl" icon={faHouse} />
            </Button>}
            <Button variant="link" size="sm" color={currentPage == "Trash" ? "#1EBCFE" : "#D6D6D6"} onClick={() => setCurrentPage("Trash")} _hover={{color: "#1EBCFE"}} _active={{color: "1EBCFE"}}>
                <FontAwesomeIcon size="xl"icon={faTrash} />
            </Button>
            <Button variant="link" size="sm" color={currentPage == "Organize" ? "#1EBCFE" : "#D6D6D6"} onClick={() => setCurrentPage("Organize")} _hover={{color: "#1EBCFE"}} _active={{color: "1EBCFE"}}>
                <FontAwesomeIcon size="xl" icon={faGear} />
            </Button>
        </Stack>
    )   
}