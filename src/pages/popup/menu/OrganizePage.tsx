import {
  Box,
  Button,
  Divider,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { faCircleCheck, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ListItem from "../custom/ListItem";
import ErrorPage from "./ErrorPage";

interface label {
  name: string;
  color: string;
}

export default function OrganizePage() {
  const [error, setError] = useState(false);
  const [organizePhase, setOrganizePhase] = useState(0);
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState([] as label[]);

  function handleCancel() {
    setOrganizePhase(0);
  }

  async function handleOrganize() {
    async function organizeEmails() {
      console.log("Organizing Emails");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // const labelResponse = await fetch("http://localhost:5000/labels");
      // const labelData = await labelResponse.json();
      // setLabels(labelData);
      setLabels([
        { name: "Schoolgsajfghfdsjglkdfsjlh", color: "red" },
        { name: "School", color: "orange" },
        { name: "Parent", color: "yellow" },
        { name: "Store", color: "green" },
        { name: "Nike", color: "blue" },
        { name: "Adidas", color: "purple" },
      ]);
      setOrganizePhase(1);
    }
    try {
      setLoading(true);
      await organizeEmails();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleOrganizeConfirmation() {
    async function confirmOrganizeEmails() {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // await fetch("http://localhost:5000/labels", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(labels),
      // });

      setLoading(false);
      setOrganizePhase(2);

      // add a delay so the user can see the success message
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOrganizePhase(0);
    }

    try {
      setLoading(true);
      await confirmOrganizeEmails();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <ErrorPage />;
  }

  if (organizePhase == 1) {
    return (
      <>
        <HStack px={2}>
          <FontAwesomeIcon size="4x" icon={faGear} color="#1EBCFE" />
          <Box>
            <Text fontSize="2xl">Organize</Text>
            <Text fontSize="2xl">Confirmation</Text>
          </Box>
        </HStack>
        <Divider orientation="horizontal" borderWidth="1px" my={2}></Divider>
        <Box>
          <Text px={2} fontSize="sm">
            Please confirm you want to add the following labels:
          </Text>
        </Box>
        <Box>
          <Box h={260} p={4} m={4} bg="lightgray" overflow="auto">
            <VStack gap={4}>
              {labels.map((currentLabel) => {
                return (
                  <ListItem
                    name={currentLabel.name}
                    currentList={labels}
                    setList={setLabels}
                    color={currentLabel.color}
                  />
                );
              })}
            </VStack>
          </Box>
        </Box>
        <HStack gap={6} justify="center">
          {!loading ? (
            <>
              <Button
                onClick={handleCancel}
                isDisabled={loading}
                variant="outline"
              >
                Cancel
              </Button>
              <Button isLoading={loading} onClick={handleOrganizeConfirmation}>
                Organize
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

  if (organizePhase == 2) {
    return (
      <>
        <HStack px={2}>
          <FontAwesomeIcon size="2xl" icon={faGear} color="#1EBCFE" />
          <Text fontSize="2xl">Organize</Text>
        </HStack>
        <Text px={2} fontSize="sm" color="grey">
          Select filters to delete emails that match the chosen criteria.
        </Text>
        <Divider orientation="horizontal" borderWidth="1px" my={2}></Divider>
        <Box className="mt-[100px]">
          <VStack gap={0} justify="center" align="center">
            <Text fontSize="xl">Items</Text>
            <Text fontSize="xl">Successfully</Text>
            <Text fontSize="xl">Organized</Text>
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
      <Box className="flex flex-col justify-center items-center mt-24">
        <HStack className="self-start" px={4}>
          <FontAwesomeIcon color="#74C0FC" size="4x" icon={faGear} />
          <Text fontSize="4xl">Organize</Text>
        </HStack>
        <Text px={4} color="grey" fontSize="md">
          Label emails by context for easy organization and quick access.
        </Text>
        <Divider
          borderColor="#D9D9D9"
          orientation="horizontal"
          borderWidth="1.5px"
          my={2}
        ></Divider>
        <Box py={8}>
          {!loading ? (
            <Button p={8} rounded="lg" onClick={handleOrganize}>
              Organize Emails
            </Button>
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
      </Box>
    </>
  );
}
