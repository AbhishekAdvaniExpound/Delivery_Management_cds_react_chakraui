import React, { useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Heading,
  VStack,
  FormControl,
  useToast,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { scheduleDelivery } from "../api";
import { Package } from "lucide-react";

export default function DeliveryForm({ onSuccess }) {
  const toast = useToast();

  const [form, setForm] = useState({
    deliveryDate: "",
    recipient: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scheduleDelivery(form);
      toast({
        title: "Delivery Scheduled",
        description: "The delivery was added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onSuccess(); // trigger list refresh
      setForm({ deliveryDate: "", recipient: "", address: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule delivery.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box
      p={3}
      borderRadius="2xl"
      bg="white"
      boxShadow="base"
      border="1px solid"
      maxW="md"
      borderColor="gray.200"
    >
      <Heading size="md" mb={4} display="flex" alignItems="center" gap={2}>
        <Package size={20} />
        Schedule a New Delivery
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={5} align="stretch">
          <FormControl isRequired>
            <FormLabel fontWeight="semibold">Recipient</FormLabel>
            <Input
              name="recipient"
              placeholder="Enter recipient name"
              value={form.recipient}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="semibold">Delivery Address</FormLabel>
            <Input
              name="address"
              placeholder="Enter delivery address"
              value={form.address}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="semibold">Delivery Date</FormLabel>
            <Input
              type="date"
              name="deliveryDate"
              value={form.deliveryDate}
              onChange={handleChange}
            />
          </FormControl>

          {/* CTA aligned right like SAP Fiori */}
          <Flex>
            <Spacer />
            <Button colorScheme="blue" type="submit">
              Add Delivery
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}
