/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  // updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import // getStorage,
// ref,
// uploadBytesResumable,
// getDownloadURL,
"firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getPerformance } from "firebase/performance";

import { getFirebaseConfig } from "./firebase-config";

// Initiate firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

export function isUserAuth() {
  // Listen to auth state changes.
  return onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      return true;
      // ...
    }
    return false;
  });
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl(): string | null {
  return getAuth()?.currentUser?.photoURL || "/images/profile_placeholder.png";
}

// // Returns the signed-in user's display name.
function getUserName() {
  return getAuth()?.currentUser?.displayName;
}

function getUserId() {
  return getAuth()?.currentUser?.uid;
}

// // Returns true if a user is signed-in.
// function isUserSignedIn() {
//     return !!getAuth().currentUser
// }

// // Saves a new message on the Cloud Firestore.
export async function saveMessage(messageText: string) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), "messages"), {
      uid: getUserId(),
      name: getUserName(),
      message: messageText,
      profilePicUrl: getProfilePicUrl(),
      date: new Date().toLocaleString(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

type DocumentData = {};

// // Loads chat messages history and listens for upcoming ones.
export function useLoadMessages() {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  // Create the query to load the last 12 messages and listen for new ones.
  const recentMessagesQuery = query(
    collection(getFirestore(), "messages"),
    orderBy("timestamp", "desc"),
    limit(100)
  );
  useEffect(() => {
    // Start listening to the query.
    const unsubscribe = onSnapshot(recentMessagesQuery, function (snapshot) {
      const data = snapshot.docChanges().map((change) => change.doc.data());
      setMessages(data);
    });
    // remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, [recentMessagesQuery]);

  return { messages };
}

// // Saves a new message containing an image in Firebase.
// // This first saves the image in Firebase storage.
// async function saveImageMessage(file) {
//     try {
//         // 1 - We add a message with a loading icon that will get updated with the shared image.
//         const messageRef = await addDoc(
//             collection(getFirestore(), 'messages'),
//             {
//                 name: getUserName(),
//                 imageUrl: LOADING_IMAGE_URL,
//                 profilePicUrl: getProfilePicUrl(),
//                 timestamp: serverTimestamp(),
//             }
//         )

//         // 2 - Upload the image to Cloud Storage.
//         const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${
//             file.name
//         }`
//         const newImageRef = ref(getStorage(), filePath)
//         const fileSnapshot = await uploadBytesResumable(newImageRef, file)

//         // 3 - Generate a public URL for the file.
//         const publicImageUrl = await getDownloadURL(newImageRef)

//         // 4 - Update the chat message placeholder with the image's URL.
//         await updateDoc(messageRef, {
//             imageUrl: publicImageUrl,
//             storageUri: fileSnapshot.metadata.fullPath,
//         })
//     } catch (error) {
//         console.error(
//             'There was an error uploading a file to Cloud Storage:',
//             error
//         )
//     }
// }

// // Saves the messaging device token to Cloud Firestore.
async function saveMessagingDeviceToken() {
  try {
    const bla = getMessaging();
    const currentToken = await getToken(bla);
    if (currentToken) {
      console.log("Got FCM device token:", currentToken);
      // Saving the Device Token to Cloud Firestore.
      const tokenRef = doc(getFirestore(), "fcmTokens", currentToken);
      await setDoc(tokenRef, { uid: getAuth()?.currentUser?.uid });

      // This will fire when a message is received while the app is in the foreground.
      // When the app is in the background, firebase-messaging-sw.js will receive the message instead.
      onMessage(getMessaging(), (message) => {
        console.log(
          "New foreground notification from Firebase Messaging!",
          message.notification
        );
      });
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  } catch (error) {
    console.error("Unable to get messaging token.", error);
  }
}

// // Requests permissions to show notifications.
async function requestNotificationsPermissions() {
  console.log("Requesting notifications permission...");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification permission granted.");
    // Notification permission granted.
    await saveMessagingDeviceToken();
  } else {
    console.log("Unable to get permission to notify.");
  }
}

// // Triggered when a file is selected via the media picker.
// function onMediaFileSelected(event) {
//     event.preventDefault()
//     var file = event.target.files[0]

//     // Clear the selection in the file picker input.

//     // Check if the file is an image.
//     if (!file.type.match('image.*')) {
//         var data = {
//             message: 'You can only share images',
//             timeout: 2000,
//         }
//         return
//     }
//     // Check if the user is signed-in
//     if (checkSignedInWithMessage()) {
//         saveImageMessage(file)
//     }
// }

// // Triggered when the send new message form is submitted.
// function onMessageFormSubmit(e) {
//     e.preventDefault()
//     // Check that the user entered a message and is signed in.

//     if (e.event.value && checkSignedInWithMessage()) {
//         saveMessage(e.event.value)
//     }
// }

// // Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user: any) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl: string = getProfilePicUrl() || "";
    const userName = getUserName();

    // Set the user's profile pic and name.
    const picture = "url(" + addSizeToGoogleProfilePic(profilePicUrl) + ")";
    // We save the Firebase Messaging Device token and enable notifications.

    console.log(userName, picture);
    // podemos enseñar la imagen y el nombre de usuario y mostrar el botón de logout
    saveMessagingDeviceToken();
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    // ocultamos el botón de desloguearse, la foto y el nombre de usuario
    // Show sign-in button.
    // enseñamos el botón de login
  }
}

// // Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url: string) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150";
  }
  return url;
}

