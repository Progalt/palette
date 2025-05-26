import admin from 'firebase-admin';

// Ensure the app is only initialized once
if (!admin.apps.length) {

   
  const serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // You might also set databaseURL if using Realtime Database
  });
}

const db = admin.firestore();

export { db };