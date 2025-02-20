import React from 'react';

import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { Button } from "@/components/ui/button";

export default function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("reading");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) fetchBooks(user.uid);
    });
  }, []);

  const fetchBooks = async (uid) => {
    const q = query(collection(db, "books"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    setBooks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    fetchBooks(result.user.uid);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setBooks([]);
  };

  const handleAddBook = async () => {
    if (!title) return;
    const docRef = await addDoc(collection(db, "books"), { uid: user.uid, title, status });
    setBooks([...books, { id: docRef.id, title, status }]);
    setTitle("");
  };

  return (
    <div className="p-4 text-center">
      {!user ? (
        <Button onClick={handleLogin}>Login with Google</Button>
      ) : (
        <>
          <p>Welcome, {user.displayName}!</p>
          <Button onClick={handleLogout} className="mt-2">Logout</Button>
          <div className="mt-4">
            <input
              className="border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book title"
            />
            <select className="border p-2 ml-2" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
              <option value="want to read">Want to Read</option>
            </select>
            <Button onClick={handleAddBook} className="ml-2">Add Book</Button>
          </div>
          <ul className="mt-4">
            {books.map((book) => (
              <li key={book.id}>{book.title} - {book.status}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
