/* =====================================================
   FLOWCHAT
   Firebase Authentication + Realtime Database
===================================================== */

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    reload,
    onAuthStateChanged,
    signOut
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    get
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


/* =====================================================
   FIREBASE
===================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyB9GXaJJNvKBLrrelcvNYUdVs3OZM539SM",
    authDomain: "flowchat-b9791.firebaseapp.com",
    databaseURL: "https://flowchat-b9791-default-rtdb.firebaseio.com",
    projectId: "flowchat-b9791",
    storageBucket: "flowchat-b9791.firebasestorage.app",
    messagingSenderId: "1012194532616",
    appId: "1:1012194532616:web:5006856bc30de68814e0bd",
    measurementId: "G-0GBP7M5VGD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);


/* =====================================================
   SHORTCUT
===================================================== */

const $ = id => document.getElementById(id);


/* =====================================================
   ELEMENTS
===================================================== */

const registerView = $("registerView");
const loginView = $("loginView");

const registerForm = $("registerForm");
const loginForm = $("loginForm");

const usernameInput = $("username");
const emailInput = $("email");
const passwordInput = $("password");
const confirmInput = $("confirm");
const termsInput = $("terms");

const loginEmail = $("loginEmail");
const loginPassword = $("loginPassword");

const registerButton = $("registerButton");
const loginButton = $("loginButton");

const showLogin = $("showLogin");
const showRegister = $("showRegister");


/* =====================================================
   SWITCH LOGIN / REGISTER
===================================================== */

showLogin.addEventListener("click", () => {

    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");

    clearErrors();

});


showRegister.addEventListener("click", () => {

    loginView.classList.add("hidden");
    registerView.classList.remove("hidden");

    clearErrors();

});


/* =====================================================
   PASSWORD EYE
===================================================== */

document.querySelectorAll(".eye").forEach(button => {

    button.addEventListener("click", () => {

        const input = $(button.dataset.password);

        if (!input) return;

        if (input.type === "password") {

            input.type = "text";

        } else {

            input.type = "password";

        }

    });

});


/* =====================================================
   PASSWORD STRENGTH
===================================================== */

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    const bars = document.querySelectorAll(".strength i");

    const text = $("strengthText");

    bars.forEach(bar => {
        bar.style.background = "#30344c";
    });


    if (!password) {

        text.textContent = "Придумайте пароль";

        return;

    }


    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-ZА-ЯЁ]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-zА-Яа-яЁё0-9]/.test(password)) score++;


    if (score === 1) {

        bars[0].style.background = "#ff6378";

        text.textContent = "Слабый пароль";

    }

    else if (score === 2) {

        bars[0].style.background = "#ffb454";
        bars[1].style.background = "#ffb454";

        text.textContent = "Нормальный пароль";

    }

    else if (score === 3) {

        for (let i = 0; i < 3; i++) {
            bars[i].style.background = "#7f8cff";
        }

        text.textContent = "Хороший пароль";

    }

    else {

        bars.forEach(bar => {
            bar.style.background = "#4cdb9b";
        });

        text.textContent = "Отличный пароль";

    }

});


/* =====================================================
   ERRORS
===================================================== */

function showError(id, message) {

    const element = $(id);

    if (!element) return;

    element.textContent = message;

    element.classList.add("show");

}


function hideError(id) {

    const element = $(id);

    if (!element) return;

    element.textContent = "";

    element.classList.remove("show");

}


function clearErrors() {

    document.querySelectorAll("em").forEach(element => {

        element.textContent = "";

        element.classList.remove("show");

    });

}


/* =====================================================
   USERNAME VALIDATION
===================================================== */

function validateUsername() {

    const username = usernameInput.value.trim();


    if (!username) {

        showError(
            "usernameError",
            "Введите имя пользователя."
        );

        return false;

    }


    if (username.length < 3) {

        showError(
            "usernameError",
            "Минимум 3 символа."
        );

        return false;

    }


    if (username.length > 24) {

        showError(
            "usernameError",
            "Максимум 24 символа."
        );

        return false;

    }


    if (!/^[a-zA-Zа-яА-ЯёЁ0-9_]+$/.test(username)) {

        showError(
            "usernameError",
            "Используйте только буквы, цифры и _."
        );

        return false;

    }


    hideError("usernameError");

    return true;

}


