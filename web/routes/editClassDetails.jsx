import React, { useState, useEffect } from 'react';
import { Page, Layout, Card, TextField, Button, FormLayout, Text, Checkbox, Select } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from "../api"; // Adjust the API import based on your setup

export default function EditClassDetails() {
    const { id } = useParams(); // Get the class id from the URL
    const navigate = useNavigate();
    const [classDetails, setClassDetails] = useState(null);
    const [products, setProducts] = useState([]); // To store the list of products
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        maximumEnrollees: '',
        isVirtual: false,
        location: '',
        productId: ''
    });

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const classData = await api.class.findOne(id);
                console.log("Fetched class data:", classData); // Debugging log
                if (classData) {
                    setClassDetails(classData);
                    setFormData({
                        id: String(classData.id).replace(/\D/g, ''), // Ensure only digits in the ID
                        name: classData.name || '',
                        date: formatDate(classData.date) || '',
                        maximumEnrollees: classData.maximumEnrollees || '',
                        isVirtual: classData.isVirtual || false,
                        location: classData.location || '',
                        productId: classData.productId || ''
                    });
                } else {
                    setError("Class not found.");
                }
            } catch (error) {
                console.error("Error fetching class details:", error);
                setError("No class details found.");
            }
        };

        const fetchProducts = async () => {
            try {
                const productData = await api.shopifyProduct.findMany();
                setProducts(productData);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("No products found.");
            }
        };

        if (id) {
            fetchClassDetails();
            fetchProducts();
        }
    }, [id]);

    const handleChange = (field) => (value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            // Ensure `id` is a purely numeric string
            const classId = String(formData.id).replace(/\D/g, ''); // Strip any non-digits

            const updatedClass = {
                name: formData.name,
                date: new Date(formData.date).toISOString(),
                maximumEnrollees: Number(formData.maximumEnrollees),
                isVirtual: formData.isVirtual,
                location: formData.location,
                productId: formData.productId ? String(formData.productId).trim() : ""
            };


            // Pass the `id` separately if required
            await api.class.update(classId, updatedClass);

            alert('Class updated successfully!');
            navigate('/'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating class:', error);
            alert(`Error updating class: ${error.message}`);
        }
    };



    if (error) {
        return (
            <Page title="Edit Class">
                <Card sectioned>
                    <Text>{error}</Text>
                </Card>
            </Page>
        );
    }

    const productOptions = products.map((product) => ({
        label: product.title,
        value: String(product.id), // Ensure the value is a string
    }));

    return (
        <Page title={`Edit Class: ${formData.name || 'Unknown'}`}>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <FormLayout>
                            <Text variant="headingMd">Edit Class Details</Text>

                            <TextField
                                label="Class Name"
                                value={formData.name}
                                onChange={handleChange('name')}
                            />
                            <TextField
                                label="Date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange('date')}
                            />
                            <TextField
                                label="Maximum Enrollees"
                                type="number"
                                value={formData.maximumEnrollees}
                                onChange={handleChange('maximumEnrollees')}
                            />
                            <TextField
                                label="Location"
                                value={formData.location}
                                onChange={handleChange('location')}
                            />
                            <Checkbox
                                label="Virtual Class"
                                checked={formData.isVirtual}
                                onChange={handleChange('isVirtual')}
                            />

                            <Select
                                label="Associated Product"
                                options={productOptions}
                                value={formData.productId}
                                onChange={handleChange('productId')}
                            />

                            <Button primary onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </FormLayout>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
