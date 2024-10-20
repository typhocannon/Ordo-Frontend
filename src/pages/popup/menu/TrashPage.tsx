import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Text,
  Wrap,
  WrapItem,
  VStack,
  Spinner,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ToggleButton from "../custom/ToggleButton";
import ListItem from "../custom/ListItem";
import ErrorPage from "./ErrorPage";

interface deletedEmails {
  name: string;
}

export default function TrashPage() {
  const [error, setError] = useState(false);
  const [filterList, setFilterList] = useState(["Test1", "Test2"]);
  const [storeList, setStoreList] = useState([
    "Store1",
    "Store2",
    "Store2",
    "Store2",
    "Store2",
  ]);

  const [selectedFilters, setSelectedFilters] = useState([] as string[]);
  const [selectedStores, setSelectedStores] = useState([] as string[]);

  const [deletedEmails, setDeletedEmails] = useState([
    { name: "Test9gskdfskfdsgjkfdsjkglfdslkghfsdkljh" },
    { name: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" },
    { name: "Test3" },
    { name: "Test4" },
    { name: "Test5" },
    { name: "Test6" },
    { name: "Test7" },
    { name: "Test8" },
    { name: "Test9gskdfskfdsgjkfdsjkglfdslkghfsdkljh" },
  ] as deletedEmails[]);

  const [minDiscount, setMinDiscount] = useState(0);
  const [maxDiscount, setMaxDiscount] = useState(100);

  const [deletePhase, setDeletePhase] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleDelete() {
    if (minDiscount > maxDiscount) {
      return;
    }

    setLoading(true);
  
    async function deleteEmails() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // const deletedEmailsResponse = await fetch("http://localhost:5000/deletedEmails",{
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     filters: selectedFilters,
      //     discount: [minDiscount, maxDiscount],
      //     stores: selectedStores,
      //   }),
      // });
      // const deletedEmailsData = await deletedEmailsResponse.json();
      // setDeletedEmails(deletedEmailsData);
      setSelectedFilters([]);
      setSelectedStores([]);
      setLoading(false);
      setDeletePhase(1);
    }
    try {
      deleteEmails();
    }
    catch (e) {
      setError(true);
    }
  }

  function handleDeleteConfirmation() {
    setLoading(true);
    async function confirmDeleteEmails() {
      console.log("Deleting Emails");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // await fetch("http://localhost:5000/deletedEmails", {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(deletedEmails),
      // });
      setDeletedEmails([]);
      setLoading(false);
      setDeletePhase(2);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDeletePhase(0);
    }
    confirmDeleteEmails();
  }

  function handleCancel() {
    setDeletePhase(0);
  }

  if (error) {
    return (
      <ErrorPage />
    )
  }

  if (deletePhase == 1) {
    return (
      <>
        <HStack px={2}>
          <FontAwesomeIcon size="4x" icon={faTrash} color="#1EBCFE" />
          <Box>
            <Text fontSize="2xl">Delete</Text>
            <Text fontSize="2xl">Confirmation</Text>
          </Box>
        </HStack>
        <Divider orientation="horizontal" borderWidth="1px" my={2}></Divider>
        <Box>
          <Text px={2} fontSize="sm">
            Please confirm you want to delete the following emails:
          </Text>
        </Box>
        <Box>
          <Box h={260} p={4} m={4} bg="lightgray" overflow="auto">
            <VStack gap={4}>
            {deletedEmails.map((email) => {
                return <ListItem name={email.name} currentList={deletedEmails} setList={setDeletedEmails} />
            })}
            </VStack>
          </Box>
        </Box>
        <HStack gap={6} justify="center">
          {!loading ? (
            <>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
              <Button
                isLoading={loading}
                onClick={handleDeleteConfirmation}
                disabled={loading}
              >
                Delete
              </Button>
            </>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
            />
          )}
        </HStack>
      </>
    );
  }

  if (deletePhase == 2) {
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
        <Box className="mt-[100px]">
          <VStack gap={0} justify="center" align="center">
            <Text fontSize="xl">Items</Text>
            <Text fontSize="xl">Successfully</Text>
            <Text fontSize="xl">Deleted</Text>
            <Box p={4}>
              <FontAwesomeIcon size="4x" icon={faCircleCheck} color="#3BE23A" />
            </Box>
          </VStack>
        </Box>
      </>
    );
  }

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
            {filterList.map((filter) => (
              <WrapItem>
                <ToggleButton name={filter} setList={setSelectedFilters} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box py={2}>
          <Text fontWeight="bold">Promotions</Text>
          <Text fontWeight="bold">Discount (%)</Text>
          <HStack p={2}>
            <NumberInput
              size="xs"
              maxW={16}
              defaultValue={0}
              min={0}
              max={100}
              value={minDiscount}
              onChange={(valueString) => setMinDiscount(Number(valueString))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="lg"> -- </Text>
            <NumberInput
              size="xs"
              maxW={16}
              defaultValue={100}
              min={0}
              max={100}
              value={maxDiscount}
              onChange={(valueString) => setMaxDiscount(Number(valueString))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <Box>
            <Text>Store</Text>
            <Wrap>
              {storeList.map((store) => (
                <WrapItem>
                  <ToggleButton name={store} setList={setSelectedStores} />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
      </Box>
      <Box className="flex flex-grow-0 justify-center py-4">
        {!loading ? (
          <Button onClick={handleDelete}>Delete Emails</Button>
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </Box>
    </>
  );
}