/* =====================================================
   EMAIL VALIDATION
===================================================== */

function validateEmail() {

    const email = emailInput.value.trim();

    if (!email) {

        showError(
            "emailError",
            "Введите email."
        );

        return false;

    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        showError(
            "emailError",
            "Введите корректный email."
        );

        return false;

    }


    hideError("emailError");

    return true;

}


/* =====================================================
   PASSWORD VALIDATION
===================================================== */

function validatePassword() {

    const password = passwordInput.value;


    if (!password) {

        showError(
            "passwordError",
            "Введите пароль."
        );

        return false;

    }


    if (password.length < 6) {

        showError(
            "passwordError",
            "Пароль должен содержать минимум 6 символов."
        );

        return false;

    }


    hideError("passwordError");

    return true;

}


/* =====================================================
   CONFIRM PASSWORD
===================================================== */

function validateConfirm() {

    if (!confirmInput.value) {

        showError(
            "confirmError",
            "Повторите пароль."
        );

        return false;

    }


    if (
        passwordInput.value !==
        confirmInput.value
    ) {

        showError(
            "confirmError",
            "Пароли не совпадают."
        );

        return false;

    }


    hideError("confirmError");

    return true;

}


/* =====================================================
   REGISTER
===================================================== */

registerForm.addEventListener("submit", async event => {

    event.preventDefault();

    clearErrors();


    const usernameOK = validateUsername();

    const emailOK = validateEmail();

    const passwordOK = validatePassword();

    const confirmOK = validateConfirm();


    if (!termsInput.checked) {

        showError(
            "termsError",
            "Примите условия использования."
        );

    }


    if (
        !usernameOK ||
        !emailOK ||
        !passwordOK ||
        !confirmOK ||
        !termsInput.checked
    ) {

        return;

    }


    registerButton.disabled = true;

    registerButton.innerHTML =
        "<span>Создание...</span>";


    try {

        const email = emailInput.value.trim();

        const username = usernameInput.value.trim();

        const usernameKey =
            username.toLowerCase();


        /* Проверяем username */

        const usernameSnapshot = await get(
            ref(db, "usernames/" + usernameKey)
        );


        if (usernameSnapshot.exists()) {

            showError(
                "usernameError",
                "Это имя пользователя уже занято."
            );

            return;

        }


        /* Создаём Firebase аккаунт */
        justRegistered = true;

        const credential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                passwordInput.value
            );


        const user = credential.user;


        /* Сохраняем профиль */

        await set(
            ref(db, "users/" + user.uid),
            {
                uid: user.uid,
                username: username,
                usernameLower: usernameKey,
                email: email,
                avatar: "",
                status: "offline",
                createdAt: Date.now()
            }
        );


        /* Регистрируем username */

        await set(
            ref(db, "usernames/" + usernameKey),
            user.uid
        );


        /* Отправляем подтверждение */

        await sendEmailVerification(user);

console.log(
    "✅ Письмо подтверждения отправлено на:",
    user.email
);

/*
 * Firebase автоматически авторизует пользователя
 * после регистрации.
 *
 * Нам это сейчас НЕ нужно.
 * Выходим из аккаунта и отправляем пользователя
 * обратно на экран входа.
 */

await signOut(auth);

/* Открываем страницу входа */

registerView.classList.add("hidden");
loginView.classList.remove("hidden");

/* Подставляем email, чтобы его не пришлось вводить заново */

loginEmail.value = email;

/* Пароль специально не подставляем */

loginPassword.value = "";

showToast(
    "Аккаунт создан! Теперь войдите в него 📧"
);


    } catch (error) {

        console.error(error);

        handleFirebaseError(
            error,
            "register"
        );

    } finally {

        registerButton.disabled = false;

        registerButton.innerHTML =
            "<span>Создать аккаунт</span><b>→</b>";

    }

});


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener("submit", async event => {

    event.preventDefault();

    hideError("loginEmailError");
    hideError("loginPasswordError");


    const email = loginEmail.value.trim();

    const password = loginPassword.value;


    if (!email) {

        showError(
            "loginEmailError",
            "Введите email."
        );

        return;

    }


    if (!password) {

        showError(
            "loginPasswordError",
            "Введите пароль."
        );

        return;

    }


    loginButton.disabled = true;

    loginButton.innerHTML =
        "<span>Вход...</span>";


    try {

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user = credential.user;


        await reload(user);


        if (!user.emailVerified) {

            showVerificationModal();

            return;

        }


        showToast(
            "Добро пожаловать в FlowChat! 🎉"
        );
        setTimeout(() => {
    location.href = "chats.html";
}, 500);


        /*
         * Когда сделаем chats.html:
         *
         * location.href = "chats.html";
         */

    } catch (error) {

        console.error(error);

        handleFirebaseError(
            error,
            "login"
        );

    } finally {

        loginButton.disabled = false;

        loginButton.innerHTML =
            "<span>Войти</span><b>→</b>";

    }

});


