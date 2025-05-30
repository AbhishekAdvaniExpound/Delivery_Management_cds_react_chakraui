import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Tag,
  Button,
  Flex,
  Spacer,
  useToast,
  Select,
} from "@chakra-ui/react";
import { fetchDeliveries, printLabel } from "../api";
import { CalendarDays, Printer } from "lucide-react";

const statusColorMap = {
  Scheduled: "blue",
  "In Transit": "orange",
  Delivered: "green",
};

const ITEMS_PER_PAGE = 5;

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const toast = useToast();

  const load = async () => {
    const data = await fetchDeliveries();
    setDeliveries(data);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const data =
      statusFilter === "ALL"
        ? deliveries
        : deliveries.filter((d) => d.status === statusFilter);
    setFiltered(data);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [statusFilter, deliveries]);

  const handlePrint = async (id) => {
    const res = await printLabel(id);
    const { file, filename } = res.data;

    // Decode and trigger download
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${file}`;
    link.download = filename;
    link.click();

    toast({
      title: "Label Printed",
      description: "Download started.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    load();
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="semibold">Filter by Status:</Text>
        <Select
          maxW="200px"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="Scheduled">Scheduled</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </Select>
      </Flex>

      {pageData.length === 0 ? (
        <Text>No deliveries found.</Text>
      ) : (
        pageData.map((d) => (
          <Box
            key={d.ID}
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            bg="white"
            boxShadow="sm"
          >
            <Flex align="center">
              <Box>
                <HStack spacing={3}>
                  <CalendarDays size={18} />
                  <Text fontWeight="semibold">{d.deliveryDate}</Text>
                  <Tag colorScheme={statusColorMap[d.status] || "gray"}>
                    {d.status}
                  </Tag>
                  {d.labelPrinted && (
                    <Tag size="sm" colorScheme="green">
                      Label Printed
                    </Tag>
                  )}
                </HStack>
                <Text mt={1} color="gray.600">
                  📍 {d.recipient} — {d.address}
                </Text>
              </Box>
              <Spacer />
              <Button
                colorScheme="blue"
                variant="outline"
                leftIcon={<Printer size={16} />}
                onClick={() => handlePrint(d.ID)}
              >
                Print Label
              </Button>
            </Flex>
          </Box>
        ))
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Flex justify="flex-end" pt={2} gap={2}>
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Text pt={2}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      )}
    </VStack>
  );
}
