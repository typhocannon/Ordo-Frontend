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

export default function OrganizePage() {
  const [organizePhase, setOrganizePhase] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    setOrganizePhase(0);
  }

  function handleOrganize() {
    setLoading(true);
    async function organizeEmails() {
      console.log("Organizing Emails");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setOrganizePhase(1);
    }
    organizeEmails();
  }

  function handleOrganizeConfirmation() {
    setLoading(true);
    async function confirmOrganizeEmails() {
      console.log("Organizing Emails");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setOrganizePhase(2);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOrganizePhase(0);
    }
    confirmOrganizeEmails();
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
          <VStack h={260} bg="lightgray" overflow="auto" my={4} py={2}>
            <Text>Test Email 1</Text>
            <Text>Test Email 2</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
            <Text>Test Email 3</Text>
          </VStack>
        </Box>
        <HStack gap={6} justify="center">
          {!loading ? (
            <>
          <Button onClick={handleCancel} isDisabled={loading} variant="outline">
            Cancel
          </Button>
            <Button isLoading={loading} onClick={handleOrganizeConfirmation}>
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