/* =====================================================
   FIREBASE ERRORS
===================================================== */

function handleFirebaseError(error, type) {

    console.error(
        "Firebase error:",
        error.code,
        error.message
    );


    switch (error.code) {


        case "auth/email-already-in-use":

            showError(
                "emailError",
                "Этот email уже зарегистрирован."
            );

            break;


        case "auth/invalid-email":

            showError(
                type === "login"
                    ? "loginEmailError"
                    : "emailError",

                "Некорректный email."
            );

            break;


        case "auth/weak-password":

            showError(
                "passwordError",
                "Пароль слишком слабый."
            );

            break;


        case "auth/invalid-credential":

        case "auth/wrong-password":

        case "auth/user-not-found":

            showError(
                "loginPasswordError",
                "Неверный email или пароль."
            );

            break;


        case "auth/too-many-requests":

            showToast(
                "Слишком много попыток. Попробуйте позже."
            );

            break;


        case "auth/network-request-failed":

            showToast(
                "Проверьте интернет-соединение."
            );

            break;


        default:

            showToast(
                "Произошла ошибка. Попробуйте ещё раз."
            );

    }

}


/* =====================================================
   VERIFICATION MODAL
===================================================== */

const verificationModal =
    $("verificationModal");

const checkVerification =
    $("checkVerification");

const resendVerification =
    $("resendVerification");

const verificationClose =
    $("verificationClose");


function showVerificationModal() {

    verificationModal.classList.add("active");

}


function closeVerificationModal() {

    verificationModal.classList.remove("active");

}


verificationClose.addEventListener(
    "click",
    closeVerificationModal
);


verificationModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeVerificationModal
    );


/* =====================================================
   CHECK EMAIL
===================================================== */

checkVerification.addEventListener(
    "click",
    async () => {

        const user = auth.currentUser;


        if (!user) {

            closeVerificationModal();

            return;

        }


        try {

            await reload(user);


            if (auth.currentUser.emailVerified) {

                closeVerificationModal();

                showToast(
                    "Email подтверждён! 🎉"
                );
                setTimeout(() => {
    location.href = "chats.html";
}, 500);


                /*
                 * В будущем:
                 *
                 * location.href = "chats.html";
                 */

            } else {

                showToast(
                    "Email ещё не подтверждён."
                );

            }

        } catch (error) {

            console.error(error);

            showToast(
                "Не удалось проверить email."
            );

        }

    }
);


/* =====================================================
   RESEND EMAIL
===================================================== */

