/* =====================================================
   FLOWCHAT — FIND LANGUAGE ERROR
===================================================== */

console.log(
    "🔎 FLOWCHAT LANGUAGE DEBUG START"
);
/* =====================================================
   1. CHECK GLOBAL
===================================================== */

console.log(
    "window.flowChatLanguages =",
    window.flowChatLanguages
);

console.log(
    "window.TEXT =",
    window.TEXT
);

console.log(
    "window.LANGUAGES =",
    window.LANGUAGES
);

console.log(
    "window.LANGUAGE_CODES =",
    window.LANGUAGE_CODES
);

/* =====================================================
   2. CHECK LANGUAGE SYSTEM
===================================================== */

if (
    window.flowChatLanguages
) {

    console.log(
        "✅ languages.js найден"
    );

    console.log(
        "🌍 Доступные языки:",
        window.flowChatLanguages
            .LANGUAGE_CODES
    );

} else {

    console.error(
        "❌ languages.js НЕ найден"
    );

}


/* =====================================================
   3. CHECK SCRIPT TAGS
===================================================== */

console.log(
    "📜 Все script:",
    [
        ...document.querySelectorAll(
            "script"
        )
    ].map(
        (script, index) => ({

            index: index,

            src:
                script.src ||
                "(inline)",

            type:
                script.type ||
                "classic"

        })
    )
);


/* =====================================================
   4. FIND languages.js
===================================================== */

const languageScripts =
    [
        ...document.querySelectorAll(
            'script[src*="languages.js"]'
        )
    ];

if (
    languageScripts.length
) {

    console.log(
        "✅ Найден languages.js:",
        languageScripts.map(
            script =>
                script.src
        )
    );

} else {

    console.error(
        "❌ <script src=\"languages.js\"> НЕ найден в HTML"
    );

}


/* =====================================================
   5. CHECK LOAD ORDER
===================================================== */

const scripts =
    [
        ...document.querySelectorAll(
            "script"
        )
    ];

const languageIndex =
    scripts.findIndex(
        script =>
            script.src.includes(
                "languages.js"
            )
    );

const chatsIndex =
    scripts.findIndex(
        script =>
            script.src.includes(
                "chats.js"
            )
    );


console.log(
    "📌 languages.js index:",
    languageIndex
);

console.log(
    "📌 chats.js index:",
    chatsIndex
);


if (
    languageIndex !== -1 &&
    chatsIndex !== -1
) {

    if (
        languageIndex <
        chatsIndex
    ) {

        console.log(
            "✅ languages.js подключён раньше chats.js"
        );

    } else {

        console.error(
            "❌ chats.js подключён раньше languages.js!"
        );

    }

}


/* =====================================================
   6. FIND LANGUAGE CHECK ELEMENTS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🔎 Проверяем кнопку языка..."
        );


        const button =
            document.getElementById(
                "settingsLanguage"
            );


        if (button) {

            console.log(
                "✅ settingsLanguage найден:",
                button
            );

        } else {

            console.error(
                "❌ settingsLanguage НЕ найден"
            );

        }


        console.log(
            "🔎 Проверка завершена"
        );

    }
);
/* =====================================================
   FLOWCHAT — CHATS.JS
   PART 1/3
===================================================== */

import {
    auth,
    db
} from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getMessaging,
    getToken,
    onMessage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

import {
    ref,
    set,
    get,
    push,
    remove,
    onValue,
    onChildAdded,
    update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
    messaging
} from "./firebase.js";




console.log("🔥🔥🔥 CHATS.JS ЗАПУСТИЛСЯ 🔥🔥🔥");

window.addEventListener("load", () => {
    console.log("🔥🔥🔥 HTML ПОЛНОСТЬЮ ЗАГРУЖЕН 🔥🔥🔥");
});

/* =====================================================
   GLOBAL STATE
===================================================== */

const VAPID_KEY =
    "BFGrgjfxVsVe8ZcoDCeDdcrxH9iDBuMZr6pu2kQmxW3EQSImGWzzTf1C0QbxasbnAySZMSQXkioc9AYxc9jeUyg";
    const PUSH_WORKER_URL =
    "https://broken-math-a731.dezingok7.workers.dev";

let currentUser = null;
let currentPrivateChatUserId = null;

let currentProfile = {
    name: "",
    username: ""
};

let currentChatId = null;

let messagesListener = null;

const SYSTEM_CHAT_ID =
    "flow_system";
    
    /* =====================================================
   PUSH — OPEN CHAT FROM NOTIFICATION
===================================================== */

navigator.serviceWorker?.addEventListener(
    "message",
    event => {

        const data =
            event.data;

        if (
            !data ||
            data.type !==
                "FLOWCHAT_OPEN_CHAT"
        ) {
            return;
        }

        const chatId =
            data.chatId;

        if (!chatId) {
            console.log(
                "❌ PUSH: chatId отсутствует"
            );
            return;
        }

        console.log(
            "🔔 PUSH: открываем чат:",
            chatId
        );

        openChatFromPush(
            chatId
        );

    }
);


/* =====================================================
   OPEN CHAT FROM PUSH
===================================================== */

function openChatFromPush(chatId) {

    if (!currentUser) {

        /*
         * Если пользователь ещё не успел
         * авторизоваться — сохраним чат.
         */

        sessionStorage.setItem(
            "flowchat_push_chat",
            chatId
        );

        return;

    }


    sessionStorage.removeItem(
        "flowchat_push_chat"
    );


    /*
     * Передаём ID в текущую систему
     * открытия чатов.
     */

    currentChatId =
        chatId;


    /*
     * Если это системный чат
     */

    if (
        chatId ===
        SYSTEM_CHAT_ID
    ) {

        if (
            typeof openSystemChat ===
            "function"
        ) {

            openSystemChat();

        }

        return;

    }


    /*
     * Избранное
     */

    if (
        chatId ===
        "favorites"
    ) {

        if (
            typeof openFavorites ===
            "function"
        ) {

            openFavorites();

        }

        return;

    }


    /*
     * Приватный чат.
     *
     * Если у тебя уже есть функция
     * открытия приватного чата,
     * используем её.
     */

    if (
        typeof openPrivateChat ===
        "function"
    ) {

        openPrivateChat(
            chatId
        );

        return;

    }


    /*
     * Запасной вариант:
     * просто обновляем currentChatId.
     *
     * Твоя существующая система
     * загрузки сообщений сможет
     * использовать этот ID.
     */

    console.log(
        "ℹ️ PUSH: currentChatId установлен:",
        currentChatId
    );

}


/* =====================================================
   DOM ELEMENTS
===================================================== */

const messages =
    document.getElementById(
        "messages"
    );

const messageInput =
    document.getElementById(
        "messageInput"
    );

const messageForm =
    document.getElementById(
        "messageForm"
    );

const sendButton =
    document.getElementById(
        "sendButton"
    );

const attachButton =
    document.getElementById(
        "attachButton"
    );

const fileInput =
    document.getElementById(
        "fileInput"
    );

const favoritesChat =
    document.getElementById(
        "favoritesChat"
    );

const systemChat =
    document.getElementById(
        "systemChat"
    );

const chatTitle =
    document.getElementById(
        "chatTitle"
    );

const chatSubtitle =
    document.getElementById(
        "chatSubtitle"
    );

const chatHeaderAvatar =
    document.getElementById(
        "chatHeaderAvatar"
    );

const chatInfoBtn =
    document.getElementById(
        "chatInfoBtn"
    );

const infoModal =
    document.getElementById(
        "infoModal"
    );
const infoModalClose =
    document.getElementById(
        "infoModalClose"
    );

const infoModalTitle =
    document.getElementById(
        "infoModalTitle"
    );

const infoModalText =
    document.getElementById(
        "infoModalText"
    );

const profileOverlay =
    document.getElementById(
        "profileOverlay"
    );

const profilePanel =
    document.getElementById(
        "profilePanel"
    );

const profileClose =
    document.getElementById(
        "profileClose"
    );

const profileBtn =
    document.getElementById(
        "profileBtn"
    );

const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );

const profileTitle =
    document.getElementById(
        "profileTitle"
    );

const profileUsername =
    document.getElementById(
        "profileUsername"
    );

const profileNameInput =
    document.getElementById(
        "profileNameInput"
    );

const profileUsernameInput =
    document.getElementById(
        "profileUsernameInput"
    );

const saveProfileBtn =
    document.getElementById(
        "saveProfileBtn"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const sidebar =
    document.getElementById(
        "sidebar"
    );

const sidebarBackdrop =
    document.getElementById(
        "sidebarBackdrop"
    );

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const toast =
    document.getElementById(
        "toast"
    );


/* =====================================================
   SETTINGS ELEMENTS
===================================================== */

const settingsButton =
    document.getElementById(
        "settingsButton"
    );

const settingsOverlay =
    document.getElementById(
        "settingsOverlay"
    );
    

/* =====================================================
   TOAST
===================================================== */

function showToast(text) {

    if (!toast) {
        return;
    }

    toast.textContent =
        text;

    toast.classList.add(
        "active"
    );

    clearTimeout(
        showToast.timer
    );

    showToast.timer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "active"
                );

            },
            2500
        );

}


