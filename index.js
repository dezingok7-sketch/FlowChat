const {
    onValueCreated
} = require("firebase-functions/v2/database");

const {
    initializeApp
} = require("firebase-admin/app");

const {
    getMessaging
} = require("firebase-admin/messaging");

const {
    getDatabase
} = require("firebase-admin/database");


initializeApp();


exports.sendMessageNotification =
    onValueCreated(
        "/chats/{chatId}/messages/{messageId}",
        async (event) => {

            const message =
                event.data.val();

            if (!message) {
                return;
            }


            console.log(
                "💬 Новое сообщение:",
                event.params.chatId,
                event.params.messageId
            );


            /*
             * Получатель
             */

            const receiverUid =
                message.receiverUid;


            if (!receiverUid) {

                console.log(
                    "⚠️ receiverUid отсутствует"
                );

                return;

            }


            /*
             * Не отправляем уведомление
             * самому себе
             */

            if (
                message.uid ===
                receiverUid
            ) {

                console.log(
                    "ℹ️ Сообщение самому себе — Push не нужен"
                );

                return;

            }


            /*
             * Получаем FCM token получателя
             */

            const tokenSnapshot =
                await getDatabase()
                    .ref(
                        `users/${receiverUid}/fcmToken`
                    )
                    .get();


            if (
                !tokenSnapshot.exists()
            ) {

                console.log(
                    "ℹ️ У получателя нет FCM token"
                );

                return;

            }


            const token =
                tokenSnapshot.val();


            /*
             * Данные отправителя
             */

            const username =
                message.username
                    ? "@" +
                      String(
                          message.username
                      ).replace(/^@/, "")
                    : "FlowChat";


            /*
             * Текст уведомления
             *
             * Само сообщение может быть
             * зашифровано, поэтому НЕ
             * отправляем его содержимое.
             */

            const notificationBody =
                "Новое сообщение 💬";


            /*
             * Отправляем Push
             */

            try {

                const response =
                    await getMessaging()
                        .send({

                            token:
                                token,

                            notification: {

                                title:
                                    username,

                                body:
                                    notificationBody

                            },

                            data: {

                                chatId:
                                    String(
                                        event.params.chatId
                                    ),

                                messageId:
                                    String(
                                        event.params.messageId
                                    ),

                                senderUid:
                                    String(
                                        message.uid ||
                                        ""
                                    )

                            }

                        });


                console.log(
                    "✅ Push отправлен:",
                    response
                );


            } catch (error) {

                console.error(
                    "❌ Ошибка отправки Push:",
                    error
                );

            }

        }
    );