import React, { useState, useEffect } from 'react';
import { Banner, BlockStack, Box, Card, Layout, Link, Page, Text, DataTable, Button } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { Provider as GadgetProvider } from "@gadgetinc/react-shopify-app-bridge"; // Import the GadgetProvider
import { api } from "../api"; // Ensure you import your API client

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate(); // Hook to navigate 

  // Fetch class data
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await api.class.findMany(); // Adjust based on your actual API call
        setClasses(result);
      } catch (error) {
        console.error("Error fetching class data", error);
      }
    };
    fetchClasses();
  }, []);

  // Custom renderer for "name" column
  const handleRowClick = (row) => {
    const classId = String(row.id);
    navigate(`/class/${row.id}`); // Assuming row has a unique "id"
  };

  // Handle delete class action
  const handleDeleteClass = async (classItem) => {
    try {
      const classId = String(classItem.id);
      // Perform delete operation via API
      await api.class.delete(classId);

      const result = await api.class.findMany(); // Adjust based on your actual API call
      setClasses(result);

      alert("Class deleted successfully!");
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("Error deleting class. Please try again.");
    }
  };

  // Handle edit class action
  const handleEditClass = (classItem) => {
    navigate(`/edit-class/${classItem.id}`); // Redirect to edit page with class ID
  };

  // Map rows to display class details with delete and edit button
  const rows = classes.map((classItem) => [
    <Link key={classItem.id} onClick={() => handleRowClick(classItem)}>
      {classItem.name}
    </Link>,
    classItem.date.toLocaleDateString(),
    classItem.maximumEnrollees,
    <Button destructive onClick={() => handleDeleteClass(classItem)}>
      Delete
    </Button>,
    <Button primary onClick={() => handleEditClass(classItem)}>
      Edit
    </Button>
  ]);

  // Wrap the component with GadgetProvider
  return (
    <GadgetProvider
      type="Embedded"
      shopifyApiKey="e00dea3c19921a4267c3e3ab8925514a"
      api={api} // Pass the API instance
    >
      <Page title="Classes">
        <Layout>
          <Layout.Section>
            <Card>
              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
                headings={['Name', 'Date', 'Maximum Enrollees', 'Actions', 'Actions']}
                rows={rows}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </GadgetProvider>
  );
}
