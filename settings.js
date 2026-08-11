/* =====================================================
   FLOWCHAT SETTINGS
===================================================== */

let settingsOverlay = null;


/* =====================================================
   LANGUAGE SYSTEM
===================================================== */

/*
   Переводы находятся ТОЛЬКО в languages.js.

   languages.js предоставляет:

   window.TEXT
   window.LANGUAGES
   window.LANGUAGE_CODES
   window.flowChatLanguages
*/


function getLanguage() {

    if (
        window.flowChatLanguages &&
        typeof window.flowChatLanguages
            .getCurrentLanguage === "function"
    ) {

        return window.flowChatLanguages
            .getCurrentLanguage();

    }


    return (
        localStorage.getItem(
            "flowchat_language"
        ) || "ru"
    );

}


/* =====================================================
   GET TEXT
===================================================== */

function getText() {

    const language =
        getLanguage();


    if (
        window.TEXT &&
        window.TEXT[language]
    ) {

        return window.TEXT[
            language
        ];

    }


    if (
        window.TEXT &&
        window.TEXT.ru
    ) {

        return window.TEXT.ru;

    }


    return {};

}


/* =====================================================
   GET SETTINGS TRANSLATION
===================================================== */

function getSettingsText(
    key,
    fallback = ""
) {

    const text =
        getText();


    if (
        text[key] !== undefined &&
        text[key] !== null
    ) {

        return text[key];

    }


    if (
        window.TEXT &&
        window.TEXT.ru &&
        window.TEXT.ru[key] !== undefined
    ) {

        return window.TEXT.ru[key];

    }


    return fallback;

}


/* =====================================================
   THEME
===================================================== */

function getTheme() {

    return (
        localStorage.getItem(
            "flowchat_theme"
        ) || "dark"
    );

}


/* =====================================================
   PRIVACY
===================================================== */

function isPrivate() {

    return (
        localStorage.getItem(
            "flowchat_private"
        ) === "true"
    );

}


/* =====================================================
   APPLY THEME
===================================================== */

function applyTheme() {

    const theme =
        getTheme();


    document.documentElement
        .setAttribute(
            "data-theme",
            theme
        );


    /*
       Поддержка старых CSS-классов.
    */

    document.body.classList.toggle(
        "light-theme",
        theme === "light"
    );


    document.body.classList.toggle(
        "light",
        theme === "light"
    );


    document.body.classList.toggle(
        "dark-theme",
        theme === "dark"
    );


    document.body.classList.toggle(
        "dark",
        theme === "dark"
    );

}


/* =====================================================
   APPLY LANGUAGE
===================================================== */