resendVerification.addEventListener(
    "click",
    async () => {

        const user = auth.currentUser;


        if (!user) {

            showToast(
                "Пользователь не найден."
            );

            return;

        }


        try {

            resendVerification.disabled = true;

            resendVerification.textContent =
                "Отправка...";


            await sendEmailVerification(user);


            showToast(
                "Письмо отправлено ещё раз! 📧"
            );


        } catch (error) {

            console.error(error);


            if (
                error.code ===
                "auth/too-many-requests"
            ) {

                showToast(
                    "Слишком много запросов. Попробуйте позже."
                );

            } else {

                showToast(
                    "Не удалось отправить письмо."
                );

            }

        } finally {

            resendVerification.disabled = false;

            resendVerification.textContent =
                "Отправить письмо ещё раз";

        }

    }
);


/* =====================================================
   RESET PASSWORD
===================================================== */

const resetModal = $("resetModal");

const resetEmail = $("resetEmail");

const resetError = $("resetError");

const forgotPassword = $("forgotPassword");

const resetClose = $("resetClose");

const sendReset = $("sendReset");


forgotPassword.addEventListener(
    "click",
    () => {

        resetEmail.value =
            loginEmail.value.trim();

        resetError.textContent = "";

        resetError.classList.remove("show");

        resetModal.classList.add("active");

    }
);


resetClose.addEventListener(
    "click",
    () => {

        resetModal.classList.remove("active");

    }
);


resetModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        () => {

            resetModal.classList.remove("active");

        }
    );


sendReset.addEventListener(
    "click",
    async () => {

        const email =
            resetEmail.value.trim();


        resetError.textContent = "";

        resetError.classList.remove("show");


        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            resetError.textContent =
                "Введите корректный email.";

            resetError.classList.add("show");

            return;

        }


        sendReset.disabled = true;

        sendReset.textContent =
            "Отправка...";


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );


            resetModal.classList.remove("active");


            showToast(
                "Письмо для восстановления отправлено! 📧"
            );


        } catch (error) {

            console.error(error);


            resetError.textContent =
                "Не удалось отправить письмо.";

            resetError.classList.add("show");


        } finally {

            sendReset.disabled = false;

            sendReset.textContent =
                "Отправить ссылку";

        }

    }
);

/* =====================================================
   DOCUMENTS
===================================================== */

const documentModal = document.getElementById("documentModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalIcon = document.getElementById("modalIcon");

const termsLink = document.getElementById("termsLink");
const privacyLink = document.getElementById("privacyLink");

const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");


const termsText = `
    <h3>1. Общие положения</h3>

    <p>
        Добро пожаловать в <strong>FlowChat</strong>.
        Используя сервис, вы соглашаетесь с настоящими
        условиями использования.
    </p>

    <h3>2. Аккаунт</h3>

    <p>
        Для использования FlowChat необходимо создать
        личный аккаунт. Пользователь отвечает за
        безопасность данных своего аккаунта.
    </p>

    <h3>3. Использование сервиса</h3>

    <p>
        FlowChat предназначен для общения и обмена
        сообщениями между пользователями.
    </p>

    <h3>4. Запрещённый контент</h3>

    <p>
        Запрещается использовать FlowChat для
        распространения незаконного, вредоносного
        или спам-контента.
    </p>

    <h3>5. Изменения</h3>

    <p>
        Функциональность FlowChat и настоящие условия
        могут изменяться по мере развития сервиса.
    </p>

    <h3>6. Контакты</h3>

    <p>
        По вопросам работы FlowChat пользователи смогут
        обратиться в службу поддержки.
    </p>
`;


const privacyText = `
    <h3>1. Какие данные мы собираем</h3>

    <p>
        FlowChat может хранить имя пользователя,
        адрес электронной почты и технические данные,
        необходимые для работы сервиса.
    </p>

    <h3>2. Использование данных</h3>

    <p>
        Данные используются для регистрации,
        авторизации, работы аккаунта и обеспечения
        безопасности FlowChat.
    </p>

    <h3>3. Сообщения</h3>

    <p>
        Сообщения используются для предоставления
        пользователям возможности общаться друг с другом.
    </p>

    <h3>4. Защита данных</h3>

    <p>
        Мы принимаем разумные меры для защиты
        пользовательских данных от несанкционированного
        доступа.
    </p>

    <h3>5. Сторонние сервисы</h3>

    <p>
        FlowChat использует Firebase для авторизации
        и хранения необходимых данных приложения.
    </p>

    <h3>6. Изменения политики</h3>

    <p>
        Политика конфиденциальности может обновляться
        по мере развития FlowChat.
    </p>
`;


/* Открытие документа */

function openDocument(type) {

    if (!documentModal) {
        console.error("FlowChat: documentModal не найден");
        return;
    }

    if (type === "terms") {

        if (modalIcon)
            modalIcon.textContent = "📄";

        if (modalTitle)
            modalTitle.textContent = "Условия использования";

        if (modalContent)
            modalContent.innerHTML = termsText;

    }

    if (type === "privacy") {

        if (modalIcon)
            modalIcon.textContent = "🔐";

        if (modalTitle)
            modalTitle.textContent =
                "Политика конфиденциальности";

        if (modalContent)
            modalContent.innerHTML = privacyText;

    }

    documentModal.classList.add("active");

}


/* Закрытие */

function closeDocument() {

    if (!documentModal) return;

    documentModal.classList.remove("active");

}


/* Условия */

if (termsLink) {

    termsLink.addEventListener("click", event => {

        event.preventDefault();

        openDocument("terms");

    });

}


/* Политика */

if (privacyLink) {

    privacyLink.addEventListener("click", event => {

        event.preventDefault();

        openDocument("privacy");

    });

}


/* Кнопка X */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeDocument
    );

}


