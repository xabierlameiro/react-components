import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

export type MessageType = {
  id?: string;
  uid: string;
  name: string;
  message: string;
  profilePicUrl: string;
  date: Date;
};

export function useLoadMessages() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  // Create the query to load the last 12 messages and listen for new ones.
  const recentMessagesQuery = query(
    collection(getFirestore(), "messages"),
    orderBy("timestamp", "desc"),
    limit(12)
  );

  useEffect(() => {
    // Start listening to the query.
    const unsubscribe = onSnapshot(recentMessagesQuery, (snapshot) => {
      const data = snapshot.docs.map((snapshot) => {
        const message = snapshot.data();
        const res = {
          id: snapshot.id,
          uid: message.uid,
          name: message.name,
          message: message.message,
          date: message.date,
          profilePicUrl: message.profilePicUrl,
        };
        return res;
      });
      setMessages(data);
    });
    // unsubscribe
    return () => unsubscribe();
  }, []);

  return { messages };
}