/* =====================================================
   LANGUAGE
===================================================== */

function getLanguage() {

    return (
        localStorage.getItem(
            "flowchat_language"
        ) || "ru"
    );

}
async function setupPushNotifications() {

    console.log("🔔 PUSH SETUP START");

    if (!currentUser) {
        console.log("❌ Пользователь ещё не авторизован");
        return;
    }

    try {

        /* ================================
           SERVICE WORKER
        ================================= */

        const registration =
            await navigator.serviceWorker.register(
                "./firebase-messaging-sw.js"
            );

        console.log(
            "✅ Firebase Messaging SW зарегистрирован:",
            registration
        );


        /* ================================
           PERMISSION
        ================================= */

        const permission =
            await Notification.requestPermission();

        console.log(
            "🔔 Notification permission:",
            permission
        );

        if (permission !== "granted") {

            console.log(
                "❌ Разрешение на уведомления не выдано"
            );

            return;
        }


        /* ================================
           FCM TOKEN
        ================================= */

        const token =
            await getToken(
                messaging,
                {
                    vapidKey:
                        VAPID_KEY,

                    serviceWorkerRegistration:
                        registration
                }
            );


        if (!token) {

            console.log(
                "❌ FCM token не получен"
            );

            return;
        }


        console.log(
            "🔔 FCM TOKEN:",
            token
        );


        /* ================================
           SAVE TOKEN
        ================================= */

        await set(
            ref(
                db,
                `users/${currentUser.uid}/fcmToken`
            ),
            token
        );


        console.log(
            "✅ FCM token сохранён в Firebase"
        );


    } catch (error) {

        console.error(
            "❌ PUSH SETUP ERROR:",
            error
        );

    }

}


/* =====================================================
   SEND PUSH THROUGH CLOUDFLARE WORKER
===================================================== */

/* =====================================================
   SEND PUSH THROUGH CLOUDFLARE WORKER
===================================================== */

async function sendPush(token, title, body, chatId) {

    if (!token) {
        console.error("❌ PUSH: FCM token отсутствует");
        return false;
    }

    try {

        console.log("🔔 PUSH: отправляем уведомление...");
        console.log("🔔 PUSH TOKEN:", token);
        console.log("🔔 PUSH CHAT:", chatId);

        const response = await fetch(
            PUSH_WORKER_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    token: token,
                    title: title || "FlowChat",
                    body: body || "Новое сообщение 💬",
                    chatId: chatId || ""
                })
            }
        );

        const text = await response.text();

        console.log(
            "🔔 PUSH WORKER RESPONSE:",
            response.status,
            text
        );

        if (!response.ok) {

            console.error(
                "❌ PUSH WORKER ERROR:",
                response.status,
                text
            );

            return false;
        }

        console.log(
            "✅ PUSH: уведомление принято Worker"
        );

        return true;

    } catch (error) {

        console.error(
            "❌ PUSH FETCH ERROR:",
            error
        );

        return false;
    }
}

/* =====================================================
   PROFILE LOAD
===================================================== */

async function loadProfile(user) {

    if (!user) {
        return;
    }

    try {

        const profileRef = ref(
            db,
            `users/${user.uid}/profile`
        );

        const snapshot = await get(
            profileRef
        );


        if (snapshot.exists()) {

            const data = snapshot.val();

            currentProfile = {

                name:
                    data.name ||
                    user.displayName ||
                    "Пользователь",

                username:
                    data.username ||
                    ""

            };

        } else {

            currentProfile = {

                name:
                    user.displayName ||
                    "Пользователь",

                username:
                    ""

            };

        }


        /* СНАЧАЛА обновляем профиль */

        updateProfileUI();


        /* ПОТОМ обновляем sidebar */

        updateSidebarProfile();


        /* И ещё раз после отрисовки HTML */

        setTimeout(
            updateSidebarProfile,
            50
        );


    } catch (error) {

        console.error(
            "Ошибка загрузки профиля:",
            error
        );

    }

}

/* =====================================================
   PROFILE UI
===================================================== */

function updateProfileUI() {

    const name =
        currentProfile.name ||
        currentUser?.displayName ||
        "Пользователь";

    const username =
        currentProfile.username ||
        "username";


    if (profileTitle) {

        profileTitle.textContent =
            name;

    }


    if (profileUsername) {

        profileUsername.textContent =
            "@" + username;

    }


    if (profileNameInput) {

        profileNameInput.value =
            currentProfile.name || "";

    }


    if (profileUsernameInput) {

        profileUsernameInput.value =
            currentProfile.username
                ? "@" +
                  currentProfile.username
                : "";

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            name
                .charAt(0)
                .toUpperCase() ||
            "?";

    }

}

/* =====================================================
   SIDEBAR PROFILE
===================================================== */

function updateSidebarProfile() {

    const sidebarAvatar =
        document.getElementById(
            "sidebarAvatar"
        );

    const sidebarName =
        document.getElementById(
            "sidebarName"
        );

    const sidebarUsername =
        document.getElementById(
            "sidebarUsername"
        );


    const name =
        currentProfile.name ||
        currentUser?.displayName ||
        "Пользователь";


    const username =
        currentProfile.username ||
        "";


    if (sidebarAvatar) {

        sidebarAvatar.textContent =
            name
                .charAt(0)
                .toUpperCase() ||
            "?";

    }


    if (sidebarName) {

        sidebarName.textContent =
            name;

    }


    if (sidebarUsername) {

        sidebarUsername.textContent =
            username
                ? "@" + username
                : "@username";

    }

}

/* =====================================================
   SAVE PROFILE
===================================================== */

async function saveProfile() {

    if (!currentUser) {
        return;
    }


    let name =
        profileNameInput
            ? profileNameInput.value.trim()
            : "";

    let username =
        profileUsernameInput
            ? profileUsernameInput.value.trim()
            : "";


    username =
        username.replace(
            /^@/,
            ""
        );


    if (!name) {

        name =
            "Пользователь";

    }


    if (
        username &&
        !/^[a-zA-Z0-9_]+$/.test(
            username
        )
    ) {

        showToast(
            getText().usernameInvalid ||
            "Username содержит недопустимые символы"
        );

        return;

    }


    if (
        username &&
        username.length < 3
    ) {

        showToast(
            getText().usernameTooShort ||
            "Username слишком короткий"
        );

        return;

    }


    try {

        /* =====================================================
           SPECIAL USERNAME — TheBSgormOFF
        ===================================================== */

        if (
            username.toLowerCase() ===
            "thebsgormoff"
        ) {

            const usersRef =
                ref(
                    db,
                    "users"
                );


            const usersSnapshot =
                await get(
                    usersRef
                );


            if (
                usersSnapshot.exists()
            ) {

                const users =
                    usersSnapshot.val();


                const usernameTaken =
                    Object.entries(
                        users
                    ).some(
                        ([uid, user]) => {

                            /*
                             * Сам пользователь
                             * может сохранять этот username.
                             */

                            if (
                                uid ===
                                currentUser.uid
                            ) {

                                return false;

                            }


                            const existingUsername =
                                (
                                    user?.profile?.username ||
                                    ""
                                )
                                    .replace(
                                        /^@/,
                                        ""
                                    )
                                    .toLowerCase();


                            return (
                                existingUsername ===
                                "thebsgormoff"
                            );

                        }
                    );


                if (
                    usernameTaken
                ) {

                    showToast(
                        "error"
                    );

                    return;

                }

            }

        }


        /* =====================================================
           SAVE PROFILE
        ===================================================== */

        const profileRef =
            ref(
                db,
                `users/${currentUser.uid}/profile`
            );


        await set(
            profileRef,
            {

                name:
                    name,

                username:
                    username

            }
        );
        


        currentProfile = {

            name:
                name,

            username:
                username

        };


        updateProfileUI();


        showToast(
            getText().profileSaved ||
            "Профиль сохранён"
        );


    } catch (error) {

        console.error(
            "Ошибка сохранения профиля:",
            error
        );


        showToast(
            "Не удалось сохранить профиль"
        );

    }

}


/* =====================================================
   EMPTY FAVORITES
===================================================== */

/* =====================================================
   PRIVATE CHATS
===================================================== */

let currentPrivateUser = null;


/* =========================
   CHAT ID
========================= */

function makePrivateChatId(uid1, uid2) {

    return [uid1, uid2]
        .sort()
        .join("_");

}







/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}




/* =========================
   PRIVATE HEADER
========================= */

function updatePrivateHeader() {

    if (
        !currentPrivateUser
    ) {
        return;
    }

    if (chatTitle) {

        chatTitle.textContent =
            "@" +
            (
                currentPrivateUser.username ||
                "username"
            )
            .replace(/^@/, "");

    }

    if (chatSubtitle) {

        chatSubtitle.textContent =
            "";

    }

    if (chatHeaderAvatar) {

        chatHeaderAvatar.textContent =
            (
                currentPrivateUser.name ||
                currentPrivateUser.username ||
                "?"
            )
            .charAt(0)
            .toUpperCase();

    }

}


/* =========================
   LOAD PRIVATE MESSAGES
========================= */

