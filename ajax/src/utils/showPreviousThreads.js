import { doc, collection, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const showPreviousThreads = async (userId) => {
    try {
        const userThreadsCollection = collection(db, 'userThreads');
        const userDocRef = doc(userThreadsCollection, userId);

        // Check if the user document exists
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // If the user document exists, extract threadIds and timestamps
            const userData = userDocSnapshot.data();

            if (userData) {
                const threadIds = Object.keys(userData);
                console.log('ThreadIds:', threadIds);

                // Extract timestamps for each threadId
                const timestamps = threadIds.map(threadId => userData[threadId]?.timestamp || null);
                console.log('Timestamps:', timestamps);

                return { threadIds, timestamps };
            } else {
                console.log('User data is empty.');
                return { threadIds: [], timestamps: [] };
            }
        } else {
            console.log('User document does not exist.');
            return { threadIds: [], timestamps: [] };
        }
    } catch (error) {
        console.error('Error retrieving threads from Firestore:', error);
        return { threadIds: [], timestamps: [] }; // Return empty result set on error
    }
};

export default showPreviousThreads;
