import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config";

export async function createUserIfNotExists(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
}) {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      name: user.displayName || "Unnamed",
      role: "employee", // default role for now...
      busniessId: null, // will be FK from business schema
      createdAt: serverTimestamp(),
    });
  }
}