function applyLanguage() {

    const language =
        getLanguage();


    const text =
        window.TEXT?.[language] ||
        window.TEXT?.ru;


    if (!text) {

        console.error(
            "❌ FlowChat: перевод не найден:",
            language
        );

        return;

    }


    /* =================================================
       HELPER
    ================================================= */

    function hasText(key) {

        return (
            text[key] !== undefined &&
            text[key] !== null &&
            text[key] !== ""
        );

    }


    function setText(
        element,
        key
    ) {

        if (
            element &&
            hasText(key)
        ) {

            element.textContent =
                text[key];

        }

    }


    /* =================================================
       DATA-I18N
    ================================================= */

    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            element => {

                setText(
                    element,
                    element.dataset.i18n
                );

            }
        );


    /* =================================================
       PLACEHOLDER
    ================================================= */

    document
    .querySelectorAll(
        "[data-i18n-placeholder]"
    )
    .forEach(
        element => {

            const key =
                element.dataset
                    .i18nPlaceholder;

            if (
                hasText(key)
            ) {

                element.placeholder =
                    text[key];

            }

        }
    );


    /* =================================================
       TITLE
    ================================================= */

    document
        .querySelectorAll(
            "[data-i18n-title]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset
                        .i18nTitle;


                if (
                    hasText(key)
                ) {

                    element.title =
                        text[key];

                }

            }
        );


    /* =================================================
       ARIA
    ================================================= */

    document
        .querySelectorAll(
            "[data-i18n-aria]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset
                        .i18nAria;


                if (
                    hasText(key)
                ) {

                    element.setAttribute(
                        "aria-label",
                        text[key]
                    );

                }

            }
        );


    /* =================================================
       PROFILE DESCRIPTION
    ================================================= */

    const profileDescription =
        document.querySelector(
            "#settingsProfile [data-i18n-description]"
        );


    if (profileDescription) {

        profileDescription.textContent =
            text.profileSettingsDesc ||
            text.profileDesc ||
            text.profileDescription ||
            "";

    }


    /* =================================================
       THEME DESCRIPTION
    ================================================= */

    const themeDescription =
        document.querySelector(
            "#settingsTheme [data-i18n-description]"
        );


    const themeValue =
        document.getElementById(
            "settingsThemeValue"
        );


    const theme =
        getTheme();


    const themeText =
        theme === "light"
            ? (
                text.themeLight ||
                text.light ||
                ""
            )
            : (
                text.themeDark ||
                text.dark ||
                ""
            );


    if (themeDescription) {

        themeDescription.textContent =
            themeText;

    }


    if (themeValue) {

        themeValue.textContent =
            themeText;

    }


    /* =================================================
       PRIVACY DESCRIPTION
    ================================================= */

    const privacyDescription =
        document.querySelector(
            "#settingsPrivacy [data-i18n-description]"
        );


    const privacyValue =
        document.getElementById(
            "settingsPrivacyValue"
        );


    const privateEnabled =
        isPrivate();


    const privacyText =
        privateEnabled
            ? (
                text.privacyOn ||
                text.on ||
                ""
            )
            : (
                text.privacyOff ||
                text.off ||
                ""
            );


    if (privacyDescription) {

        privacyDescription.textContent =
            privacyText;

    }


    if (privacyValue) {

        privacyValue.textContent =
            privacyText;

    }


    /* =================================================
       LANGUAGE DESCRIPTION
    ================================================= */

    const languageDescription =
        document.querySelector(
            "#settingsLanguage [data-i18n-description]"
        );


    const languageInfo =
        window.LANGUAGES?.[language] ||
        null;


    if (languageDescription) {

        languageDescription.textContent =
            languageInfo?.nativeName ||
            languageInfo?.name ||
            language;

    }


    /* =================================================
       HELP DESCRIPTION
    ================================================= */

    const helpDescription =
        document.querySelector(
            "#settingsHelp [data-i18n-description]"
        );


    if (helpDescription) {

        helpDescription.textContent =
            text.helpDescription ||
            text.helpDesc ||
            "";

    }


    /* =================================================
       LANGUAGE HEADER
    ================================================= */

    const languageFlag =
        document.getElementById(
            "languageFlag"
        );


    const languageTitle =
        document.getElementById(
            "languageTitle"
        );


    const languageDesc =
        document.getElementById(
            "languageDesc"
        );


    if (languageFlag) {

        languageFlag.textContent =
            languageInfo?.flag ||
            "🌐";

    }


    if (languageTitle) {

        languageTitle.textContent =
            text.language ||
            "Language";

    }


    if (languageDesc) {

        languageDesc.textContent =
            languageInfo?.nativeName ||
            languageInfo?.name ||
            language;

    }


    /* =================================================
       PROFILE STATUS
    ================================================= */

    document
        .querySelectorAll(
            "[data-i18n-profile-status]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset
                        .i18nProfileStatus;


                if (
                    hasText(key)
                ) {

                    element.textContent =
                        text[key];

                }

            }
        );


    /* =================================================
       SYSTEM CHAT
    ================================================= */

    document
        .querySelectorAll(
            "[data-i18n='systemChat']"
        )
        .forEach(
            element => {

                element.textContent =
                    text.systemChat ||
                    "Flow System";

            }
        );


    document
        .querySelectorAll(
            "[data-i18n='systemChatDescription']"
        )
        .forEach(
            element => {

                element.textContent =
                    text.systemChatDescription ||
                    "";

            }
        );


    /* =================================================
       SAVE CURRENT LANGUAGE
    ================================================= */

    localStorage.setItem(
        "flowchat_language",
        language
    );


    console.log(
        "🌍 FlowChat Settings: язык применён:",
        language
    );

}


/* =====================================================
   LANGUAGE CHANGE
===================================================== */