function loadPrivateMessages() {

    if (!currentUser || !currentPrivateUser) {
        return;
    }

    if (messagesListener) {

        messagesListener();

        messagesListener =
            null;

    }

    const messagesRef =
        ref(
            db,
            `chats/${currentChatId}/messages`
        );

    messagesListener =
        onValue(
            messagesRef,
            snapshot => {

                if (!messages) {
                    return;
                }

                messages.innerHTML =
                    "";

                if (!snapshot.exists()) {
                    return;
                }

                const data =
                    snapshot.val();

                const list =
                    Object.entries(
                        data
                    )
                    .map(
                        ([id, message]) => ({

                            id,

                            ...message

                        })
                    );

                list.sort(
                    (a, b) =>
                        (
                            a.createdAt ||
                            0
                        ) -
                        (
                            b.createdAt ||
                            0
                        )
                );

                list.forEach(
                    message => {

                        renderMessage(
                            message
                        );

                    }
                );

                scrollMessagesToBottom();

            }
        );

}


/* =========================
   SAVE CHAT TO SIDEBAR
========================= */

async function savePrivateChatToList(user) {

    if (!currentUser || !user) {
        return;
    }

    const chatId =
        makePrivateChatId(
            currentUser.uid,
            user.uid
        );

    try {

        await update(
            ref(
                db,
                `users/${currentUser.uid}/chats/${chatId}`
            ),
            {

                uid:
                    user.uid,

                username:
                    user.username,

                name:
                    user.name,

                updatedAt:
                    Date.now()

            }
        );

        renderPrivateChatItem(
            chatId,
            user
        );

    } catch (error) {

        console.error(
            "Ошибка сохранения чата:",
            error
        );

    }

}


/* =========================
   SIDEBAR CHAT
========================= */

function renderPrivateChatItem(
    chatId,
    user
) {

    const list =
        document.getElementById(
            "chatList"
        );

    if (!list) {
        return;
    }

    let item =
        document.querySelector(
            `[data-private-chat="${chatId}"]`
        );

    if (!item) {

        item =
            document.createElement(
                "div"
            );

        item.className =
            "chat-item";

        item.dataset.privateChat =
            chatId;

        list.appendChild(
            item
        );

    }

    item.innerHTML = `

        <div class="chat-avatar">
            ${
                escapeHTML(
                    (
                        user.name ||
                        user.username ||
                        "?"
                    )
                    .charAt(0)
                    .toUpperCase()
                )
            }
        </div>

        <div class="chat-item-info">

            <div class="chat-item-top">

                <span class="chat-name">
                    @${escapeHTML(
                        user.username
                            .replace(/^@/, "")
                    )}
                </span>

            </div>

        </div>

    `;

    item.onclick =
        () => {

            currentPrivateUser =
                user;

            currentChatId =
                chatId;

            document
                .querySelectorAll(
                    ".chat-item"
                )
                .forEach(
                    chat => {

                        chat.classList.remove(
                            "active"
                        );

                    }
                );

            item.classList.add(
                "active"
            );

            updatePrivateHeader();

            loadPrivateMessages();

            updateMessageInput();

            closeMobileSidebar();

        };

}

function showEmptyFavorites() {

    if (!messages) {
        return;
    }


    const t =
        getText();


    messages.innerHTML = `

        <div
            class="empty-favorites"
            id="emptyFavorites"
        >

            <div class="empty-favorites-icon">
                ★
            </div>

            <h2>
                ${t.favorites || "Избранное"}
            </h2>

            <p>
                ${
                    t.savedMessagesDescription ||
                    "Здесь будут храниться твои личные сохранённые сообщения."
                }
            </p>

            <p class="empty-hint">
                ${
                    t.startMessage ||
                    "Напиши сообщение ниже, чтобы начать."
                }
            </p>

        </div>

    `;

}


/* =====================================================
   TEXTAREA
===================================================== */

function autoResizeTextarea() {

    if (!messageInput) {
        return;
    }


    messageInput.style.height =
        "auto";


    messageInput.style.height =
        Math.min(
            messageInput.scrollHeight,
            140
        ) + "px";

}


/* =====================================================
   SCROLL
===================================================== */

function scrollMessagesToBottom() {

    if (!messages) {
        return;
    }


    messages.scrollTop =
        messages.scrollHeight;

}


/* =====================================================
   MESSAGE RENDER
===================================================== */
function renderMessage(message) {

    if (!messages) {
        return;
    }

    const row = document.createElement("div");
    row.className = "message-row";
    row.dataset.messageId = message.id || "";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    const text = document.createElement("div");
    text.className = "message-text";
    text.textContent = message.text || "";

    const meta = document.createElement("div");
    meta.className = "message-meta";

    if (message.editedAt) {
        console.log(
    "🔥 EDITED:",
    message.editedAt,
    "LANG:",
    getText().edited
);
        const edited = document.createElement("span");

        edited.className = "message-edited";
        edited.textContent =
            getText().edited ||
            "Изменео";

        meta.appendChild(edited);

        meta.appendChild(
            document.createTextNode(" ")
        );
    }

    meta.appendChild(
        document.createTextNode(
            formatTime(message.createdAt)
        )
    );

    bubble.appendChild(text);
    bubble.appendChild(meta);

    row.appendChild(bubble);
    messages.appendChild(row);

    setupMessageActions(
        row,
        bubble,
        message
    );
}
/* =====================================================
   MESSAGE ACTIONS
===================================================== */

let messageActionMenu = null;
let longPressTimer = null;


/* -----------------------------------------------------
   GET MESSAGE PATH
----------------------------------------------------- */

function getMessagePath(messageId) {

    if (!currentUser || !messageId) {
        return null;
    }

    if (
        currentChatId ===
        SYSTEM_CHAT_ID
    ) {
        return `systemMessages/${messageId}`;
    }

    return (
        `favorites/${currentUser.uid}/messages/${messageId}`
    );
}


/* -----------------------------------------------------
   CLOSE MENU
----------------------------------------------------- */

function closeMessageActionMenu() {

    if (messageActionMenu) {

        messageActionMenu.remove();

        messageActionMenu = null;

    }

}


/* -----------------------------------------------------
   SHOW MENU
----------------------------------------------------- */

function showMessageActionMenu(
    x,
    y,
    message
) {

    closeMessageActionMenu();

    if (!currentUser) {
        return;
    }

    /* Только своё сообщение */

    if (
        message.uid !==
        currentUser.uid
    ) {
        return;
    }

    const menu =
        document.createElement("div");

    menu.className =
        "message-action-menu";

    const editButton =
        document.createElement("button");

    editButton.type = "button";

    editButton.textContent =
        getText().editMessage ||
        "Изменить ✏️";


    const deleteButton =
        document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className =
        "danger";

    deleteButton.textContent =
        getText().deleteMessage ||
        "Удалить 🗑️";


    editButton.onclick =
        async () => {

            closeMessageActionMenu();

            await editMessage(
                message
            );

        };


    deleteButton.onclick =
        async () => {

            closeMessageActionMenu();

            await deleteMessage(
                message
            );

        };


    menu.appendChild(
        editButton
    );

    menu.appendChild(
        deleteButton
    );

    document.body.appendChild(
        menu
    );

    messageActionMenu =
        menu;


    const menuWidth =
        menu.offsetWidth;

    const menuHeight =
        menu.offsetHeight;


    const maxX =
        window.innerWidth -
        menuWidth -
        8;

    const maxY =
        window.innerHeight -
        menuHeight -
        8;


    menu.style.left =
        Math.max(
            8,
            Math.min(x, maxX)
        ) + "px";


    menu.style.top =
        Math.max(
            8,
            Math.min(y, maxY)
        ) + "px";


    setTimeout(
        () => {

            document.addEventListener(
                "click",
                closeMessageActionMenu,
                {
                    once: true
                }
            );

        },
        0
    );

}


/* -----------------------------------------------------
   MESSAGE EVENTS
----------------------------------------------------- */

function setupMessageActions(
    row,
    bubble,
    message
) {

    if (
        !message.id ||
        !currentUser ||
        message.uid !== currentUser.uid
    ) {
        return;
    }


    /* ПК — правая кнопка */

    bubble.addEventListener(
        "contextmenu",
        event => {

            event.preventDefault();

            showMessageActionMenu(
                event.clientX,
                event.clientY,
                message
            );

        }
    );


    /* Мобильный — удержание */

    bubble.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.touches[0];

            longPressTimer =
                setTimeout(
                    () => {

                        showMessageActionMenu(
                            touch.clientX,
                            touch.clientY,
                            message
                        );

                    },
                    550
                );

        },
        {
            passive: true
        }
    );


    function cancelLongPress() {

        clearTimeout(
            longPressTimer
        );

        longPressTimer = null;

    }


    bubble.addEventListener(
        "touchend",
        cancelLongPress
    );

    bubble.addEventListener(
        "touchmove",
        cancelLongPress
    );

    bubble.addEventListener(
        "touchcancel",
        cancelLongPress
    );

}


/* =====================================================
   EDIT MESSAGE
===================================================== */

