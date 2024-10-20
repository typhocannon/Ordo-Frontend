import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { faTag, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ListItemProps = {
  name: string;
  currentList: any;
  setList: React.Dispatch<React.SetStateAction<any>>;
  color?: string;
};

export default function ListItem({ name, currentList, setList, color }: ListItemProps) {
    function handleDelete() {
        setList(currentList.filter((item: any) => item.name !== name));
    }
  return (
    <Box className="flex w-[100%] h-12 justify-between items-center pl-4 bg-white">
      <Box className="flex gap-1 items-center">
        {color ? (
          <FontAwesomeIcon size="xl" color={color} icon={faTag} />
        ) : (
          <></>
        )}
        <Text fontSize="sm" isTruncated maxWidth="32">{name}</Text>
      </Box>
        <Button variant="link" onClick={handleDelete}>
            <FontAwesomeIcon icon={faXmark} color="red" />
        </Button>
    </Box>
  );
}
