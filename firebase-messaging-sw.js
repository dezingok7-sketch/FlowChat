importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyB9GXaJJNvKBLrrelcvNYUdVs3OZM539SM",
  authDomain: "flowchat-b9791.firebaseapp.com",
  databaseURL: "https://flowchat-b9791-default-rtdb.firebaseio.com",
  projectId: "flowchat-b9791",
  storageBucket: "flowchat-b9791.firebasestorage.app",
  messagingSenderId: "1012194532616",
  appId: "1:1012194532616:web:5006856bc30de68814e0bd",
  measurementId: "G-0GBP7M5VGD"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log(
    "[FlowChat] Background message:",
    payload
  );

  const notificationTitle =
    payload.notification?.title ||
    "FlowChat";

  const notificationOptions = {

    body:
      payload.notification?.body ||
      "У вас новое сообщение 💬",

    icon:
      "/icon.png",

    data:
      payload.data || {}

  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});


self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();

    const chatId =
      event.notification.data?.chatId;

    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(clientList => {

        for (const client of clientList) {

          if (
            "focus" in client
          ) {

            if (chatId) {

              client.postMessage({
                type: "OPEN_PRIVATE_CHAT",
                chatId: chatId
              });

            }

            return client.focus();

          }

        }

        if (
          clients.openWindow
        ) {

          return clients.openWindow(
            "/chats.html"
          );

        }

      })

    );

  }
);
