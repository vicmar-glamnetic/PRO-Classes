import { useParams } from "react-router-dom";
import { api } from "../api";
import { useEffect, useState } from "react";
import { Page, Text, Card, Layout, Link } from "@shopify/polaris";

export default function ClassDetails() {
    const { id } = useParams(); // Get the class id from the URL
    const [classDetails, setClassDetails] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const classId = String(id); // Ensure this is a string
                console.log("Class ID:", classId);

                const classData = await api.class.findOne(classId);
                setClassDetails(classData);

                if (classData?.productId) {
                    // Fetch product details if productId is available
                    const productData = await api.shopifyProduct.findOne(String(classData.productId));
                    setProductDetails(productData);
                }
            } catch (error) {
                console.error("Error fetching class or product details:", error);
                setError("No class details found.");
                setClassDetails(null);
            }
        };

        if (id) {
            fetchClassDetails();
        }
    }, [id]);

    if (error) {
        return (
            <Page title="Class Details">
                <Card sectioned>
                    <Text variant="headingMd">{error}</Text>
                </Card>
            </Page>
        );
    }

    if (!classDetails) {
        return <Text>Loading...</Text>;
    }

    return (
        <Page title={`Class Details: ${classDetails.name || "Unknown"}`}>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd">{classDetails.name || "Unknown"}</Text>
                        <Text>Location: {classDetails.location || "Not specified"}</Text>
                        <Text>Date: {classDetails.date.toLocaleDateString() || "Not specified"}</Text>
                        <Text>Maximum Enrollees: {classDetails.maximumEnrollees || "Not specified"}</Text>
                    </Card>
                </Layout.Section>

                {/* Product Information Section */}
                {productDetails && (
                    <Layout.Section>
                        <Card sectioned title="Associated Product">
                            <Text variant="headingMd">Product Name: {productDetails.title || "Unknown"}</Text>
                            <a
                                href={`https://inhpro-development.myshopify.com/admin/products/${productDetails.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#5C6AC4', textDecoration: 'underline' }}
                            >
                                View Product in Admin
                            </a>
                        </Card>
                    </Layout.Section>
                )}
            </Layout>
        </Page>
    );
}