async function editMessage(message) {
    console.log("🔥 EDIT FUNCTION ЗАПУЩЕНА");

    if (!currentUser) {
        return;
    }

    if (
        message.uid !==
        currentUser.uid
    ) {
        return;
    }


    const oldText =
        message.text || "";


    const newText =
    prompt(
        getText().editMessagePrompt ||
        "Изменить сообщение:",
        message.text || ""
    );


    if (
        newText === null
    ) {
        return;
    }


    const cleanText =
        newText.trim();


    if (!cleanText) {

        showToast(
            getText().emptyMessage ||
            "Сообщение не может быть пустым"
        );

        return;

    }


    if (
        cleanText ===
        oldText
    ) {
        return;
    }


    const path =
        getMessagePath(
            message.id
        );


    if (!path) {
        return;
    }


    try {

        await update(
            ref(
                db,
                path
            ),
            {
                text:
                    cleanText,

                editedAt:
                    Date.now()
            }
        );
        console.log(
    "✅ СООБЩЕНИЕ СОХРАНЕНО, editedAt:",
    Date.now()
);


    } catch (error) {

        console.error(
            "Ошибка изменения сообщения:",
            error
        );

        showToast(
            getText().editError ||
            "Не удалось изменить сообщение"
        );

    }

}


/* =====================================================
   DELETE MESSAGE
===================================================== */

async function deleteMessage(message) {

    if (!currentUser) {
        return;
    }

    if (
        message.uid !==
        currentUser.uid
    ) {
        return;
    }


    const confirmed =
        confirm(
            getText().deleteMessageConfirm ||
            "Удалить это сообщение?"
        );


    if (!confirmed) {
        return;
    }


    const path =
        getMessagePath(
            message.id
        );


    if (!path) {
        return;
    }


    try {

        await set(
            ref(
                db,
                path
            ),
            null
        );


    } catch (error) {

        console.error(
            "Ошибка удаления сообщения:",
            error
        );

        showToast(
            getText().deleteError ||
            "Не удалось удалить сообщение"
        );

    }

}


/* =====================================================
   CLOSE MENU ON SCROLL
===================================================== */

if (messages) {

    messages.addEventListener(
        "scroll",
        closeMessageActionMenu
    );

}
/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(timestamp) {

    if (!timestamp) {
        return "";
    }


    const date =
        new Date(
            timestamp
        );


    return date.toLocaleTimeString(
        "ru-RU",
        {

            hour:
                "2-digit",

            minute:
                "2-digit"

        }
    );

}
/* =====================================================
   OPEN FAVORITES
===================================================== */

function openFavorites() {

    if (!currentUser) {
        return;
    }


    currentChatId =
        "favorites";


    document
        .querySelectorAll(".chat-item")
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


    if (favoritesChat) {

        favoritesChat.classList.add(
            "active"
        );

    }


    updateFavoritesHeader();

    loadFavorites();

    updateMessageInput();

    closeMobileSidebar();

}


/* =====================================================
   FAVORITES HEADER
===================================================== */

function updateFavoritesHeader() {

    const t =
        getText();


    if (chatTitle) {

        chatTitle.textContent =
            t.favorites ||
            "Избранное";

    }


    if (chatSubtitle) {

        chatSubtitle.textContent =
            t.savedMessages ||
            t.savedMessagesDescription ||
            "Личные сохранённые сообщения";

    }


    if (chatHeaderAvatar) {

        chatHeaderAvatar.textContent =
            "★";

    }

}


/* =====================================================
   LOAD FAVORITES
===================================================== */

function loadFavorites() {

    if (!currentUser) {
        return;
    }


    if (messagesListener) {

        messagesListener();

        messagesListener =
            null;

    }


    const favoritesRef =
        ref(
            db,
            `favorites/${currentUser.uid}/messages`
        );


    messagesListener =
        onValue(
            favoritesRef,
            snapshot => {

                if (!messages) {
                    return;
                }


                messages.innerHTML =
                    "";


                if (!snapshot.exists()) {

                    showEmptyFavorites();

                    return;

                }


                const data =
                    snapshot.val();


                const list =
                    Object.entries(
                        data
                    )
                    .map(
                        ([id, message]) => ({

                            id,

                            ...message

                        })
                    );


                list.sort(
                    (a, b) =>
                        (
                            a.createdAt ||
                            0
                        ) -
                        (
                            b.createdAt ||
                            0
                        )
                );


                list.forEach(
                    message => {

                        renderMessage(
                            message
                        );

                    }
                );


                scrollMessagesToBottom();

            }
        );

}


/* =====================================================
   UPDATE MESSAGE INPUT
===================================================== */

function updateMessageInput() {

    if (!messageInput) {
        return;
    }


    if (
        currentChatId ===
        SYSTEM_CHAT_ID
    ) {

        if (
            typeof canWriteToSystem ===
            "function" &&
            !canWriteToSystem()
        ) {

            messageInput.disabled =
                true;

            messageInput.placeholder =
                getText().systemChatReadOnly ||
                "Только чтение";

            return;

        }

    }


    messageInput.disabled =
        false;


    messageInput.placeholder =
        getText().writeMessage ||
        "Написать сообщение...";

}


/* =====================================================
   OPEN SYSTEM CHAT
===================================================== */

function openSystemChat() {

    if (!currentUser) {
        return;
    }


    currentChatId =
        SYSTEM_CHAT_ID;


    document
        .querySelectorAll(".chat-item")
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


    if (systemChat) {

        systemChat.classList.add(
            "active"
        );

    }


    updateSystemHeader();

    loadSystemMessages();

    updateMessageInput();

    closeMobileSidebar();

}


/* =====================================================
   SYSTEM HEADER
===================================================== */

function updateSystemHeader() {

    const t =
        getText();


    if (chatTitle) {

        chatTitle.textContent =
            t.systemChat ||
            "Flow System";

    }


    if (chatSubtitle) {

        chatSubtitle.textContent =
            t.systemChatDescription ||
            "Официальные новости FlowChat";

    }


    if (chatHeaderAvatar) {

        chatHeaderAvatar.textContent =
            "📢";

    }

}


/* =====================================================
   LOAD SYSTEM MESSAGES
===================================================== */

function loadSystemMessages() {

    if (messagesListener) {

        messagesListener();

        messagesListener =
            null;

    }


    const systemRef =
        ref(
            db,
            "systemMessages"
        );


    messagesListener =
        onValue(
            systemRef,
            snapshot => {

                if (!messages) {
                    return;
                }


                messages.innerHTML =
                    "";


                if (!snapshot.exists()) {

                    const t =
                        getText();


                    messages.innerHTML = `

                        <div class="empty-favorites">

                            <div class="empty-favorites-icon">
                                📢
                            </div>

                            <h2>
                                ${
                                    t.systemChat ||
                                    "Flow System"
                                }
                            </h2>

                            <p>
                                ${
                                    t.systemChatDescription ||
                                    "Официальные новости FlowChat"
                                }
                            </p>

                        </div>

                    `;

                    return;

                }


                const data =
                    snapshot.val();


                const list =
                    Object.entries(
                        data
                    )
                    .map(
                        ([id, message]) => ({

                            id,

                            ...message

                        })
                    );


                list.sort(
                    (a, b) =>
                        (
                            a.createdAt ||
                            0
                        ) -
                        (
                            b.createdAt ||
                            0
                        )
                );


                list.forEach(
                    message => {

                        renderMessage(
                            message
                        );

                    }
                );


                scrollMessagesToBottom();

            }
        );

}


/* =====================================================
   CAN WRITE TO SYSTEM
===================================================== */

function canWriteToSystem() {

    if (!currentUser) {
        return false;
    }


    /*
       Только официальный аккаунт
       может писать в Flow System.
    */

    const username =
        (
            currentProfile.username ||
            ""
        )
        .replace(
            /^@/,
            ""
        )
        .toLowerCase();


    return (
        username ===
        "thebsgormoff"
    );

}

/* =====================================================
   PRIVATE CHAT CRYPTO KEY
===================================================== */

async function getPrivateChatCryptoKey(chatId, targetUid) {

    if (!currentUser) {
        throw new Error(
            "Пользователь не авторизован"
        );
    }

    if (!chatId || !targetUid) {
        throw new Error(
            "Не указан приватный чат"
        );
    }


    /* Получаем свой приватный ECDH-ключ */

    const privateKeyJwk =
        window.FlowChatCrypto.loadPrivateKey();


    if (!privateKeyJwk) {

        throw new Error(
            "Приватный ключ пользователя отсутствует"
        );

    }


    const privateKey =
        await window.FlowChatCrypto.importUserPrivateKey(
            privateKeyJwk
        );


    /* Получаем PUBLIC KEY второго пользователя */

    const publicKeyRef =
        ref(
            db,
            `users/${targetUid}/crypto/publicKey`
        );


    const snapshot =
        await get(
            publicKeyRef
        );


    if (!snapshot.exists()) {

        throw new Error(
            "У пользователя ещё нет ключа шифрования"
        );

    }


    const publicKeyData =
        snapshot.val();


    const otherPublicKey =
        await window.FlowChatCrypto.importUserPublicKey(
            publicKeyData.key
        );


    /* Создаём общий AES-256 ключ */

    const sharedKey =
        await window.FlowChatCrypto.createSharedChatKey(
            privateKey,
            otherPublicKey
        );


    return sharedKey;

}

