importScripts(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({

    apiKey:
        "AIzaSyB9GXaJJNvKBLrrelcvNYUdVs3OZM539SM",

    authDomain:
        "flowchat-b9791.firebaseapp.com",

    databaseURL:
        "https://flowchat-b9791-default-rtdb.firebaseio.com",

    projectId:
        "flowchat-b9791",

    storageBucket:
        "flowchat-b9791.firebasestorage.app",

    messagingSenderId:
        "1012194532616",

    appId:
        "1:1012194532616:web:5006856bc30de68814e0bd"

});


const messaging =
    firebase.messaging();


/* =====================================================
   BACKGROUND PUSH
===================================================== */

messaging.onBackgroundMessage(
    payload => {

        console.log(
            "🔔 FlowChat Background Push:",
            payload
        );


        const title =
            payload.notification?.title ||
            "FlowChat";


        const body =
            payload.notification?.body ||
            "Новое сообщение 💬";


        const chatId =
            payload.data?.chatId ||
            "";


        const options = {

            body:
                body,

            icon:
                "/icon.png",

            data: {

                type:
                    "flowchat_message",

                chatId:
                    chatId

            },

            tag:
                chatId
                    ? `flowchat-${chatId}`
                    : "flowchat-message",

            renotify:
                true

        };


        self.registration.showNotification(

            title,

            options

        );

    }
);


/* =====================================================
   NOTIFICATION CLICK
===================================================== */

self.addEventListener(
    "notificationclick",

    event => {

        console.log(
            "🔔 FlowChat notification clicked"
        );


        event.notification.close();


        const chatId =
            event.notification.data?.chatId ||
            "";


        event.waitUntil(

            (async () => {

                const clients =
                    await self.clients.matchAll({

                        type:
                            "window",

                        includeUncontrolled:
                            true

                    });


                /* =========================================
                   ЕСЛИ FLOWCHAT УЖЕ ОТКРЫТ
                ========================================= */

                for (
                    const client of clients
                ) {

                    if (
                        "focus" in client
                    ) {

                        await client.focus();


                        /*
                         * Передаём chatId
                         * открытому FlowChat
                         */

                        client.postMessage({

                            type:
                                "FLOWCHAT_OPEN_CHAT",

                            chatId:
                                chatId

                        });


                        return;

                    }

                }


                /* =========================================
                   ЕСЛИ FLOWCHAT НЕ ОТКРЫТ
                ========================================= */

                const url =
                    chatId
                        ? `/chats.html?chat=${encodeURIComponent(chatId)}`
                        : "/chats.html";


                await self.clients.openWindow(
                    url
                );

            })()

        );

    }

);