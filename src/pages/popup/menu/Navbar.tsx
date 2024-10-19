import { Box, Button, Divider, Stack, StackDivider } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faTrash, faGear } from '@fortawesome/free-solid-svg-icons';

type NavbarProps = {
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}
export default function Navbar({currentPage, setCurrentPage} : NavbarProps) {
    return (
        <Stack direction="row" p={4} divider={<StackDivider borderColor='gray.200' />} justify="end">
            <Button variant="link" size="sm" onClick={() => setCurrentPage("Home")} _hover={{color: "#1EBCFE"}} _active={{color: "1EBCFE"}}>
                <FontAwesomeIcon size="xl" icon={faHouse} />
            </Button>
            <Button variant="link" size="sm" onClick={() => setCurrentPage("Trash")} _hover={{color: "#1EBCFE"}} _active={{color: "1EBCFE"}}>
                <FontAwesomeIcon size="xl"icon={faTrash} />
            </Button>
            <Button variant="link" size="sm" onClick={() => setCurrentPage("Settings")} _hover={{color: "#1EBCFE"}} _active={{color: "1EBCFE"}}>
                <FontAwesomeIcon size="xl" icon={faGear} />
            </Button>
        </Stack>
    )   
}