/* =====================================================
   SEND MESSAGE
===================================================== */

async function sendMessage() {

    if (!currentUser) {
        return;
    }


    /* =================================================
       SYSTEM CHAT
    ================================================= */

    if (
        currentChatId ===
        SYSTEM_CHAT_ID
    ) {

        if (!canWriteToSystem()) {

            showToast(
                getText().systemWriteDenied ||
                "В этом канале запрещено писать"
            );

            return;

        }

    }


    /* =================================================
       TEXT
    ================================================= */

    const text =
        messageInput
            ? messageInput.value.trim()
            : "";


    if (!text) {
        return;
    }


    if (sendButton) {

        sendButton.disabled =
            true;

    }


    try {

        let messagesRef;
        let encryptedMessage = null;
        

        let messageData = {

            createdAt:
                Date.now(),

            uid:
                currentUser.uid,

            username:
                currentProfile.username ||
                "",

            name:
                currentProfile.name ||
                ""

        };


        /* =================================================
           SYSTEM
        ================================================= */

        if (
            currentChatId ===
            SYSTEM_CHAT_ID
        ) {

            messagesRef =
                ref(
                    db,
                    "systemMessages"
                );


            /*
             * System пока НЕ шифруем,
             * чтобы существующая система
             * не сломалась.
             */

            messageData.text =
                text;

        }


        /* =================================================
           FAVORITES
        ================================================= */

        else if (
            currentChatId ===
            "favorites"
        ) {

            messagesRef =
                ref(
                    db,
                    `favorites/${currentUser.uid}/messages`
                );


            /*
             * Избранное пока тоже
             * оставляем обычным.
             */

            messageData.text =
                text;

        }


        /* =================================================
           PRIVATE CHAT
        ================================================= */

        else {

            messagesRef =
                ref(
                    db,
                    `chats/${currentChatId}/messages`
                );
                /* =====================================================
   ENCRYPT PRIVATE MESSAGE
===================================================== */

let encryptedMessage = null;

if (
    currentChatId !== SYSTEM_CHAT_ID &&
    currentChatId !== "favorites"
) {

    if (!currentPrivateChatUserId) {

        throw new Error(
            "Не найден пользователь приватного чата"
        );

    }


    const chatKey =
        await getPrivateChatCryptoKey(
            currentChatId,
            currentPrivateChatUserId
        );


    encryptedMessage =
        await window.FlowChatCrypto.encryptText(
            text,
            chatKey
        );

}


            /* =============================================
               ПОЛУЧАЕМ КЛЮЧ ЧАТА
            ============================================= */

            let chatKey =
                await FlowChatCrypto.getChatKey(
                    currentChatId
                );


            /* =============================================
               ЕСЛИ КЛЮЧА НЕТ — СОЗДАЁМ
            ============================================= */

            if (!chatKey) {

                const generated =
                    await FlowChatCrypto.createRandomChatKey();


                chatKey =
                    generated.key;


                FlowChatCrypto.saveChatKey(
                    currentChatId,
                    generated.keyString
                );


                console.log(
                    "🔐 Создан новый ключ для чата:",
                    currentChatId
                );

            }


            /* =============================================
               ШИФРУЕМ СООБЩЕНИЕ
            ============================================= */

            const encrypted =
                await FlowChatCrypto.encryptText(
                    text,
                    chatKey
                );


            /*
             * В Firebase теперь НЕ будет
             *
             * text: "Привет"
             *
             * Вместо этого:
             *
             * encrypted: "...."
             * iv: "...."
             */

            messageData.encrypted =
                encrypted.encrypted;

            messageData.iv =
                encrypted.iv;

            messageData.cryptoVersion =
                encrypted.version;

            messageData.cryptoAlgorithm =
                encrypted.algorithm;

        }


        /* =================================================
           CREATE MESSAGE
        ================================================= */

        const newMessage =
            push(
                messagesRef
            );


        await set(
    newMessage,
    {

        ...(encryptedMessage
            ? {
                encrypted:
                    encryptedMessage.encrypted,

                iv:
                    encryptedMessage.iv,

                cryptoVersion:
                    encryptedMessage.version,

                cryptoAlgorithm:
                    encryptedMessage.algorithm
            }
            : {
                text:
                    text
            }
        ),

        createdAt:
            Date.now(),

        uid:
            currentUser.uid,

        username:
            currentProfile.username ||
            "",
            receiverUid:
            currentPrivateChatUserId,

        name:
            currentProfile.name ||
            ""

    }
);
/* =================================================
   PUSH NOTIFICATION
================================================= */

if (
    currentChatId !== SYSTEM_CHAT_ID &&
    currentChatId !== "favorites" &&
    currentPrivateChatUserId
) {

    try {

        const receiverTokenRef =
            ref(
                db,
                `users/${currentPrivateChatUserId}/fcmToken`
            );

        const receiverTokenSnapshot =
            await get(
                receiverTokenRef
            );

        if (
            receiverTokenSnapshot.exists()
        ) {

            const receiverToken =
                receiverTokenSnapshot.val();

            await sendPush(
    receiverToken,
    currentProfile.name || "Новое сообщение",
    text,
    currentChatId
);

            console.log(
                "🔔 PUSH отправлен получателю"
            );

        } else {

            console.log(
                "ℹ️ У получателя нет FCM token"
            );

        }

    } catch (pushError) {

        /*
         * Ошибка Push НЕ должна
         * отменять отправку сообщения.
         */

        console.error(
            "❌ PUSH ERROR:",
            pushError
        );

    }

}


        /* =================================================
           CLEAR INPUT
        ================================================= */

        if (messageInput) {

            messageInput.value =
                "";

            autoResizeTextarea();

        }


        console.log(
            "✅ Сообщение отправлено"
        );


    } catch (error) {

        console.error(
            "❌ Ошибка отправки:",
            error
        );


        showToast(
            error.message ||
            "Не удалось отправить сообщение"
        );


    } finally {

        if (sendButton) {

            sendButton.disabled =
                false;

        }


        if (
            messageInput &&
            !messageInput.disabled
        ) {

            messageInput.focus();

        }

    }

}


/* =====================================================
   PROFILE OPEN
===================================================== */

function openProfile() {

    if (!profileOverlay) {
        return;
    }


    profileOverlay.classList.add(
        "active"
    );


    if (profilePanel) {

        profilePanel.classList.add(
            "active"
        );

    }


    updateProfileUI();
    updateSidebarProfile();

}


/* =====================================================
   PROFILE CLOSE
===================================================== */

function closeProfile() {

    if (!profileOverlay) {
        return;
    }


    profileOverlay.classList.remove(
        "active"
    );


    if (profilePanel) {

        profilePanel.classList.remove(
            "active"
        );

    }

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

function openMobileSidebar() {

    if (
        !sidebar ||
        !sidebarBackdrop
    ) {

        return;

    }


    sidebar.classList.add(
        "mobile-open"
    );


    sidebarBackdrop.classList.add(
        "active"
    );

}


function closeMobileSidebar() {

    if (
        !sidebar ||
        !sidebarBackdrop
    ) {

        return;

    }


    sidebar.classList.remove(
        "mobile-open"
    );


    sidebarBackdrop.classList.remove(
        "active"
    );

}


/* =====================================================
   INFO MODAL
===================================================== */

function openInfo() {

    if (!infoModal) {
        return;
    }


    const t =
        getText();


    if (
        currentChatId ===
        SYSTEM_CHAT_ID
    ) {

        if (infoModalTitle) {

            infoModalTitle.textContent =
                t.systemChat ||
                "Flow System";

        }


        if (infoModalText) {

            infoModalText.textContent =
                t.systemChatInfo ||
                t.systemChatDescription ||
                "Официальный канал FlowChat.";

        }

    } else {

        if (infoModalTitle) {

            infoModalTitle.textContent =
                t.favorites ||
                "Избранное";

        }


        if (infoModalText) {

            infoModalText.textContent =
                t.savedMessagesDescription ||
                "Здесь находятся твои личные сохранённые сообщения.";

        }

    }


    infoModal.classList.add(
        "active"
    );

}


/* =====================================================
   CLOSE INFO
===================================================== */

function closeInfo() {

    if (!infoModal) {
        return;
    }


    infoModal.classList.remove(
        "active"
    );

}


/* =====================================================
   LOGOUT
===================================================== */

async function logout() {

    try {

        await signOut(
            auth
        );


        window.location.href =
            "index.html";


    } catch (error) {

        console.error(
            "Ошибка выхода:",
            error
        );


        showToast(
            "Не удалось выйти"
        );

    }

}
/* =====================================================
   CHAT INFO BUTTON
===================================================== */

if (chatInfoBtn) {

    chatInfoBtn.addEventListener(
        "click",
        openInfo
    );

}


/* =====================================================
   INFO CLOSE
===================================================== */

if (infoModalClose) {

    infoModalClose.addEventListener(
        "click",
        closeInfo
    );

}


if (infoModal) {

    infoModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                infoModal
            ) {

                closeInfo();

            }

        }
    );

}


