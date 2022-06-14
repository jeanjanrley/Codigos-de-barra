// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence, initializeFirestore } from "firebase/firestore";

const firebaseConfigProd = {
	apiKey: process.env.REACT_APP_PROD_API_KEY,
	authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROD_PROJECT_ID,
	storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_PROD_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfigProd);

export const db = initializeFirestore(app, {
	cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

enableIndexedDbPersistence(db)
	.catch((err) => {
		if (err.code == "failed-precondition") {
			// Multiple tabs open, persistence can only be enabled
			// in one tab at a a time.
			// ...
			console.log("Error:", err.code);
		} else if (err.code == "unimplemented") {
			// The current browser does not support all of the
			// features required to enable persistence
			// ...
			console.log("Error:", err.code);
		}
	});