function changeLanguage() {

    if (
        !window.flowChatLanguages
    ) {

        console.error(
            "❌ FlowChat: languages.js не загружен"
        );

        return;

    }


    const languages =
        window.flowChatLanguages
            .LANGUAGE_CODES;


    if (
        !Array.isArray(languages) ||
        languages.length === 0
    ) {

        console.error(
            "❌ FlowChat: список языков пуст"
        );

        return;

    }


    const current =
        window.flowChatLanguages
            .getCurrentLanguage();


    const currentIndex =
        languages.indexOf(
            current
        );


    const safeIndex =
        currentIndex >= 0
            ? currentIndex
            : -1;


    const nextIndex =
        (
            safeIndex + 1
        ) %
        languages.length;


    const nextLanguage =
        languages[
            nextIndex
        ];


    console.log(
        `🌍 Переключение: ${current} → ${nextLanguage}`
    );


    const result =
        window.flowChatLanguages
            .setLanguage(
                nextLanguage
            );


    console.log(
        "🌍 Результат смены языка:",
        result
    );

}


/* =====================================================
   LANGUAGE CHANGED EVENT
===================================================== */


/* =====================================================
   INITIALIZE LANGUAGE
===================================================== */

function initializeSettingsLanguage() {

    if (
        window.flowChatLanguages
    ) {

        applyLanguage();

        return;

    }


    setTimeout(
        () => {

            if (
                window.flowChatLanguages
            ) {

                applyLanguage();

            }
            else {

                console.warn(
                    "⚠️ FlowChat Settings: language system не найден"
                );

            }

        },
        100
    );

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeSettingsLanguage
    );

}
else {

    initializeSettingsLanguage();

}


/* =====================================================
   SETTINGS TEXT
===================================================== */

function updateSettingsText() {

    const text =
        getText();


    const setElementText =
        (
            id,
            value
        ) => {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.textContent =
                    value || "";

            }

        };


    setElementText(
        "settingsTitle",
        text.settingsTitle ||
        text.title
    );


    setElementText(
        "settingsSubtitle",
        text.settingsSubtitle ||
        text.sub
    );


    setElementText(
        "profileSettingsTitle",
        text.profileSettingsTitle ||
        text.profile
    );


    setElementText(
        "profileSettingsDesc",
        text.profileSettingsDesc ||
        text.profileDesc
    );


    setElementText(
        "themeTitle",
        text.theme
    );


    setElementText(
        "themeDesc",
        getTheme() === "light"
            ? (
                text.themeLight ||
                text.light
            )
            : (
                text.themeDark ||
                text.dark
            )
    );


    setElementText(
        "privacyTitle",
        text.privacy
    );


    setElementText(
        "privacyDesc",
        isPrivate()
            ? (
                text.privacyOn ||
                text.on
            )
            : (
                text.privacyOff ||
                text.off
            )
    );


    setElementText(
        "languageTitle",
        text.language
    );


    const language =
        getLanguage();


    const languageInfo =
        window.LANGUAGES?.[language];


    setElementText(
        "languageDesc",
        languageInfo?.nativeName ||
        languageInfo?.name ||
        language
    );


    setElementText(
        "helpTitle",
        text.help
    );


    setElementText(
        "helpDesc",
        text.helpDescription ||
        text.helpDesc
    );

}


/* =====================================================
   CURRENT CHAT LANGUAGE
===================================================== */

function updateCurrentChatLanguage() {

    const text =
        getText();


    const chatTitle =
        document.getElementById(
            "chatTitle"
        );


    const chatSubtitle =
        document.getElementById(
            "chatSubtitle"
        );


    const favorites =
        document.getElementById(
            "favoritesChat"
        );


    const systemChat =
        document.getElementById(
            "systemChat"
        );


    if (
        systemChat &&
        systemChat.classList.contains(
            "active"
        )
    ) {

        if (chatTitle) {

            chatTitle.textContent =
                text.systemChat ||
                "Flow System";

        }


        if (chatSubtitle) {

            chatSubtitle.textContent =
                text.systemChatDescription ||
                "";

        }

    }


    if (favorites) {

        const isActive =
            favorites.classList.contains(
                "active"
            );


        if (
            isActive &&
            chatTitle
        ) {

            chatTitle.textContent =
                text.favorites ||
                "Favorites";

        }

    }

}
/* =====================================================
   OPEN SETTINGS
===================================================== */