/* =====================================================
   FAVORITES BUTTON
===================================================== */

if (favoritesChat) {

    favoritesChat.addEventListener(
        "click",
        openFavorites
    );

}


/* =====================================================
   FLOW SYSTEM BUTTON
===================================================== */

if (systemChat) {

    systemChat.addEventListener(
        "click",
        openSystemChat
    );

}


/* =====================================================
   MESSAGE FORM
===================================================== */

if (messageForm) {

    messageForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            sendMessage();

        }
    );

}


/* =====================================================
   TEXTAREA
===================================================== */

if (messageInput) {

    messageInput.addEventListener(
        "input",
        autoResizeTextarea
    );


    messageInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


/* =====================================================
   FILE ATTACHMENT
===================================================== */

if (attachButton) {

    attachButton.addEventListener(
        "click",
        () => {

            if (fileInput) {

                fileInput.click();

            }

        }
    );

}


if (fileInput) {

    fileInput.addEventListener(
        "change",
        () => {

            const file =
                fileInput.files?.[0];


            if (!file) {
                return;
            }


            showToast(
                `Выбран файл: ${file.name}`
            );

        }
    );

}


/* =====================================================
   PROFILE
===================================================== */

if (profileClose) {

    profileClose.addEventListener(
        "click",
        closeProfile
    );

}


if (profileOverlay) {

    profileOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                profileOverlay
            ) {

                closeProfile();

            }

        }
    );

}


if (saveProfileBtn) {

    saveProfileBtn.addEventListener(
        "click",
        saveProfile
    );

}


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logout
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

if (mobileMenuBtn) {

    mobileMenuBtn.addEventListener(
        "click",
        openMobileSidebar
    );

}


if (sidebarBackdrop) {

    sidebarBackdrop.addEventListener(
        "click",
        closeMobileSidebar
    );

}





/* =====================================================
   SETTINGS
===================================================== */

if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        () => {

            if (
                typeof openSettings ===
                "function"
            ) {

                openSettings();

            }

        }
    );

}


/* =====================================================
   LANGUAGE UPDATE
===================================================== */

window.addEventListener(
    "flowchatLanguageChanged",
    () => {

        updateCurrentChatLanguage();

        if (
            currentChatId ===
            "favorites"
        ) {

            updateFavoritesHeader();

        }


        if (
            currentChatId ===
            SYSTEM_CHAT_ID
        ) {

            updateSystemHeader();

        }


        updateMessageInput();

    }
);

/* =====================================================
   AUTH STATE
===================================================== */

onAuthStateChanged(
    auth,
    async user => {

        if (!user) {

            console.log(
                "FlowChat: пользователь не авторизован"
            );

            window.location.href =
                "index.html";

            return;
        }


        currentUser =
    user;


console.log(
    "FlowChat: пользователь:",
    user.uid
);


/* =========================================
   PROFILE
========================================= */

await loadProfile(
    user
);


/* =========================================
   CRYPTO
========================================= */

await initializeUserCrypto(
    user
);


/* =========================================
   PUSH
========================================= */

setupPushNotifications();


/* =========================================
   PRIVATE CHATS
========================================= */

/* Загружаем сохранённые приватные чаты */

await loadPrivateChats();


/* =========================================
   OPEN CHAT FROM PUSH
========================================= */

const pushChatId =
    sessionStorage.getItem(
        "flowchat_push_chat"
    );


if (pushChatId) {

    sessionStorage.removeItem(
        "flowchat_push_chat"
    );


    setTimeout(
        () => {

            openChatFromPush(
                pushChatId
            );

        },
        500
    );


} else {

    /* =====================================
       DEFAULT CHAT
    ===================================== */

    openFavorites();

}


        await initializeUserCrypto(
            user
        );


        /* Загружаем сохранённые приватные чаты */

        await loadPrivateChats();


        /* По умолчанию открываем Избранное */

        openFavorites();

    }
);


/* =====================================================
   CRYPTO INITIALIZATION
===================================================== */

async function initializeUserCrypto(
    user
) {

    if (!user) {
        return;
    }


    try {

        let privateKeyJwk =
            FlowChatCrypto.loadPrivateKey();


        let publicKeyJwk =
            FlowChatCrypto.loadPublicKey();


        /* Если ключей ещё нет */

        if (
            !privateKeyJwk ||
            !publicKeyJwk
        ) {

            console.log(
                "🔐 Создаём ECDH ключи пользователя..."
            );


            const keyPair =
                await FlowChatCrypto.generateUserKeyPair();


            privateKeyJwk =
                await FlowChatCrypto.exportUserPrivateKey(
                    keyPair.privateKey
                );


            publicKeyJwk =
                await FlowChatCrypto.exportUserPublicKey(
                    keyPair.publicKey
                );


            /*
             * Приватный ключ остаётся
             * только на этом устройстве.
             */

            FlowChatCrypto.savePrivateKey(
                privateKeyJwk
            );


            FlowChatCrypto.savePublicKey(
                publicKeyJwk
            );

        }


        /* Сохраняем PUBLIC KEY в Firebase */

        await set(
            ref(
                db,
                `users/${user.uid}/crypto/publicKey`
            ),
            {

                version:
                    1,

                algorithm:
                    "ECDH-P256",

                key:
                    publicKeyJwk

            }
        );


        console.log(
            "🔐 Crypto пользователя готов"
        );


    } catch (error) {

        console.error(
            "❌ Ошибка инициализации crypto:",
            error
        );

    }

}


/* =====================================================
   GLOBAL USER ACCESS
===================================================== */

window.flowChat = {

    getCurrentUser() {

        return currentUser;

    },


    getCurrentProfile() {

        return {
            ...currentProfile
        };

    },


    getCurrentChat() {

        return currentChatId;

    },


    openFavorites,

    openSystemChat,

    openProfile,

    closeProfile,

    openInfo,

    closeInfo,

    showToast

};


/* =====================================================
   GLOBAL USER ACCESS
===================================================== */

window.flowChat = {

    getCurrentUser() {

        return currentUser;

    },


    getCurrentProfile() {

        return {
            ...currentProfile
        };

    },


    getCurrentChat() {

        return currentChatId;

    },


    openFavorites,

    openSystemChat,

    openProfile,

    closeProfile,

    openInfo,

    closeInfo,

    showToast

};


/* =====================================================
   INITIAL TEXTAREA SIZE
===================================================== */

autoResizeTextarea();

/* =====================================================
   START
===================================================== */

/* =====================================================
   PRIVATE CHAT — USER SEARCH
===================================================== */



/* =====================================================
   CREATE PRIVATE CHAT ID
===================================================== */




/* =====================================================
   SEARCH USERS
===================================================== */





/* =====================================================
   SEARCH INPUT
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            clearTimeout(
                searchTimeout
            );


            searchTimeout =
                setTimeout(
                    () => {

                        searchUsers(
                            searchInput.value
                        );

                    },
                    250
                );

        }
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */


/* =====================================================
   OPEN PRIVATE CHAT
===================================================== */

/* =====================================================
   OPEN PRIVATE CHAT
===================================================== */

async function openPrivateChat(
    targetUid,
    targetUsername,
    targetName
) {

    if (!currentUser) {
        return;
    }
    currentPrivateChatUserId = targetUid;

console.log(
    "🔐 Приватный собеседник:",
    currentPrivateChatUserId
);
    currentPrivateChatUserId =
    targetUid;

    const chatId =
        createPrivateChatId(
            currentUser.uid,
            targetUid
        );

    currentChatId =
        chatId;

    /* =================================================
       СОХРАНЯЕМ ЧАТ ОБОИМ ПОЛЬЗОВАТЕЛЯМ
    ================================================= */

    try {

        const myChatRef =
            ref(
                db,
                `users/${currentUser.uid}/chats/${chatId}`
            );

        const targetChatRef =
            ref(
                db,
                `users/${targetUid}/chats/${chatId}`
            );

        const chatRef =
            ref(
                db,
                `chats/${chatId}`
            );

        /* Информация о чате */

        await update(
            chatRef,
            {
                [`users/${currentUser.uid}`]: true,
                [`users/${targetUid}`]: true,

                createdAt:
                    Date.now()
            }
        );

        /* Мой список чатов */

        await set(
            myChatRef,
            {
                uid:
                    targetUid,

                username:
                    targetUsername ||
                    "username",

                name:
                    targetName ||
                    "Пользователь",

                updatedAt:
                    Date.now()
            }
        );

        /* Список чатов второго пользователя */

        await set(
            targetChatRef,
            {
                uid:
                    currentUser.uid,

                username:
                    currentProfile.username ||
                    "username",

                name:
                    currentProfile.name ||
                    "Пользователь",

                updatedAt:
                    Date.now()
            }
        );

        console.log(
            "✅ Приватный чат сохранён:",
            chatId
        );

    } catch (error) {

        console.error(
            "❌ Ошибка сохранения приватного чата:",
            error
        );

        showToast(
            "Не удалось создать чат"
        );

        return;

    }


    /* =================================================
       УБИРАЕМ ПОИСК
    ================================================= */

    removeSearchResults();

    if (searchInput) {

        searchInput.value =
            "";

    }


    /* =================================================
       ЗАГОЛОВОК ЧАТА
    ================================================= */

    if (chatTitle) {

        chatTitle.textContent =
            targetName ||
            targetUsername ||
            "Пользователь";

    }

    if (chatSubtitle) {

        chatSubtitle.textContent =
            "@" +
            (
                targetUsername ||
                "username"
            );

    }

    if (chatHeaderAvatar) {

        chatHeaderAvatar.textContent =
            (
                targetName ||
                targetUsername ||
                "?"
            )
                .charAt(0)
                .toUpperCase();

    }


    /* =================================================
       ЗАГРУЖАЕМ СООБЩЕНИЯ
    ================================================= */

    loadPrivateChatMessages(
        chatId
    );

}
/* =====================================================
   LOAD PRIVATE CHAT MESSAGES
===================================================== */

