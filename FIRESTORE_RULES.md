# Firestore Security Rules

## ⚠️ IMPORTANT: Update Your Rules

Your test showed that Firebase Auth works, but Firestore write is blocked by security rules.

### Steps to Fix:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **sneakers-store-e51ea**
3. Navigate to **Firestore Database** → **Rules**
4. Replace the existing rules with:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Sellers collection
    match /sellers/{sellerId} {
      // Anyone authenticated can read seller info
      allow read: if request.auth != null;
      // Only the seller themselves can write
      allow write: if request.auth != null && request.auth.uid == sellerId;
    }
    
    // Products collection
    match /products/{productId} {
      // Anyone can read products (including guests)
      allow read: if true;
      // Only authenticated users can create
      allow create: if request.auth != null;
      // Only product owner can update/delete
      allow update, delete: if request.auth != null 
        && resource.data.sellerId == request.auth.uid;
    }
    
    // Orders collection
    match /orders/{orderId} {
      // Users can only read their own orders
      allow read: if request.auth != null 
        && resource.data.buyerId == request.auth.uid;
      // Users can create orders for themselves
      allow create: if request.auth != null 
        && request.resource.data.buyerId == request.auth.uid;
    }
  }
}
```

5. Click **Publish**

---

## Quick Test Mode (Development Only)

If you need to quickly test without proper rules, use this temporary rule:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **Warning**: This is permissive - update to proper rules before production!

---

## After Updating Rules

Re-run the test script:
```bash
node --experimental-vm-modules scripts/test-auth.js
```

Expected output: **"ALL TESTS PASSED"**