function openSettings() {

    if (!settingsOverlay) {

        settingsOverlay =
            document.getElementById(
                "settingsOverlay"
            );

    }


    if (!settingsOverlay) {

        console.error(
            "❌ settingsOverlay не найден"
        );

        return;

    }


    settingsOverlay.classList.add(
        "active"
    );


    settingsOverlay.style.display =
        "flex";


    applyTheme();
    applyLanguage();
    updateSettingsText();
    updateCurrentChatLanguage();

}


/* =====================================================
   CLOSE SETTINGS
===================================================== */

function closeSettings() {

    if (!settingsOverlay) {

        return;

    }


    settingsOverlay.classList.remove(
        "active"
    );


    settingsOverlay.style.display =
        "none";

}


/* =====================================================
   TOGGLE THEME
===================================================== */

function toggleTheme() {

    const currentTheme =
        getTheme();


    const nextTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    localStorage.setItem(
        "flowchat_theme",
        nextTheme
    );


    applyTheme();


    /*
       После смены темы сразу
       обновляем описание темы.
    */

    applyLanguage();
    updateSettingsText();


    window.dispatchEvent(
        new CustomEvent(
            "flowchatThemeChanged",
            {
                detail: {
                    theme: nextTheme
                }
            }
        )
    );


    console.log(
        `🎨 FlowChat: тема ${currentTheme} → ${nextTheme}`
    );

}


/* =====================================================
   TOGGLE PRIVACY
===================================================== */

function togglePrivacy() {

    const current =
        isPrivate();


    const next =
        !current;


    localStorage.setItem(
        "flowchat_private",
        String(next)
    );


    /*
       Сразу обновляем текст
       "Включён / Выключен".
    */

    applyLanguage();
    updateSettingsText();


    window.dispatchEvent(
        new CustomEvent(
            "flowchatPrivacyChanged",
            {
                detail: {
                    private: next
                }
            }
        )
    );


    console.log(
        `🔒 FlowChat: приватность ${current} → ${next}`
    );

}


/* =====================================================
   PROFILE
===================================================== */

function openProfileFromSettings() {

    /*
       Закрываем настройки.
    */

    closeSettings();


    /*
       Если существует функция
       открытия профиля — используем её.
    */

    if (
        typeof openProfile ===
        "function"
    ) {

        openProfile();

        return;

    }


    if (
        typeof showProfile ===
        "function"
    ) {

        showProfile();

        return;

    }


    /*
       Запасной вариант.
    */

    const profileOverlay =
        document.getElementById(
            "profileOverlay"
        );


    if (profileOverlay) {

        profileOverlay.classList.add(
            "active"
        );

        profileOverlay.style.display =
            "flex";

    }

}



/* =====================================================
   HELP
===================================================== */


/* =====================================================
   SETTINGS ELEMENTS
===================================================== */

function bindSettings() {

    if (!settingsOverlay) {

        settingsOverlay =
            document.getElementById(
                "settingsOverlay"
            );

    }


    if (!settingsOverlay) {

        console.error(
            "❌ FlowChat: settingsOverlay не найден"
        );

        return;

    }


    const settingsClose =
        document.getElementById(
            "settingsClose"
        );


    const settingsProfile =
        document.getElementById(
            "settingsProfile"
        );


    const settingsTheme =
        document.getElementById(
            "settingsTheme"
        );


    const settingsPrivacy =
        document.getElementById(
            "settingsPrivacy"
        );


    const settingsLanguage =
        document.getElementById(
            "settingsLanguage"
        );


    const settingsHelp =
        document.getElementById(
            "settingsHelp"
        );


    /* =================================================
       CLOSE
    ================================================= */

    if (settingsClose) {

        if (
            settingsClose.dataset.bound !==
            "true"
        ) {

            settingsClose.dataset.bound =
                "true";


            settingsClose.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    closeSettings();

                }
            );

        }

    }


    /* =================================================
       PROFILE
    ================================================= */

    if (settingsProfile) {

        if (
            settingsProfile.dataset.bound !==
            "true"
        ) {

            settingsProfile.dataset.bound =
                "true";


            settingsProfile.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    openProfileFromSettings();

                }
            );

        }

    }


    /* =================================================
       THEME
    ================================================= */

    if (settingsTheme) {

        if (
            settingsTheme.dataset.bound !==
            "true"
        ) {

            settingsTheme.dataset.bound =
                "true";


            settingsTheme.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    toggleTheme();

                }
            );

        }

    }


    /* =================================================
       PRIVACY
    ================================================= */

    if (settingsPrivacy) {

        if (
            settingsPrivacy.dataset.bound !==
            "true"
        ) {

            settingsPrivacy.dataset.bound =
                "true";


            settingsPrivacy.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    togglePrivacy();

                }
            );

        }

    }


    /* =================================================
       LANGUAGE
    ================================================= */

    if (settingsLanguage) {

        if (
            settingsLanguage.dataset.bound !==
            "true"
        ) {

            settingsLanguage.dataset.bound =
                "true";


            settingsLanguage.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    changeLanguage();

                }
            );

        }

    }


    /* =================================================
       HELP
    ================================================= */

    if (settingsHelp) {

        if (
            settingsHelp.dataset.bound !==
            "true"
        ) {

            settingsHelp.dataset.bound =
                "true";


            settingsHelp.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    openHelp();

                }
            );

        }

    }


    /* =================================================
       OUTSIDE CLICK
    ================================================= */

    if (
        settingsOverlay.dataset.outsideBound !==
        "true"
    ) {

        settingsOverlay.dataset.outsideBound =
            "true";


        settingsOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    settingsOverlay
                ) {

                    closeSettings();

                }

            }
        );

    }

}