function loadPrivateChatMessages(
    chatId
) {

    if (
        messagesListener
    ) {

        messagesListener();

        messagesListener =
            null;

    }


    if (!messages) {
        return;
    }


    messages.innerHTML =
        "";


    const messagesRef =
        ref(
            db,
            `chats/${chatId}/messages`
        );


    messagesListener =
        onValue(
            messagesRef,
            snapshot => {

                messages.innerHTML =
                    "";


                if (
                    !snapshot.exists()
                ) {

                    return;

                }


                const data =
                    snapshot.val();


                Object.entries(data)
                    .sort(
                        (
                            [, a],
                            [, b]
                        ) =>
                            (
                                a.createdAt ||
                                0
                            ) -
                            (
                                b.createdAt ||
                                0
                            )
                    )
                    .forEach(
                        ([messageId, message]) => {

                            renderPrivateMessage(
                                messageId,
                                message
                            );

                        }
                    );

            }
        );

}
/* =====================================================
   LOAD SAVED PRIVATE CHATS
===================================================== */

async function loadPrivateChats() {

    if (!currentUser) {
        return;
    }

    const chatList =
        document.getElementById(
            "chatList"
        );

    if (!chatList) {
        return;
    }

    try {

        const chatsRef =
            ref(
                db,
                `users/${currentUser.uid}/chats`
            );

        const snapshot =
            await get(
                chatsRef
            );

        chatList.innerHTML =
            "";

        if (!snapshot.exists()) {
            return;
        }

        const chats =
            snapshot.val();

        Object.entries(chats)
            .sort(
                (
                    [, a],
                    [, b]
                ) =>
                    (
                        b.updatedAt ||
                        0
                    ) -
                    (
                        a.updatedAt ||
                        0
                    )
            )
            .forEach(
                (
                    [chatId, chat]
                ) => {

                    createPrivateChatItem(
                        chatId,
                        chat
                    );

                }
            );

    } catch (error) {

        console.error(
            "❌ Ошибка загрузки чатов:",
            error
        );

    }

}
/* =====================================================
   CREATE PRIVATE CHAT ITEM
===================================================== */

function createPrivateChatItem(
    chatId,
    chat
) {

    const chatList =
        document.getElementById(
            "chatList"
        );

    if (!chatList) {
        return;
    }


    const item =
        document.createElement(
            "div"
        );

    item.className =
        "chat-item";


    item.dataset.chat =
        chatId;


    /* Аватар */

    const avatar =
        document.createElement(
            "div"
        );

    avatar.className =
        "chat-avatar";


    avatar.textContent =
        (
            chat.name ||
            chat.username ||
            "?"
        )
            .charAt(0)
            .toUpperCase();


    /* Информация */

    const info =
        document.createElement(
            "div"
        );

    info.className =
        "chat-item-info";


    const top =
        document.createElement(
            "div"
        );

    top.className =
        "chat-item-top";


    const name =
        document.createElement(
            "span"
        );

    name.className =
        "chat-name";


    name.textContent =
        chat.name ||
        chat.username ||
        "Пользователь";


    top.appendChild(
        name
    );


    const preview =
        document.createElement(
            "div"
        );

    preview.className =
        "chat-preview";


    preview.textContent =
        "@" +
        (
            chat.username ||
            "username"
        );


    info.appendChild(
        top
    );

    info.appendChild(
        preview
    );


    item.appendChild(
        avatar
    );

    item.appendChild(
        info
    );


    /* Открытие чата */

    item.addEventListener(
        "click",
        () => {

            openPrivateChat(
                chat.uid,
                chat.username,
                chat.name
            );

        }
    );


    chatList.appendChild(
        item
    );

}
/* =====================================================
   RENDER PRIVATE MESSAGE
===================================================== */
/* =====================================================
   RENDER PRIVATE MESSAGE
===================================================== */
/* =====================================================
   RENDER PRIVATE MESSAGE
===================================================== */
/* =====================================================
   RENDER PRIVATE MESSAGE
===================================================== */

async function renderPrivateMessage(
    messageId,
    message
) {

    if (
        !messages ||
        !currentUser
    ) {
        return;
    }


    const mine =
        message.uid ===
        currentUser.uid;


    /* =================================================
       MESSAGE TEXT
    ================================================= */

    let messageText =
        message.text || "";


    /*
     * Новые сообщения зашифрованы.
     * Старые сообщения используют message.text.
     */

    if (
        message.encrypted &&
        message.iv
    ) {

        try {

            const chatKey =
                await FlowChatCrypto.getChatKey(
                    currentChatId
                );


            if (chatKey) {

                messageText =
                    await FlowChatCrypto.decryptText(
                        {
                            encrypted:
                                message.encrypted,

                            iv:
                                message.iv
                        },
                        chatKey
                    );

            } else {

                messageText =
                    "🔐 Не удалось получить ключ";

            }

        } catch (error) {

            console.error(
                "❌ Ошибка расшифровки сообщения:",
                error
            );


            messageText =
                "🔐 Не удалось расшифровать сообщение";

        }

    }


    /* =================================================
       WRAPPER
    ================================================= */

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        mine
            ? "message mine"
            : "message received";


    /* =================================================
       MESSAGE BUBBLE
    ================================================= */

    const bubble =
        document.createElement(
            "div"
        );


    bubble.className =
        "message-bubble";


    /* =================================================
       MESSAGE TEXT
    ================================================= */

    const text =
        document.createElement(
            "div"
        );


    text.className =
        "message-text";


    text.textContent =
        messageText;


    bubble.appendChild(
        text
    );


    /* =================================================
       TIME + EDITED
    ================================================= */

    const meta =
        document.createElement(
            "div"
        );


    meta.className =
        "message-meta";


    /* ИЗМЕЕНО */

    if (
        message.edited
    ) {

        const edited =
            document.createElement(
                "span"
            );


        edited.textContent =
    getText().edited ||
    "Изменено";


        


        meta.appendChild(
            edited
        );

    }


    /* ВРЕМЯ */

    const time =
        document.createElement(
            "span"
        );


    time.className =
        "message-time";


    const date =
        new Date(
            message.createdAt ||
            Date.now()
        );


    time.textContent =
        date.toLocaleTimeString(
            [],
            {
                hour:
                    "2-digit",

                minute:
                    "2-digit"
            }
        );


    meta.appendChild(
        time
    );


    /* Добавляем meta */

    bubble.appendChild(
        meta
    );


    /* Добавляем bubble */

    wrapper.appendChild(
        bubble
    );


    /* =================================================
       MENU ONLY FOR OWN MESSAGE
    ================================================= */

    if (mine) {

        let pressTimer =
            null;


        /* ПК */

        function openMessageMenu(
            event
        ) {

            event.preventDefault();


            openPrivateMessageMenu(
                messageId,
                message,
                wrapper
            );

        }


        wrapper.addEventListener(
            "contextmenu",
            openMessageMenu
        );


        /* =================================================
           TELEPHONE — HOLD
        ================================================= */

        wrapper.addEventListener(
            "touchstart",
            () => {

                pressTimer =
                    setTimeout(
                        () => {

                            openPrivateMessageMenu(
                                messageId,
                                message,
                                wrapper
                            );

                        },
                        550
                    );

            },
            {
                passive:
                    true
            }
        );


        wrapper.addEventListener(
            "touchend",
            () => {

                clearTimeout(
                    pressTimer
                );

            }
        );


        wrapper.addEventListener(
            "touchmove",
            () => {

                clearTimeout(
                    pressTimer
                );

            }
        );

    }


    /* =================================================
       ADD TO CHAT
    ================================================= */

    messages.appendChild(
        wrapper
    );

}
/* =====================================================
   PRIVATE MESSAGE MENU
===================================================== */


/* =====================================================
   PRIVATE MESSAGE MENU
===================================================== */

