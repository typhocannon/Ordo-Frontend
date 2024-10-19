import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function TrashPage() {
  const [filterList, setFilterList] = useState(["Test1", "Test2"]);
  const [currentFilterList, setCurrentFilterList] = useState([]);
  const [storeList, setStoreList] = useState([
    "Store1",
    "Store2",
    "Store2",
    "Store2",
    "Store2",
  ]);
  return (
    <>
      <HStack px={2}>
        <FontAwesomeIcon size="2xl" icon={faTrash} color="#1EBCFE" />
        <Text fontSize="2xl">Delete</Text>
      </HStack>
      <Text px={2} fontSize="sm" color="grey">
        Select filters to delete emails that match the chosen criteria.
      </Text>
      <Divider orientation="horizontal" borderWidth="1px" my={2}></Divider>
      <Box p={2}>
        <Text fontSize="xl">Filters</Text>
        <Box py={2}>
          <Text fontSize="xs" fontWeight="bold">
            Categories
          </Text>
          <Wrap p={2}>
            {filterList.map((filter, index) => (
              <WrapItem>
                <Button rounded="lg" size="xs" key={index}>
                  {filter}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box py={2}>
          <Text fontWeight="bold">Promotions</Text>
          <Text fontWeight="bold">Discount</Text>
          <HStack p={2}>
            <Input size="sm" placeholder="Min" width="72px" rounded="xl" />
            <Text fontSize="lg"> -- </Text>
            <Input size="sm" placeholder="Max" width="72px" rounded="xl" />
          </HStack>
          <Box>
            <Text>Store</Text>
            <Wrap>
              {storeList.map((store, index) => (
                <WrapItem>
                  <Button rounded="lg" size="xs" key={index}>
                    {store}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
      </Box>
      <Box className="flex flex-grow-0 justify-center py-4">
        <Button>Delete Emails</Button>
      </Box>
    </>
  );
}
