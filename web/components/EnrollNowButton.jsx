// src/components/EnrollNowButton.jsx
import React from 'react';
import { AutoButton, useAction } from "@gadgetinc/react"; // Import necessary components
import { api } from "../api"; // Import your API client

const EnrollNowButton = ({ customerId, productId }) => {
    // Define an action for enrolling once the class ID is known
    const enrollAction = useAction(api.enrollment.create);

    const handleEnroll = async () => {
        try {
            // 1. Fetch the class associated with the product ID
            const classEntries = await api.class.findMany({
                where: {
                    productId: { equals: productId }, // Searching class by product ID
                },
            });

            // Check if any class is found
            if (classEntries.length > 0) {
                const classId = classEntries[0].id; // Get the first class ID

                // 2. Now, create the enrollment entry using the class ID and customer ID
                await enrollAction({ data: { customerId, classId } });

                alert("Enrollment successful!");
            } else {
                alert("No class found for this product.");
            }
        } catch (error) {
            console.error("Error enrolling:", error);
            alert("Error enrolling. Please try again.");
        }
    };

    return (
        <button onClick={handleEnroll}>
            Enroll Now
        </button>
    );
};

export default EnrollNowButton;