function openPrivateMessageMenu(
    messageId,
    message,
    messageElement
) {

    closePrivateMessageMenu();


    const menu =
        document.createElement("div");

    menu.id =
        "privateMessageMenu";

    menu.className =
        "private-message-menu";


    menu.innerHTML = `

    <button
        type="button"
        data-action="edit"
    >
        ✏️ ${getText().editMessage || "Изменить"}
    </button>

    <button
        type="button"
        data-action="delete"
        class="delete-message"
    >
        🗑️ ${getText().deleteMessage || "Удалить"}
    </button>

`;


    /*
     * ВАЖНО:
     * меню остаётся в body,
     * поэтому оно будет поверх сообщений
     * и не будет ломать размер пузыря.
     */

    document.body.appendChild(menu);


    /* =========================
       POSITION
    ========================= */

    const rect =
        messageElement.getBoundingClientRect();


    const menuWidth = 190;
    const menuHeight = 100;
    const gap = 8;


    /*
     * Сначала ставим меню
     * рядом с самим сообщением.
     */

    let left;
    let top;


    if (
        messageElement.classList.contains(
            "mine"
        )
    ) {

        /*
         * Моё сообщение:
         * меню слева от пузыря
         */

        left =
            rect.left -
            menuWidth -
            gap;


        /*
         * Если слева не помещается —
         * показываем поверх сообщения.
         */

        if (left < 8) {

            left =
                rect.right -
                menuWidth;

        }

    } else {

        /*
         * Чужое сообщение:
         * меню справа от пузыря
         */

        left =
            rect.right +
            gap;


        /*
         * Если справа не помещается —
         * показываем поверх сообщения.
         */

        if (
            left +
            menuWidth >
            window.innerWidth - 8
        ) {

            left =
                rect.left;

        }

    }


    /*
     * По вертикали стараемся
     * поставить меню возле центра сообщения.
     */

    top =
        rect.top +
        (
            rect.height / 2
        ) -
        (
            menuHeight / 2
        );


    /*
     * Не даём меню выйти
     * за экран.
     */

    left =
        Math.max(
            8,
            Math.min(
                left,
                window.innerWidth -
                menuWidth -
                8
            )
        );


    top =
        Math.max(
            8,
            Math.min(
                top,
                window.innerHeight -
                menuHeight -
                8
            )
        );


    menu.style.position =
        "fixed";

    menu.style.width =
        menuWidth + "px";

    menu.style.minWidth =
        menuWidth + "px";

    menu.style.maxWidth =
        menuWidth + "px";

    menu.style.left =
        left + "px";

    menu.style.top =
        top + "px";


    /* =========================
       EDIT
    ========================= */

    const editButton =
        menu.querySelector(
            '[data-action="edit"]'
        );


    if (editButton) {

        editButton.addEventListener(
            "click",
            () => {

                closePrivateMessageMenu();

                editPrivateMessage(
                    messageId,
                    message
                );

            }
        );

    }


    /* =========================
       DELETE
    ========================= */

    const deleteButton =
        menu.querySelector(
            '[data-action="delete"]'
        );


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            async () => {

                closePrivateMessageMenu();

                await deletePrivateMessage(
                    messageId
                );

            }
        );

    }


    /* =========================
       CLOSE OUTSIDE
    ========================= */

    setTimeout(
        () => {

            document.addEventListener(
                "click",
                privateMessageOutsideClick,
                {
                    once: true
                }
            );

        },
        0
    );

}


/* =====================================================
   CLOSE PRIVATE MESSAGE MENU
===================================================== */

function closePrivateMessageMenu() {

    const menu =
        document.getElementById(
            "privateMessageMenu"
        );

    if (menu) {

        menu.remove();

    }

}
function privateMessageOutsideClick(event) {

    const menu =
        document.getElementById(
            "privateMessageMenu"
        );

    if (
        menu &&
        !menu.contains(
            event.target
        )
    ) {

        closePrivateMessageMenu();

    }

}


/* =====================================================
   EDIT PRIVATE MESSAGE
===================================================== */

async function editPrivateMessage(
    messageId,
    message
) {

    const newText =
        prompt(
            getText().editMessagePrompt ||
            "Изменить сообщение:",
            message.text || ""
        );


    if (newText === null) {
        return;
    }


    const text =
        newText.trim();


    if (!text) {

        showToast(
            getText().emptyMessage ||
            "Сообщение не может быть пустым"
        );

        return;

    }


    try {

        const messageRef =
            ref(
                db,
                `chats/${currentChatId}/messages/${messageId}`
            );


        await update(
            messageRef,
            {

                text:
                    text,

                edited:
                    true,

                editedAt:
                    Date.now()

            }
        );


    } catch (error) {

        console.error(
            "Ошибка изменения сообщения:",
            error
        );

        showToast(
            getText().editError ||
            "Не удалось изменить сообщение"
        );

    }

}


/* =====================================================
   DELETE PRIVATE MESSAGE
===================================================== */

async function deletePrivateMessage(
    messageId
) {

    const confirmed =
        confirm(
            getText().deleteConfirm ||
            "Удалить это сообщение?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const messageRef =
            ref(
                db,
                `chats/${currentChatId}/messages/${messageId}`
            );


        await remove(
            messageRef
        );


    } catch (error) {

        console.error(
            "Ошибка удаления сообщения:",
            error
        );

        showToast(
            getText().deleteError ||
            "Не удалось удалить сообщение"
        );

    }

}


/* =====================================================
   PRIVATE CHAT — USER SEARCH
===================================================== */

let searchTimeout = null;


/* =====================================================
   CREATE PRIVATE CHAT ID
===================================================== */

function createPrivateChatId(uid1, uid2) {

    return [
        uid1,
        uid2
    ]
        .sort()
        .join("_");

}


/* =====================================================
   SEARCH USERS
===================================================== */

async function searchUsers(query) {

    if (!searchInput) {
        return;
    }


    query =
        query
            .trim()
            .toLowerCase()
            .replace(/^@/, "");


    const chatList =
        document.getElementById(
            "chatList"
        );


    if (!query) {

        removeSearchResults();

        return;

    }


    try {

        const usersRef =
            ref(
                db,
                "users"
            );


        const snapshot =
            await get(
                usersRef
            );


        if (!snapshot.exists()) {

            showSearchResults([]);

            return;

        }


        const users =
            snapshot.val();


        const results = [];


        Object.entries(users)
            .forEach(
                ([uid, user]) => {

                    /* Не показываем себя */

                    if (
                        currentUser &&
                        uid === currentUser.uid
                    ) {

                        return;

                    }


                    const profile =
                        user?.profile ||
                        {};


                    const username =
                        (
                            profile.username ||
                            ""
                        )
                            .toLowerCase();


                    const name =
                        (
                            profile.name ||
                            ""
                        )
                            .toLowerCase();


                    if (
                        username.includes(
                            query
                        ) ||
                        name.includes(
                            query
                        )
                    ) {

                        results.push({

                            uid:
                                uid,

                            username:
                                profile.username ||
                                "username",

                            name:
                                profile.name ||
                                "Пользователь"

                        });

                    }

                }
            );


        /* максимум 10 результатов */

        showSearchResults(
            results.slice(0, 10)
        );


    } catch (error) {

        console.error(
            "❌ Ошибка поиска пользователей:",
            error
        );

    }

}


/* =====================================================
   SHOW SEARCH RESULTS
===================================================== */

function showSearchResults(users) {

    removeSearchResults();


    if (!searchInput) {
        return;
    }


    const searchArea =
        document.querySelector(
            ".search-area"
        );


    if (!searchArea) {
        return;
    }


    const results =
        document.createElement(
            "div"
        );


    results.id =
        "userSearchResults";


    results.className =
        "user-search-results";


    if (!users.length) {

        results.innerHTML = `
            <div class="user-search-empty">
                Пользователь не найден
            </div>
        `;

    } else {

        users.forEach(
            user => {

                const item =
                    document.createElement(
                        "button"
                    );


                item.type =
                    "button";


                item.className =
                    "user-search-result";


                item.innerHTML = `

                    <div class="user-search-avatar">
                        ${
                            (
                                user.name ||
                                "?"
                            )
                                .charAt(0)
                                .toUpperCase()
                        }
                    </div>

                    <div class="user-search-info">

                        <strong>
                            ${
                                escapeHtml(
                                    user.name
                                )
                            }
                        </strong>

                        <span>
                            @${escapeHtml(
                                user.username
                            )}
                        </span>

                    </div>

                `;


                item.addEventListener(
                    "click",
                    () => {

                        openPrivateChat(
                            user.uid,
                            user.username,
                            user.name
                        );

                    }
                );


                results.appendChild(
                    item
                );

            }
        );

    }


    searchArea.appendChild(
        results
    );

}


/* =====================================================
   REMOVE SEARCH RESULTS
===================================================== */

function removeSearchResults() {

    const results =
        document.getElementById(
            "userSearchResults"
        );


    if (results) {

        results.remove();

    }

}


/* =====================================================
   SEARCH INPUT
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            clearTimeout(
                searchTimeout
            );


            searchTimeout =
                setTimeout(
                    () => {

                        searchUsers(
                            searchInput.value
                        );

                    },
                    250
                );

        }
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(value) {

    return String(
        value || ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


console.log(
    "🔥 FlowChat chats.js загружен"
);

console.log(
    "✅ CHATS.JS ДОШЁЛ ДО КОНЦА"
);