/* Кнопка "Понятно" */

if (modalOk) {

    modalOk.addEventListener(
        "click",
        closeDocument
    );

}

/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(message) {

    const toast = document.getElementById("toast");

    // Если toast отсутствует в HTML —
    // создаём его автоматически
    if (!toast) {

        const newToast = document.createElement("div");

        newToast.id = "toast";

        newToast.className = "toast";

        document.body.appendChild(newToast);

        showToast(message);

        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);
}

/* =====================================================
   CLICK OUTSIDE
===================================================== */

if (documentModal) {

    documentModal.addEventListener(
        "click",
        event => {

            if (
                event.target.classList.contains(
                    "modal-overlay"
                )
            ) {

                closeDocument();

            }

        }
    );

}

/* =====================================================
   FLOW SYSTEM TRANSLATIONS
===================================================== */

function getSystemChatText() {

    const language =
        localStorage.getItem(
            "flowchat_language"
        ) || "ru";


    const translations = {

        ru: {
            title: "Flow System",
            subtitle:
                "Официальные новости FlowChat"
        },

        en: {
            title: "Flow System",
            subtitle:
                "Official FlowChat news"
        },

        zh: {
            title: "Flow System",
            subtitle:
                "FlowChat 官方新闻"
        }

    };


    return (
        translations[language] ||
        translations.ru
    );

}


/* =====================================================
   UPDATE FLOW SYSTEM LANGUAGE
===================================================== */

function updateSystemChatLanguage() {

    if (
        currentChatId !==
        SYSTEM_CHAT_ID
    ) {
        return;
    }


    const text =
        getSystemChatText();


    if (chatTitle) {

        chatTitle.textContent =
            text.title;

    }


    if (chatSubtitle) {

        chatSubtitle.textContent =
            text.subtitle;

    }

}

/* =====================================================
   ESC
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeDocument();

        }

    }
);
/* =====================================================
   AUTO LOGIN
===================================================== */

let authChecked = false;
let justRegistered = false;


/* =====================================================
   AUTH STATE
===================================================== */

onAuthStateChanged(auth, (user) => {

    /*
       Если пользователь только что зарегистрировался,
       НЕ отправляем его в chats.html.
    */

    if (justRegistered) {

        console.log(
            "🆕 Только что зарегистрирован:",
            user?.email
        );

        return;

    }


    if (user) {

        console.log(
            "✅ Автовход:",
            user.email
        );

        window.location.replace(
            "chats.html"
        );

        return;

    }


    console.log(
        "ℹ️ Пользователь не авторизован"
    );

});