/* =====================================================
   SETTINGS BUTTON
===================================================== */

function bindSettingsButton() {

    const settingsButton =
        document.getElementById(
            "settingsButton"
        );


    if (!settingsButton) {

        console.error(
            "❌ FlowChat: settingsButton не найден"
        );

        return;

    }


    /*
       Не создаём второй
       обработчик клика.
    */

    if (
        settingsButton.dataset.bound ===
        "true"
    ) {

        return;

    }


    settingsButton.dataset.bound =
        "true";


    settingsButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            openSettings();

        }
    );

}


/* =====================================================
   ESCAPE
===================================================== */

function bindEscape() {

    if (
        document.body.dataset
            .settingsEscapeBound ===
        "true"
    ) {

        return;

    }


    document.body.dataset
        .settingsEscapeBound =
        "true";


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeSettings();

            }

        }
    );

}


/* =====================================================
   LANGUAGE EVENT
===================================================== */

window.addEventListener(
    "flowchatLanguageChanged",
    event => {

        const language =
            event.detail?.language ||
            getLanguage();


        console.log(
            "🌍 Settings получил новый язык:",
            language
        );


        /*
           ВАЖНО:

           Не вызываем changeLanguage().
           Не меняем localStorage вручную.

           Язык уже изменён languages.js.
        */

        applyLanguage();
        updateSettingsText();
        updateCurrentChatLanguage();

    }
);


/* =====================================================
   THEME EVENT
===================================================== */

window.addEventListener(
    "flowchatThemeChanged",
    () => {

        applyTheme();

        applyLanguage();

        updateSettingsText();

    }
);


/* =====================================================
   PRIVACY EVENT
===================================================== */

window.addEventListener(
    "flowchatPrivacyChanged",
    () => {

        applyLanguage();

        updateSettingsText();

    }
);


/* =====================================================
   UPDATE AFTER DYNAMIC HTML
===================================================== */

function refreshSettingsUI() {

    if (!settingsOverlay) {

        settingsOverlay =
            document.getElementById(
                "settingsOverlay"
            );

    }


    if (!settingsOverlay) {

        return;

    }


    applyTheme();
    applyLanguage();
    updateSettingsText();
    updateCurrentChatLanguage();

}


