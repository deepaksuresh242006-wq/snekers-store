
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore/lite";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read existing .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
let envConfig = {};

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        // Handle comments and empty lines
        if (!line || line.startsWith('#')) return;

        // Split on first '=' only
        const parts = line.split('=');
        const key = parts[0].trim();
        // Rejoin the rest in case value contains '='
        const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, ''); // Remove quotes if present

        if (key && value) {
            envConfig[key] = value;
        }
    });

    // Also check if keys are loaded
    const requiredKeys = [
        "VITE_FIREBASE_API_KEY",
        "VITE_FIREBASE_AUTH_DOMAIN",
        "VITE_FIREBASE_PROJECT_ID",
        "VITE_FIREBASE_STORAGE_BUCKET",
        "VITE_FIREBASE_MESSAGING_SENDER_ID",
        "VITE_FIREBASE_APP_ID"
    ];
    const missing = requiredKeys.filter(k => !envConfig[k]);
    if (missing.length > 0) {
        console.warn("Warning: Missing some env keys:", missing);
    }

} else {
    console.error(".env.local not found!");
    process.exit(1);
}

const firebaseConfig = {
    apiKey: envConfig.VITE_FIREBASE_API_KEY,
    authDomain: envConfig.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: envConfig.VITE_FIREBASE_PROJECT_ID,
    storageBucket: envConfig.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envConfig.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: envConfig.VITE_FIREBASE_APP_ID
};

console.log("Initializing Firebase with config (partial):", {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function testAuth() {
    console.log("Starting Firebase Auth & Firestore Test...");
    const testEmailMd5 = Math.random().toString(36).substring(7);
    const testEmail = `testuser_${testEmailMd5}@example.com`;
    const testPassword = "TestPassword123!";
    let userId;

    try {
        console.log(`Attempting to sign up with ${testEmail}...`);
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        const user = userCredential.user;
        userId = user.uid;
        console.log(`Create User Success: ensure user exists (uid: ${userId})`);

        // Test Firestore Write
        console.log("Attempting to write user document to Firestore...");
        const userRef = doc(db, "users", userId);
        const userData = {
            email: testEmail,
            uid: userId,
            email: testEmail,
            uid: userId,
            name: "Test User",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            test: true
        };
        await setDoc(userRef, userData);
        console.log("Firestore Write Success: User document created.");

        // Test Firestore Read
        console.log("Attempting to read user document from Firestore...");
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            console.log("Firestore Read Success: Document found.");
        } else {
            throw new Error("Firestore Read Failed: Document not found after write.");
        }

        console.log(`Attempting to sign in with ${testEmail}...`);
        await signInWithEmailAndPassword(auth, testEmail, testPassword);
        console.log("Sign In Success: User authenticated.");

        console.log("Cleaning up (Deleting user & doc)...");
        await deleteDoc(userRef);
        await deleteUser(user);
        console.log("Cleanup Success: User & doc deleted.");

        console.log("ALL TESTS PASSED");
    } catch (error) {
        console.error("TEST FAILED:", error);
        if (error.code === 'permission-denied') {
            console.error("\nFirestore Permission Denied. Check your Firestore Security Rules.");
        }
        process.exit(1);
    }
}

testAuth();
