import React, { useState, useEffect } from "react";
import { Page, TextField, Checkbox, Button, FormLayout, Card, Text, Layout, Select } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function ClassCreationForm() {
  const [formData, setFormData] = useState({
    date: "",
    isVirtual: false,
    location: "",
    maximumEnrollees: "",
    name: "",
    productId: "", // Add productId to the form data
  });
  const [products, setProducts] = useState([]); // Store the list of products
  const navigate = useNavigate();

  // Fetch available products when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await api.shopifyProduct.findMany(); // Replace with the actual API call
        const formattedProducts = productList.map((product) => ({
          label: product.title,
          value: product.id,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle input changes
  const handleChange = (field) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: field === "isVirtual" ? value : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const newClass = {
        date: `${formData.date}T00:00:00.000Z`,
        isVirtual: formData.isVirtual,
        location: formData.location,
        maximumEnrollees: parseInt(formData.maximumEnrollees, 10),
        name: formData.name,
        productId: formData.productId, // Add the selected product ID
      };

      const response = await api.class.create(newClass);
      console.log("Class created successfully:", response);
      alert("Class created successfully!");
      navigate("/"); // Navigate to the classes page or desired route
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Error creating class. Please try again.");
    }
  };

  return (
    <Page title="Create a New Class">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <FormLayout>
              <Text variant="headingLg">Class Information</Text>
              <TextField
                label="Class Date"
                type="date"
                value={formData.date}
                onChange={handleChange("date")}
                autoComplete="off"
              />
              <Checkbox
                label="Virtual Class"
                checked={formData.isVirtual}
                onChange={handleChange("isVirtual")}
              />
              <TextField
                label="Location"
                value={formData.location}
                onChange={handleChange("location")}
                autoComplete="off"
              />
              <TextField
                label="Maximum Enrollees"
                type="number"
                value={formData.maximumEnrollees}
                onChange={handleChange("maximumEnrollees")}
                autoComplete="off"
              />
              <TextField
                label="Class Name"
                value={formData.name}
                onChange={handleChange("name")}
                autoComplete="off"
              />
              <Select
                label="Associated Product"
                options={products}
                value={formData.productId}
                onChange={handleChange("productId")}
                placeholder="Select a product"
              />
              <Button onClick={handleSubmit} primary>
                Create Class
              </Button>
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ClassCreationForm;