/* =====================================================
   OBSERVE SETTINGS
===================================================== */
function observeSettings() {

    if (!settingsOverlay) {
        return;
    }

    if (
        !window.MutationObserver ||
        settingsOverlay.dataset.observerBound === "true"
    ) {
        return;
    }

    settingsOverlay.dataset.observerBound = "true";

    let updateScheduled = false;

    const observer = new MutationObserver(mutations => {

        let hasNewTranslatableElement = false;

        for (const mutation of mutations) {

            if (mutation.type !== "childList") {
                continue;
            }

            for (const node of mutation.addedNodes) {

                if (node.nodeType !== 1) {
                    continue;
                }

                if (
                    node.matches?.(
                        "[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria], [data-i18n-description]"
                    ) ||
                    node.querySelector?.(
                        "[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria], [data-i18n-description]"
                    )
                ) {

                    hasNewTranslatableElement = true;
                    break;

                }

            }

            if (hasNewTranslatableElement) {
                break;
            }

        }

        if (
            hasNewTranslatableElement &&
            !updateScheduled
        ) {

            updateScheduled = true;

            requestAnimationFrame(() => {

                updateScheduled = false;

                applyLanguage();

            });

        }

    });

    observer.observe(
        settingsOverlay,
        {
            childList: true,
            subtree: true
        }
    );

}
/* =====================================================
   START SETTINGS
===================================================== */

function startSettings() {

    settingsOverlay =
        document.getElementById(
            "settingsOverlay"
        );


    if (!settingsOverlay) {

        console.error(
            "❌ FlowChat: settingsOverlay не найден"
        );

        return;

    }


    /* =================================================
       BIND EVENTS
    ================================================= */

    bindSettings();

    bindSettingsButton();

    bindEscape();


    /* =================================================
       APPLY INITIAL STATE
    ================================================= */

    applyTheme();

    applyLanguage();

    updateSettingsText();

    updateCurrentChatLanguage();


    /* =================================================
       OBSERVER
    ================================================= */

    observeSettings();


    /* =================================================
       SETTINGS BUTTON CHECK
    ================================================= */

    const settingsButton =
        document.getElementById(
            "settingsButton"
        );


    if (!settingsButton) {

        console.warn(
            "⚠️ FlowChat: settingsButton не найден"
        );

    }


    /* =================================================
       DEBUG
    ================================================= */

    console.log(
        "🔥 FlowChat Settings загружены"
    );

}


/* =====================================================
   START
===================================================== */

function initializeSettings() {

    /*
       languages.js должен быть
       загружен раньше settings.js.

       Но оставляем небольшую защиту,
       если браузер загрузил файлы не сразу.
    */

    if (
        window.flowChatLanguages
    ) {

        startSettings();

        return;

    }


    console.warn(
        "⚠️ FlowChat: language system пока не готов..."
    );


    let attempts = 0;

    const maxAttempts = 30;


    const waitForLanguages =
        setInterval(
            () => {

                attempts++;


                if (
                    window.flowChatLanguages
                ) {

                    clearInterval(
                        waitForLanguages
                    );


                    console.log(
                        "✅ FlowChat: language system найден"
                    );


                    startSettings();

                    return;

                }


                if (
                    attempts >=
                    maxAttempts
                ) {

                    clearInterval(
                        waitForLanguages
                    );


                    console.error(
                        "❌ FlowChat: languages.js не загрузился"
                    );

                }

            },
            100
        );

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeSettings,
        {
            once: true
        }
    );

}
else {

    initializeSettings();

}


/* =====================================================
   GLOBAL ACCESS
===================================================== */

window.flowChatSettings = {

    getLanguage,

    getText,

    getSettingsText,

    getTheme,

    isPrivate,

    applyTheme,

    applyLanguage,

    changeLanguage,

    openSettings,

    closeSettings,

    toggleTheme,

    togglePrivacy,

    updateSettingsText,

    updateCurrentChatLanguage,

    refreshSettingsUI

};


/* =====================================================
   FINAL DEBUG
===================================================== */

console.log(
    "⚙️ FlowChat Settings API готов"
);


console.log(
    "🌍 Текущий язык:",
    getLanguage()
);


console.log(
    "🎨 Текущая тема:",
    getTheme()
);


console.log(
    "🔒 Приватный профиль:",
    isPrivate()
);


/* =====================================================
   SAFETY CHECK
===================================================== */

window.addEventListener(
    "load",
    () => {

        /*
           После полной загрузки страницы
           ещё раз применяем перевод.

           Это помогает, если chats.js,
           profile.js или другой скрипт
           добавляет элементы после DOMContentLoaded.
        */

        setTimeout(
            () => {

                if (
                    window.flowChatLanguages
                ) {

                    applyLanguage();

                    updateSettingsText();

                    updateCurrentChatLanguage();

                }

            },
            50
        );
    },
    {
        once: true
    }
);