import React from "react";
import {
  Box,
  Heading,
  Grid,
  Container,
  Divider,
  Text,
  Flex,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import DeliveryForm from "./components/DeliveryForm";
import DeliveryList from "./components/DeliveryList";
import { ClipboardList } from "lucide-react";

export default function App() {
  const cardBg = useColorModeValue("white", "gray.800");
  const pageBg = useColorModeValue("gray.50", "gray.900");

  const [refreshKey, setRefreshKey] = React.useState(0);

  return (
    <Box bg={pageBg} minH="100vh" py={6}>
      <Container maxW="9xl">
        <Flex
          bg=""
          px={6}
          py={4}
          borderBottom="1px solid"
          borderColor="gray.200"
          mb={6}
        >
          <Box>
            <Heading size="lg" color="gray.800">
              Delivery Management
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Track, schedule, and print delivery labels
            </Text>
          </Box>
          <Spacer />
        </Flex>
        <Spacer />

        {/* 🧩 Use Grid instead of VStack */}
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {/* Form – span 2 columns */}
          <Box gridColumn="span 3" p={0} borderRadius="xl" boxShadow="sm">
            <DeliveryForm onSuccess={() => setRefreshKey((k) => k + 1)} />
          </Box>

          {/* Delivery List – span 10 columns */}
          <Box
            gridColumn="span 9"
            bg={cardBg}
            p={4}
            borderRadius="xl"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.200"
          >
            <Heading
              size="md"
              mb={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <ClipboardList size={20} />
              Delivery Schedule
            </Heading>

            <DeliveryList key={refreshKey} />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