// // A loading image URL.
// const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a'

// function createAndInsertMessage(id, timestamp) {
// const container = document.createElement('div');
// container.innerHTML = MESSAGE_TEMPLATE;
// const div = container.firstChild;
// div.setAttribute('id', id);

// If timestamp is null, assume we've gotten a brand new message.
// https://stackoverflow.com/a/47781432/4816918
// timestamp = timestamp ? timestamp.toMillis() : Date.now();
// div.setAttribute('timestamp', timestamp);

// figure out where to insert new message
// const existingMessages = messageListElement.children;
// if (existingMessages.length === 0) {
//   // messageListElement.appendChild(div);
// } else {
//   // let messageListNode = existingMessages[0];

//   while (messageListNode) {
//     const messageListNodeTime = messageListNode.getAttribute('timestamp');

//     if (!messageListNodeTime) {
//       throw new Error(
//         `Child ${messageListNode.id} has no 'timestamp' attribute`
//       );
//     }

//     if (messageListNodeTime > timestamp) {
//       break;
//     }

//     messageListNode = messageListNode.nextSibling;
//   }

// messageListElement.insertBefore(div, messageListNode);
// }

//     return null
// }

// // Displays a Message in the UI.
// function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
// var div =
//   document.getElementById(id) || createAndInsertMessage(id, timestamp);

// profile picture
// if (picUrl) {
//   div.querySelector('.pic').style.backgroundImage =
//     'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
// }

// div.querySelector('.name').textContent = name;
// var messageElement = div.querySelector('.message');

// if (text) {
//   // If the message is text.
//   messageElement.textContent = text;
//   // Replace all line breaks by <br>.
//   messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
// } else if (imageUrl) {
//   // If the message is an image.
//   var image = document.createElement('img');
//   // image.addEventListener('load', function () {
//   //   messageListElement.scrollTop = messageListElement.scrollHeight;
//   // });
//   image.src = imageUrl + '&' + new Date().getTime();
//   messageElement.innerHTML = '';
//   messageElement.appendChild(image);
// }
// // Show the card fading-in and scroll to view the new message.
// setTimeout(function () {
//   div.classList.add('visible');
// }, 1);
// messageListElement.scrollTop = messageListElement.scrollHeight;
// messageInputElement.focus();
//     return <div>hello</div>
// }

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
getPerformance();
initFirebaseAuth();
