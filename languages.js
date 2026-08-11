/*=====================================================
   FLOWCHAT — LANGUAGES.JS
   Единая система языков FlowChat
===================================================== */

(function () {

    "use strict";


    /* =====================================================
       LANGUAGE DATA
    ===================================================== */

    const LANGUAGES = {

        ru: {
            name: "Russian",
            nativeName: "Русский",
            flag: "🇷🇺"
        },

        en: {
            name: "English",
            nativeName: "English",
            flag: "🇬🇧"
        },

        es: {
            name: "Spanish",
            nativeName: "Español",
            flag: "🇪🇸"
        },

        fr: {
            name: "French",
            nativeName: "Français",
            flag: "🇫🇷"
        },

        de: {
            name: "German",
            nativeName: "Deutsch",
            flag: "🇩🇪"
        },

        hi: {
            name: "Hindi",
            nativeName: "हिन्दी",
            flag: "🇮🇳"
        },

        ja: {
            name: "Japanese",
            nativeName: "日本語",
            flag: "🇯🇵"
        },

        zh: {
            name: "Chinese",
            nativeName: "中文",
            flag: "🇨🇳"
        },

        uk: {
            name: "Ukrainian",
            nativeName: "Українська",
            flag: "🇺🇦"
        },

        kk: {
            name: "Kazakh",
            nativeName: "Қазақша",
            flag: "🇰🇿"
        },

        ar: {
            name: "Arabic",
            nativeName: "العربية",
            flag: "🇸🇦"
        },

        pt: {
            name: "Portuguese",
            nativeName: "Português",
            flag: "🇧🇷"
        },

        it: {
            name: "Italian",
            nativeName: "Italiano",
            flag: "🇮🇹"
        },

        ko: {
            name: "Korean",
            nativeName: "한국어",
            flag: "🇰🇷"
        },

        tr: {
            name: "Turkish",
            nativeName: "Türkçe",
            flag: "🇹🇷"
        },

        pl: {
            name: "Polish",
            nativeName: "Polski",
            flag: "🇵🇱"
        },

        nl: {
            name: "Dutch",
            nativeName: "Nederlands",
            flag: "🇳🇱"
        },

        vi: {
            name: "Vietnamese",
            nativeName: "Tiếng Việt",
            flag: "🇻🇳"
        },

        id: {
            name: "Indonesian",
            nativeName: "Bahasa Indonesia",
            flag: "🇮🇩"
        }

    };


    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const TEXT = {


        /* =====================================================
           🇷🇺 RUSSIAN
        ===================================================== */

        ru: {

            appName: "FlowChat",
            messenger: "Мессенджер",
            user: "Пользователь",
            username: "username",

            save: "Сохранить",
            cancel: "Отмена",
            close: "Закрыть",
            yes: "Да",
            no: "Нет",
            ok: "ОК",
            back: "Назад",
            search: "Поиск",
            loading: "Загрузка...",
            error: "Ошибка",
            success: "Готово",

            chats: "Чаты",
            newChat: "Новый чат",
            searchPeople: "Поиск людей...",
            settings: "Настройки",

            favorites: "Избранное",
            savedMessages: "Личные сохранённые сообщения",
            savedMessagesDescription:
                "Здесь будут храниться твои личные сохранённые сообщения.",
            startMessage:
                "Напиши сообщение ниже, чтобы начать.",

            systemChat: "Flow System",
            systemChatDescription:
                "Официальные новости FlowChat",
            systemChatInfo:
                "Официальный канал FlowChat.",
            systemChatReadOnly:
                "Только чтение",
            systemWriteDenied:
                "В этом канале запрещено писать.",
                // 🇷🇺
editMessagePrompt:
    "Изменить сообщение?",

            writeMessage: "Написать сообщение...",
            send: "Отправить",
            attachFile: "Прикрепить файл",
            selectedFile: "Выбран файл:",

            profile: "Профиль",
            profileDescription: "Профиль FlowChat",
            name: "Имя",
            usernameLabel: "Username",
            yourName: "Твоё имя",
            usernamePlaceholder: "@username",
            usernameHint:
                "Username используется для поиска тебя в FlowChat.",
            saveChanges: "Сохранить изменения",
            profileSaved: "Профиль сохранён",
            usernameInvalid:
                "Username содержит недопустимые символы.",
            usernameTooShort:
                "Username слишком короткий.",

            logout: "Выйти из аккаунта",
            logoutError: "Не удалось выйти из аккаунта.",

            information: "Информация",

            settingsTitle: "Настройки",
            settingsSubtitle:
                "Настройте FlowChat под себя",

            profileSettingsTitle: "Профиль",
            profileSettingsDesc: "Имя и @username",

            theme: "Тема",
            themeDark: "Тёмная",
            themeLight: "Светлая",

            privacy: "Приватный профиль",
            privacyOff: "Выключен",
            privacyOn: "Включён",

            language: "Язык",

            help: "Помощь и поддержка",
            helpDescription: "Возникли проблемы?",

            chooseLanguage: "Выберите язык",
            languageSearch: "Найти язык...",
            currentLanguage: "Текущий язык",
            languages: "Языки",

            profileLoaded: "Профиль загружен",
            profileLoadError:
                "Не удалось загрузить профиль.",
            messageSendError:
                "Не удалось отправить сообщение.",
            fileSelected: "Файл выбран:",
            noResults: "Ничего не найдено",
            editMessage:
    "Изменить",

deleteMessage:
    "Удалить",

deleteConfirm:
    "Удалить это сообщение?",
    deleteMessageConfirm:
    "Удалить это сообщение?",

edited:
    "Изменено",

messageDeleted:
    "Сообщение удалено"

        },


        /* =====================================================
           🇬🇧 ENGLISH
        ===================================================== */

        en: {

            appName: "FlowChat",
            messenger: "Messenger",
            user: "User",
            username: "username",

            save: "Save",
            cancel: "Cancel",
            close: "Close",
            yes: "Yes",
            no: "No",
            ok: "OK",
            back: "Back",
            search: "Search",
            loading: "Loading...",
            error: "Error",
            success: "Done",

            chats: "Chats",
            newChat: "New chat",
            searchPeople: "Search people...",
            settings: "Settings",

            favorites: "Favorites",
            savedMessages: "Personal saved messages",
            savedMessagesDescription:
                "Your personal saved messages will appear here.",
            startMessage:
                "Write a message below to get started.",

            systemChat: "Flow System",
            systemChatDescription:
                "Official FlowChat news",
            systemChatInfo:
                "Official FlowChat channel.",
            systemChatReadOnly: "Read only",
            systemWriteDenied:
                "You cannot write in this channel.",

            writeMessage: "Write a message...",
            send: "Send",
            attachFile: "Attach file",
            selectedFile: "Selected file:",

            profile: "Profile",
            profileDescription: "FlowChat profile",
            name: "Name",
            usernameLabel: "Username",
            yourName: "Your name",
            usernamePlaceholder: "@username",
            usernameHint:
                "Your username is used so people can find you on FlowChat.",
            saveChanges: "Save changes",
            profileSaved: "Profile saved",
            usernameInvalid:
                "Username contains invalid characters.",
            usernameTooShort:
                "Username is too short.",

            logout: "Log out",
            logoutError: "Failed to log out.",

            information: "Information",

            settingsTitle: "Settings",
            settingsSubtitle:
                "Customize FlowChat",

            profileSettingsTitle: "Profile",
            profileSettingsDesc: "Name and @username",

            theme: "Theme",
            themeDark: "Dark",
            themeLight: "Light",

            privacy: "Private profile",
            privacyOff: "Disabled",
            privacyOn: "Enabled",

            language: "Language",

            help: "Help & support",
            helpDescription: "Having problems?",

            chooseLanguage: "Choose language",
            languageSearch: "Find a language...",
            currentLanguage: "Current language",
            languages: "Languages",
            
            // 🇬🇧
editMessagePrompt:
    "Edit message?",

            profileLoaded: "Profile loaded",
            profileLoadError:
                "Failed to load profile.",
            messageSendError:
                "Failed to send message.",
            fileSelected: "File selected:",
            noResults: "Nothing found",
            editMessage:
    "Edit",

deleteMessage:
    "Delete",

deleteConfirm:
    "Delete this message?",
    
    // 🇬🇧 English
deleteMessageConfirm:
    "Delete this message?",

edited:
    "Edited",

messageDeleted:
    "Message deleted"

        },


        /* =====================================================
           🇪🇸 SPANISH
        ===================================================== */

        es: {

            appName: "FlowChat",
            messenger: "Mensajería",
            user: "Usuario",
            username: "nombre de usuario",

            save: "Guardar",
            cancel: "Cancelar",
            close: "Cerrar",
            yes: "Sí",
            no: "No",
            ok: "Aceptar",
            back: "Atrás",
            search: "Buscar",
            loading: "Cargando...",
            error: "Error",
            success: "Listo",

            chats: "Chats",
            newChat: "Nuevo chat",
            searchPeople: "Buscar personas...",
            settings: "Configuración",

            favorites: "Favoritos",
            savedMessages:
                "Mensajes personales guardados",
            savedMessagesDescription:
                "Aquí aparecerán tus mensajes personales guardados.",
            startMessage:
                "Escribe un mensaje abajo para comenzar.",

            systemChat: "Flow System",
            systemChatDescription:
                "Noticias oficiales de FlowChat",
            systemChatInfo:
                "Canal oficial de FlowChat.",
            systemChatReadOnly: "Solo lectura",
            systemWriteDenied:
                "No puedes escribir en este canal.",

            writeMessage: "Escribe un mensaje...",
            send: "Enviar",
            attachFile: "Adjuntar archivo",
            selectedFile: "Archivo seleccionado:",
            // 🇪🇸
editMessagePrompt:
    "¿Editar mensaje?",

            profile: "Perfil",
            profileDescription: "Perfil de FlowChat",
            name: "Nombre",
            usernameLabel: "Nombre de usuario",
            yourName: "Tu nombre",
            usernamePlaceholder: "@usuario",
            usernameHint:
                "Tu nombre de usuario se utiliza para encontrarte en FlowChat.",
            saveChanges: "Guardar cambios",
            profileSaved: "Perfil guardado",
            usernameInvalid:
                "El nombre de usuario contiene caracteres no válidos.",
            usernameTooShort:
                "El nombre de usuario es demasiado corto.",

            logout: "Cerrar sesión",
            logoutError:
                "No se pudo cerrar sesión.",

            information: "Información",

            settingsTitle: "Configuración",
            settingsSubtitle:
                "Personaliza FlowChat",

            profileSettingsTitle: "Perfil",
            profileSettingsDesc: "Nombre y @usuario",

            theme: "Tema",
            themeDark: "Oscuro",
            themeLight: "Claro",

            privacy: "Perfil privado",
            privacyOff: "Desactivado",
            privacyOn: "Activado",

            language: "Idioma",

            help: "Ayuda y soporte",
            helpDescription: "¿Tienes problemas?",

            chooseLanguage: "Elegir idioma",
            languageSearch: "Buscar idioma...",
            currentLanguage: "Idioma actual",
            languages: "Idiomas",

            profileLoaded: "Perfil cargado",
            profileLoadError:
                "No se pudo cargar el perfil.",
            messageSendError:
                "No se pudo enviar el mensaje.",
            fileSelected: "Archivo seleccionado:",
            noResults: "No se encontró nada",
            editMessage:
    "Editar",

deleteMessage:
    "Eliminar",

deleteConfirm:
    "¿Eliminar este mensaje?",
    
    // 🇪🇸 Español
deleteMessageConfirm:
    "¿Eliminar este mensaje?",

edited:
    "Editado",

messageDeleted:
    "Mensaje eliminado"

        },


        /* =====================================================
           🇫🇷 FRENCH
        ===================================================== */

        fr: {

            appName: "FlowChat",
            messenger: "Messagerie",
            user: "Utilisateur",
            username: "nom d'utilisateur",
            
            // 🇫🇷
editMessagePrompt:
    "Modifier le message ?",

            save: "Enregistrer",
            cancel: "Annuler",
            close: "Fermer",
            yes: "Oui",
            no: "Non",
            ok: "OK",
            back: "Retour",
            search: "Rechercher",
            loading: "Chargement...",
            error: "Erreur",
            success: "Terminé",

            chats: "Discussions",
            newChat: "Nouvelle discussion",
            searchPeople:
                "Rechercher des personnes...",
            settings: "Paramètres",

            favorites: "Favoris",
            savedMessages:
                "Messages personnels enregistrés",
            savedMessagesDescription:
                "Vos messages personnels enregistrés apparaîtront ici.",
            startMessage:
                "Écrivez un message ci-dessous pour commencer.",

            systemChat: "Flow System",
            systemChatDescription:
                "Actualités officielles de FlowChat",
            systemChatInfo:
                "Canal officiel de FlowChat.",
            systemChatReadOnly: "Lecture seule",
            systemWriteDenied:
                "Vous ne pouvez pas écrire dans ce canal.",

            writeMessage:
                "Écrire un message...",
            send: "Envoyer",
            attachFile:
                "Joindre un fichier",
            selectedFile:
                "Fichier sélectionné:",

            profile: "Profil",
            profileDescription:
                "Profil FlowChat",
            name: "Nom",
            usernameLabel:
                "Nom d'utilisateur",
            yourName:
                "Votre nom",
            usernamePlaceholder:
                "@utilisateur",
            usernameHint:
                "Votre nom d'utilisateur permet aux autres de vous trouver sur FlowChat.",
            saveChanges:
                "Enregistrer les modifications",
            profileSaved:
                "Profil enregistré",
            usernameInvalid:
                "Le nom d'utilisateur contient des caractères invalides.",
            usernameTooShort:
                "Le nom d'utilisateur est trop court.",

            logout:
                "Se déconnecter",
            logoutError:
                "Impossible de se déconnecter.",

            information:
                "Informations",

            settingsTitle:
                "Paramètres",
            settingsSubtitle:
                "Personnalisez FlowChat",

            profileSettingsTitle:
                "Profil",
            profileSettingsDesc:
                "Nom et @nom d'utilisateur",

            theme: "Thème",
            themeDark: "Sombre",
            themeLight: "Clair",

            privacy: "Profil privé",
            privacyOff: "Désactivé",
            privacyOn: "Activé",

            language: "Langue",

            help: "Aide et assistance",
            helpDescription:
                "Vous avez un problème ?",

            chooseLanguage:
                "Choisir une langue",
            languageSearch:
                "Rechercher une langue...",
            currentLanguage:
                "Langue actuelle",
            languages:
                "Langues",

            profileLoaded:
                "Profil chargé",
            profileLoadError:
                "Impossible de charger le profil.",
            messageSendError:
                "Impossible d'envoyer le message.",
            fileSelected:
                "Fichier sélectionné:",
            noResults:
                "Aucun résultat",
                editMessage:
    "Modifier",

deleteMessage:
    "Supprimer",

deleteConfirm:
    "Supprimer ce message ?",
    
    // 🇫🇷 Français
deleteMessageConfirm:
    "Supprimer ce message ?",

edited:
    "Modifié",

messageDeleted:
    "Message supprimé"

        },
            /* =====================================================
           🇩🇪 GERMAN
        ===================================================== */

        de: {

            appName: "FlowChat",
            messenger: "Messenger",
            user: "Benutzer",
            username: "Benutzername",

            save: "Speichern",
            cancel: "Abbrechen",
            close: "Schließen",
            yes: "Ja",
            no: "Nein",
            ok: "OK",
            back: "Zurück",
            search: "Suchen",
            loading: "Laden...",
            error: "Fehler",
            success: "Fertig",

            chats: "Chats",
            newChat: "Neuer Chat",
            searchPeople:
                "Personen suchen...",
            settings: "Einstellungen",

            favorites: "Favoriten",

            savedMessages:
                "Persönlich gespeicherte Nachrichten",
                
                // 🇩🇪
editMessagePrompt:
    "Nachricht bearbeiten?",

            savedMessagesDescription:
                "Hier werden deine persönlichen gespeicherten Nachrichten angezeigt.",

            startMessage:
                "Schreibe unten eine Nachricht, um zu beginnen.",

            systemChat: "Flow System",

            systemChatDescription:
                "Offizielle FlowChat-Nachrichten",

            systemChatInfo:
                "Offizieller FlowChat-Kanal.",

            systemChatReadOnly:
                "Nur lesen",

            systemWriteDenied:
                "Du kannst in diesem Kanal nicht schreiben.",

            writeMessage:
                "Nachricht schreiben...",

            send: "Senden",

            attachFile:
                "Datei anhängen",

            selectedFile:
                "Ausgewählte Datei:",

            profile: "Profil",

            profileDescription:
                "FlowChat-Profil",

            name: "Name",

            usernameLabel:
                "Benutzername",

            yourName:
                "Dein Name",

            usernamePlaceholder:
                "@benutzername",

            usernameHint:
                "Dein Benutzername wird verwendet, damit andere dich auf FlowChat finden können.",

            saveChanges:
                "Änderungen speichern",

            profileSaved:
                "Profil gespeichert",

            usernameInvalid:
                "Der Benutzername enthält ungültige Zeichen.",

            usernameTooShort:
                "Der Benutzername ist zu kurz.",

            logout:
                "Abmelden",

            logoutError:
                "Abmelden fehlgeschlagen.",

            information:
                "Informationen",

            settingsTitle:
                "Einstellungen",

            settingsSubtitle:
                "Passe FlowChat an deine Bedürfnisse an",

            profileSettingsTitle:
                "Profil",

            profileSettingsDesc:
                "Name und @Benutzername",

            theme:
                "Design",

            themeDark:
                "Dunkel",

            themeLight:
                "Hell",

            privacy:
                "Privates Profil",

            privacyOff:
                "Deaktiviert",

            privacyOn:
                "Aktiviert",

            language:
                "Sprache",

            help:
                "Hilfe & Support",

            helpDescription:
                "Hast du Probleme?",

            chooseLanguage:
                "Sprache auswählen",

            languageSearch:
                "Sprache suchen...",

            currentLanguage:
                "Aktuelle Sprache",

            languages:
                "Sprachen",

            profileLoaded:
                "Profil geladen",

            profileLoadError:
                "Profil konnte nicht geladen werden",

            messageSendError:
                "Nachricht konnte nicht gesendet werden",

            fileSelected:
                "Datei ausgewählt:",

            noResults:
                "Keine Ergebnisse gefunden",
                editMessage:
    "Bearbeiten",

deleteMessage:
    "Löschen",

deleteConfirm:
    "Diese Nachricht löschen?",
    
    // 🇩🇪 Deutsch
deleteMessageConfirm:
    "Diese Nachricht löschen?",

edited:
    "Bearbeitet",

messageDeleted:
    "Nachricht gelöscht"

        },


        /* =====================================================
           🇮🇳 HINDI
        ===================================================== */

        hi: {

            appName: "FlowChat",
            messenger: "मैसेंजर",
            user: "उपयोगकर्ता",
            username: "उपयोगकर्ता नाम",
            
            // 🇮🇳
editMessagePrompt:
    "क्या संदेश संपादित करना है?",

            save: "सहेजें",
            cancel: "रद्द करें",
            close: "बंद करें",
            yes: "हाँ",
            no: "नहीं",
            ok: "ठीक है",
            back: "वापस",
            search: "खोजें",
            loading: "लोड हो रहा है...",
            error: "त्रुटि",
            success: "पूरा हुआ",

            chats: "चैट",
            newChat: "नई चैट",
            searchPeople:
                "लोगों को खोजें...",
            settings: "सेटिंग्स",

            favorites: "पसंदीदा",

            savedMessages:
                "व्यक्तिगत सहेजे गए संदेश",

            savedMessagesDescription:
                "आपके व्यक्तिगत सहेजे गए संदेश यहाँ दिखाई देंगे।",

            startMessage:
                "शुरू करने के लिए नीचे एक संदेश लिखें।",

            systemChat: "Flow System",

            systemChatDescription:
                "आधिकारिक FlowChat समाचार",

            systemChatInfo:
                "आधिकारिक FlowChat चैनल।",

            systemChatReadOnly:
                "केवल पढ़ने के लिए",

            systemWriteDenied:
                "आप इस चैनल में संदेश नहीं भेज सकते।",

            writeMessage:
                "संदेश लिखें...",

            send: "भेजें",

            attachFile:
                "फ़ाइल संलग्न करें",

            selectedFile:
                "चयनित फ़ाइल:",

            profile: "प्रोफ़ाइल",

            profileDescription:
                "FlowChat प्रोफ़ाइल",

            name: "नाम",

            usernameLabel:
                "उपयोगकर्ता नाम",

            yourName:
                "आपका नाम",

            usernamePlaceholder:
                "@username",

            usernameHint:
                "आपका उपयोगकर्ता नाम लोगों को FlowChat पर आपको खोजने में मदद करता है।",

            saveChanges:
                "परिवर्तन सहेजें",

            profileSaved:
                "प्रोफ़ाइल सहेजी गई",

            usernameInvalid:
                "उपयोगकर्ता नाम में अमान्य वर्ण हैं।",

            usernameTooShort:
                "उपयोगकर्ता नाम बहुत छोटा है।",

            logout:
                "लॉग आउट करें",

            logoutError:
                "लॉग आउट नहीं हो सका।",

            information:
                "जानकारी",

            settingsTitle:
                "सेटिंग्स",

            settingsSubtitle:
                "FlowChat को अपनी पसंद के अनुसार सेट करें",

            profileSettingsTitle:
                "प्रोफ़ाइल",

            profileSettingsDesc:
                "नाम और @username",

            theme:
                "थीम",

            themeDark:
                "डार्क",

            themeLight:
                "लाइट",

            privacy:
                "निजी प्रोफ़ाइल",

            privacyOff:
                "बंद",

            privacyOn:
                "चालू",

            language:
                "भाषा",

            help:
                "सहायता और समर्थन",

            helpDescription:
                "क्या आपको कोई समस्या है?",

            chooseLanguage:
                "भाषा चुनें",

            languageSearch:
                "भाषा खोजें...",

            currentLanguage:
                "वर्तमान भाषा",

            languages:
                "भाषाएँ",

            profileLoaded:
                "प्रोफ़ाइल लोड हो गई",

            profileLoadError:
                "प्रोफ़ाइल लोड नहीं हो सकी",

            messageSendError:
                "संदेश नहीं भेजा जा सका",

            fileSelected:
                "फ़ाइल चुनी गई:",

            noResults:
                "कुछ नहीं मिला",
                
                editMessage:
    "संपादित करें",

deleteMessage:
    "हटाएँ",

deleteConfirm:
    "क्या यह संदेश हटाना है?",
    // 🇮🇳 हिन्दी
deleteMessageConfirm:
    "क्या यह संदेश हटाना है?",

edited:
    "संपादित",

messageDeleted:
    "संदेश हटा दिया गया"

        },


        /* =====================================================
           🇯🇵 JAPANESE
        ===================================================== */

        ja: {

            appName: "FlowChat",
            messenger: "メッセンジャー",
            user: "ユーザー",
            username: "ユーザー名",
            
            // 🇯🇵
editMessagePrompt:
    "メッセージを編集しますか？",

            save: "保存",
            cancel: "キャンセル",
            close: "閉じる",
            yes: "はい",
            no: "いいえ",
            ok: "OK",
            back: "戻る",
            search: "検索",
            loading: "読み込み中...",
            error: "エラー",
            success: "完了",

            chats: "チャット",
            newChat: "新しいチャット",
            searchPeople:
                "ユーザーを検索...",
            settings: "設定",

            favorites: "お気に入り",

            savedMessages:
                "個人保存メッセージ",

            savedMessagesDescription:
                "保存した個人メッセージがここに表示されます。",

            startMessage:
                "開始するには下にメッセージを入力してください。",

            systemChat: "Flow System",

            systemChatDescription:
                "FlowChat公式ニュース",

            systemChatInfo:
                "FlowChat公式チャンネル。",

            systemChatReadOnly:
                "読み取り専用",

            systemWriteDenied:
                "このチャンネルにはメッセージを送信できません。",

            writeMessage:
                "メッセージを入力...",

            send: "送信",

            attachFile:
                "ファイルを添付",

            selectedFile:
                "選択したファイル:",

            profile: "プロフィール",

            profileDescription:
                "FlowChatプロフィール",

            name: "名前",

            usernameLabel:
                "ユーザー名",

            yourName:
                "あなたの名前",

            usernamePlaceholder:
                "@username",

            usernameHint:
                "ユーザー名を使ってFlowChatであなたを検索できます。",

            saveChanges:
                "変更を保存",

            profileSaved:
                "プロフィールを保存しました",

            usernameInvalid:
                "ユーザー名に使用できない文字が含まれています。",

            usernameTooShort:
                "ユーザー名が短すぎます。",

            logout:
                "ログアウト",

            logoutError:
                "ログアウトできませんでした。",

            information:
                "情報",

            settingsTitle:
                "設定",

            settingsSubtitle:
                "FlowChatを自分好みにカスタマイズ",

            profileSettingsTitle:
                "プロフィール",

            profileSettingsDesc:
                "名前と@username",

            theme:
                "テーマ",

            themeDark:
                "ダーク",

            themeLight:
                "ライト",

            privacy:
                "非公開プロフィール",

            privacyOff:
                "無効",

            privacyOn:
                "有効",

            language:
                "言語",

            help:
                "ヘルプとサポート",

            helpDescription:
                "問題がありますか？",

            chooseLanguage:
                "言語を選択",

            languageSearch:
                "言語を検索...",

            currentLanguage:
                "現在の言語",

            languages:
                "言語",

            profileLoaded:
                "プロフィールを読み込みました",

            profileLoadError:
                "プロフィールを読み込めませんでした",

            messageSendError:
                "メッセージを送信できませんでした",

            fileSelected:
                "ファイルを選択しました:",

            noResults:
                "見つかりませんでした",
                
                // 🇯🇵 日本語
deleteMessageConfirm:
    "このメッセージを削除しますか？",
                
                editMessage:
    "編集",

deleteMessage:
    "削除",

deleteConfirm:
    "このメッセージを削除しますか？",

edited:
    "編集済み",

messageDeleted:
    "メッセージを削除しました"

        },


        /* =====================================================
           🇨🇳 CHINESE
        ===================================================== */

        zh: {

            appName: "FlowChat",
            messenger: "即时通讯",
            user: "用户",
            username: "用户名",

// 🇨🇳
editMessagePrompt:
    "要编辑这条消息吗？",
    
            save: "保存",
            cancel: "取消",
            close: "关闭",
            yes: "是",
            no: "否",
            ok: "确定",
            back: "返回",
            search: "搜索",
            loading: "加载中...",
            error: "错误",
            success: "完成",

            chats: "聊天",
            newChat: "新聊天",
            searchPeople:
                "搜索用户...",
            settings: "设置",

            favorites: "收藏",

            savedMessages:
                "个人保存的消息",

            savedMessagesDescription:
                "你保存的个人消息会显示在这里。",

            startMessage:
                "在下方输入消息即可开始。",

            systemChat: "Flow System",

            systemChatDescription:
                "FlowChat官方消息",

            systemChatInfo:
                "FlowChat官方频道。",

            systemChatReadOnly:
                "只读",

            systemWriteDenied:
                "你无法在此频道发送消息。",

            writeMessage:
                "输入消息...",

            send: "发送",

            attachFile:
                "附加文件",

            selectedFile:
                "已选择文件:",

            profile: "个人资料",

            profileDescription:
                "FlowChat个人资料",

            name: "姓名",

            usernameLabel:
                "用户名",

            yourName:
                "你的姓名",

            usernamePlaceholder:
                "@用户名",

            usernameHint:
                "其他人可以通过你的用户名在FlowChat上找到你。",

            saveChanges:
                "保存更改",

            profileSaved:
                "个人资料已保存",

            usernameInvalid:
                "用户名包含无效字符。",

            usernameTooShort:
                "用户名太短。",

            logout:
                "退出登录",

            logoutError:
                "退出登录失败。",

            information:
                "信息",

            settingsTitle:
                "设置",

            settingsSubtitle:
                "根据你的喜好自定义FlowChat",

            profileSettingsTitle:
                "个人资料",

            profileSettingsDesc:
                "姓名和@用户名",

            theme:
                "主题",

            themeDark:
                "深色",

            themeLight:
                "浅色",

            privacy:
                "私人资料",
                
                // 🇨🇳 中文
deleteMessageConfirm:
    "确定要删除这条消息吗？",

            privacyOff:
                "已关闭",

            privacyOn:
                "已开启",

            language:
                "语言",

            help:
                "帮助与支持",

            helpDescription:
                "遇到问题了吗？",

            chooseLanguage:
                "选择语言",

            languageSearch:
                "搜索语言...",

            currentLanguage:
                "当前语言",

            languages:
                "语言",

            profileLoaded:
                "个人资料已加载",

            profileLoadError:
                "无法加载个人资料",

            messageSendError:
                "无法发送消息",

            fileSelected:
                "已选择文件:",

            noResults:
                "未找到任何结果",
                
                editMessage:
    "编辑",

deleteMessage:
    "删除",

deleteConfirm:
    "确定要删除这条消息吗？",

edited:
    "已编辑",

messageDeleted:
    "消息已删除"

        },


        /* =====================================================
           🇺🇦 UKRAINIAN
        ===================================================== */

        uk: {

            appName: "FlowChat",
            messenger: "Месенджер",
            user: "Користувач",
            username: "Ім'я користувача",
            
            // 🇺🇦
editMessagePrompt:
    "Редагувати повідомлення?",

            save: "Зберегти",
            cancel: "Скасувати",
            close: "Закрити",
            yes: "Так",
            no: "Ні",
            ok: "OK",
            back: "Назад",
            search: "Пошук",
            loading: "Завантаження...",
            error: "Помилка",
            success: "Готово",

            chats: "Чати",
            newChat: "Новий чат",
            searchPeople:
                "Пошук людей...",
            settings: "Налаштування",

            favorites: "Обране",

            savedMessages:
                "Особисті збережені повідомлення",

            savedMessagesDescription:
                "Тут будуть зберігатися твої особисті повідомлення.",

            startMessage:
                "Напиши повідомлення нижче, щоб почати.",

            systemChat: "Flow System",

            systemChatDescription:
                "Офіційні новини FlowChat",

            systemChatInfo:
                "Офіційний канал FlowChat.",

            systemChatReadOnly:
                "Лише читання",

            systemWriteDenied:
                "У цьому каналі не можна писати.",

            writeMessage:
                "Написати повідомлення...",

            send: "Надіслати",

            attachFile:
                "Прикріпити файл",

            selectedFile:
                "Вибраний файл:",

            profile: "Профіль",

            profileDescription:
                "Профіль FlowChat",

            name: "Ім'я",

            usernameLabel:
                "Ім'я користувача",

            yourName:
                "Твоє ім'я",

            usernamePlaceholder:
                "@користувач",

            usernameHint:
                "Ім'я користувача використовується для пошуку тебе у FlowChat.",

            saveChanges:
                "Зберегти зміни",

            profileSaved:
                "Профіль збережено",

            usernameInvalid:
                "Ім'я користувача містить недопустимі символи.",

            usernameTooShort:
                "Ім'я користувача занадто коротке.",

            logout:
                "Вийти з акаунта",

            logoutError:
                "Не вдалося вийти з акаунта.",

            information:
                "Інформація",

            settingsTitle:
                "Налаштування",

            settingsSubtitle:
                "Налаштуй FlowChat під себе",

            profileSettingsTitle:
                "Профіль",

            profileSettingsDesc:
                "Ім'я та @користувач",

            theme:
                "Тема",

            themeDark:
                "Темна",

            themeLight:
                "Світла",

            privacy:
                "Приватний профіль",

            privacyOff:
                "Вимкнено",

            privacyOn:
                "Увімкнено",

            language:
                "Мова",

            help:
                "Допомога та підтримка",

            helpDescription:
                "Виникли проблеми?",

            chooseLanguage:
                "Виберіть мову",

            languageSearch:
                "Знайти мову...",

            currentLanguage:
                "Поточна мова",

            languages:
                "Мови",

            profileLoaded:
                "Профіль завантажено",

            profileLoadError:
                "Не вдалося завантажити профіль",

            messageSendError:
                "Не вдалося надіслати повідомлення",

            fileSelected:
                "Файл вибрано:",
                
                // 🇺🇦 Українська
deleteMessageConfirm:
    "Видалити це повідомлення?",

            noResults:
                "Нічого не знайдено",
                
                editMessage:
    "Змінити",

deleteMessage:
    "Видалити",

deleteConfirm:
    "Видалити це повідомлення?",

edited:
    "Змінено",

messageDeleted:
    "Повідомлення видалено"

        },
    /* =====================================================
           🇰🇿 KAZAKH
        ===================================================== */

        kk: {

            appName: "FlowChat",
            messenger: "Мессенджер",
            user: "Пайдаланушы",
            username: "Пайдаланушы аты",
            
            // 🇰🇿
editMessagePrompt:
    "Хабарламаны өзгерту керек пе?",

            save: "Сақтау",
            cancel: "Бас тарту",
            close: "Жабу",
            yes: "Иә",
            no: "Жоқ",
            ok: "OK",
            back: "Артқа",
            search: "Іздеу",
            loading: "Жүктелуде...",
            error: "Қате",
            success: "Дайын",

            chats: "Чаттар",
            newChat: "Жаңа чат",
            searchPeople:
                "Адамдарды іздеу...",
            settings: "Баптаулар",

            favorites: "Таңдаулылар",

            savedMessages:
                "Жеке сақталған хабарламалар",

            savedMessagesDescription:
                "Жеке сақталған хабарламаларыңыз осында көрсетіледі.",

            startMessage:
                "Бастау үшін төменге хабарлама жазыңыз.",

            systemChat: "Flow System",

            systemChatDescription:
                "FlowChat ресми жаңалықтары",

            systemChatInfo:
                "FlowChat ресми арнасы.",

            systemChatReadOnly:
                "Тек оқу",

            systemWriteDenied:
                "Бұл арнада хабарлама жібере алмайсыз.",

            writeMessage:
                "Хабарлама жазу...",

            send: "Жіберу",

            attachFile:
                "Файл тіркеу",

            selectedFile:
                "Таңдалған файл:",

            profile: "Профиль",
            
            // 🇰🇿 Қазақша
deleteMessageConfirm:
    "Бұл хабарламаны өшіру керек пе?",

            profileDescription:
                "FlowChat профилі",

            name: "Аты",

            usernameLabel:
                "Пайдаланушы аты",

            yourName:
                "Сіздің атыңыз",

            usernamePlaceholder:
                "@пайдаланушы",

            usernameHint:
                "Пайдаланушы атыңыз басқа адамдарға сізді FlowChat-та табуға көмектеседі.",

            saveChanges:
                "Өзгерістерді сақтау",

            profileSaved:
                "Профиль сақталды",

            usernameInvalid:
                "Пайдаланушы атында рұқсат етілмеген таңбалар бар.",

            usernameTooShort:
                "Пайдаланушы аты тым қысқа.",

            logout:
                "Аккаунттан шығу",

            logoutError:
                "Аккаунттан шығу мүмкін болмады.",

            information:
                "Ақпарат",

            settingsTitle:
                "Баптаулар",

            settingsSubtitle:
                "FlowChat-ты өзіңізге ыңғайлаңыз",

            profileSettingsTitle:
                "Профиль",

            profileSettingsDesc:
                "Аты және @пайдаланушы",

            theme:
                "Тақырып",

            themeDark:
                "Қараңғы",

            themeLight:
                "Жарық",

            privacy:
                "Жеке профиль",

            privacyOff:
                "Өшірулі",

            privacyOn:
                "Қосулы",

            language:
                "Тіл",

            help:
                "Көмек және қолдау",

            helpDescription:
                "Мәселе туындады ма?",

            chooseLanguage:
                "Тілді таңдаңыз",

            languageSearch:
                "Тілді іздеу...",

            currentLanguage:
                "Қазіргі тіл",

            languages:
                "Тілдер",

            profileLoaded:
                "Профиль жүктелді",

            profileLoadError:
                "Профильді жүктеу мүмкін болмады",

            messageSendError:
                "Хабарламаны жіберу мүмкін болмады",

            fileSelected:
                "Файл таңдалды:",

            noResults:
                "Ештеңе табылмады",
                
                editMessage:
    "Өзгерту",

deleteMessage:
    "Жою",

deleteConfirm:
    "Бұл хабарламаны жою керек пе?",

edited:
    "Өзгертілді",

messageDeleted:
    "Хабарлама жойылды"

        },


        /* =====================================================
           🇸🇦 ARABIC
        ===================================================== */

        ar: {

            appName: "FlowChat",
            messenger: "الرسائل",
            user: "مستخدم",
            username: "اسم المستخدم",
            
            // 🇸🇦
editMessagePrompt:
    "هل تريد تعديل الرسالة؟",

            save: "حفظ",
            cancel: "إلغاء",
            close: "إغلاق",
            yes: "نعم",
            no: "لا",
            ok: "حسنًا",
            back: "رجوع",
            search: "بحث",
            loading: "جارٍ التحميل...",
            error: "خطأ",
            success: "تم",

            chats: "المحادثات",
            newChat: "محادثة جديدة",
            searchPeople:
                "البحث عن أشخاص...",
            settings: "الإعدادات",

            favorites: "المفضلة",

            savedMessages:
                "الرسائل المحفوظة الشخصية",

            savedMessagesDescription:
                "ستظهر رسائلك الشخصية المحفوظة هنا.",

            startMessage:
                "اكتب رسالة أدناه للبدء.",

            systemChat: "Flow System",

            systemChatDescription:
                "أخبار FlowChat الرسمية",

            systemChatInfo:
                "القناة الرسمية لـ FlowChat.",

            systemChatReadOnly:
                "للقراءة فقط",

            systemWriteDenied:
                "لا يمكنك الكتابة في هذه القناة.",

            writeMessage:
                "اكتب رسالة...",

            send: "إرسال",

            attachFile:
                "إرفاق ملف",

            selectedFile:
                "الملف المحدد:",

            profile: "الملف الشخصي",

            profileDescription:
                "ملف FlowChat الشخصي",

            name: "الاسم",

            usernameLabel:
                "اسم المستخدم",

            yourName:
                "اسمك",

            usernamePlaceholder:
                "@username",

            usernameHint:
                "يُستخدم اسم المستخدم الخاص بك حتى يتمكن الآخرون من العثور عليك في FlowChat.",

            saveChanges:
                "حفظ التغييرات",

            profileSaved:
                "تم حفظ الملف الشخصي",

            usernameInvalid:
                "يحتوي اسم المستخدم على أحرف غير مسموح بها.",

            usernameTooShort:
                "اسم المستخدم قصير جدًا.",

            logout:
                "تسجيل الخروج",

            logoutError:
                "تعذر تسجيل الخروج.",

            information:
                "المعلومات",

            settingsTitle:
                "الإعدادات",

            settingsSubtitle:
                "خصص FlowChat حسب رغبتك",

            profileSettingsTitle:
                "الملف الشخصي",

            profileSettingsDesc:
                "الاسم و@اسم المستخدم",

            theme:
                "المظهر",

            themeDark:
                "داكن",

            themeLight:
                "فاتح",

            privacy:
                "ملف شخصي خاص",

            privacyOff:
                "معطل",
                
                // 🇸🇦 العربية
deleteMessageConfirm:
    "هل تريد حذف هذه الرسالة؟",

            privacyOn:
                "مفعل",

            language:
                "اللغة",

            help:
                "المساعدة والدعم",

            helpDescription:
                "هل تواجه مشكلة؟",

            chooseLanguage:
                "اختر اللغة",

            languageSearch:
                "البحث عن لغة...",

            currentLanguage:
                "اللغة الحالية",

            languages:
                "اللغات",

            profileLoaded:
                "تم تحميل الملف الشخصي",

            profileLoadError:
                "تعذر تحميل الملف الشخصي",

            messageSendError:
                "تعذر إرسال الرسالة",

            fileSelected:
                "تم تحديد الملف:",

            noResults:
                "لم يتم العثور على شيء",
                editMessage:
    "تعديل",

deleteMessage:
    "حذف",

deleteConfirm:
    "هل تريد حذف هذه الرسالة؟",

edited:
    "تم التعديل",

messageDeleted:
    "تم حذف الرسالة"

        },


        /* =====================================================
           🇵🇹 PORTUGUESE
        ===================================================== */

        pt: {

            appName: "FlowChat",
            messenger: "Mensageiro",
            user: "Usuário",
            username: "Nome de usuário",

            save: "Salvar",
            cancel: "Cancelar",
            close: "Fechar",
            yes: "Sim",
            no: "Não",
            ok: "OK",
            back: "Voltar",
            search: "Pesquisar",
            loading: "Carregando...",
            error: "Erro",
            success: "Concluído",

            chats: "Conversas",
            newChat: "Nova conversa",
            searchPeople:
                "Pesquisar pessoas...",
            settings: "Configurações",

            favorites: "Favoritos",

            savedMessages:
                "Mensagens pessoais salvas",

            savedMessagesDescription:
                "Suas mensagens pessoais salvas aparecerão aqui.",

            startMessage:
                "Escreva uma mensagem abaixo para começar.",

            systemChat: "Flow System",

            systemChatDescription:
                "Notícias oficiais do FlowChat",

            systemChatInfo:
                "Canal oficial do FlowChat.",

            systemChatReadOnly:
                "Somente leitura",

            systemWriteDenied:
                "Você não pode escrever neste canal.",

            writeMessage:
                "Escreva uma mensagem...",

            send: "Enviar",

            attachFile:
                "Anexar arquivo",

            selectedFile:
                "Arquivo selecionado:",

            profile: "Perfil",

            profileDescription:
                "Perfil do FlowChat",

            name: "Nome",

            usernameLabel:
                "Nome de usuário",

            yourName:
                "Seu nome",

            usernamePlaceholder:
                "@usuario",

            usernameHint:
                "Seu nome de usuário permite que outras pessoas encontrem você no FlowChat.",

            saveChanges:
                "Salvar alterações",

            profileSaved:
                "Perfil salvo",

            usernameInvalid:
                "O nome de usuário contém caracteres inválidos.",

            usernameTooShort:
                "O nome de usuário é muito curto.",

            logout:
                "Sair",

            logoutError:
                "Não foi possível sair.",

            information:
                "Informações",

            settingsTitle:
                "Configurações",
                
                // 🇧🇷 Português
deleteMessageConfirm:
    "Excluir esta mensagem?",

            settingsSubtitle:
                "Personalize o FlowChat",

            profileSettingsTitle:
                "Perfil",
                
                // 🇧🇷
editMessagePrompt:
    "Editar mensagem?",

            profileSettingsDesc:
                "Nome e @usuário",

            theme:
                "Tema",

            themeDark:
                "Escuro",

            themeLight:
                "Claro",

            privacy:
                "Perfil privado",

            privacyOff:
                "Desativado",

            privacyOn:
                "Ativado",

            language:
                "Idioma",

            help:
                "Ajuda e suporte",

            helpDescription:
                "Está com problemas?",

            chooseLanguage:
                "Escolher idioma",

            languageSearch:
                "Pesquisar idioma...",

            currentLanguage:
                "Idioma atual",

            languages:
                "Idiomas",

            profileLoaded:
                "Perfil carregado",

            profileLoadError:
                "Não foi possível carregar o perfil",

            messageSendError:
                "Não foi possível enviar a mensagem",

            fileSelected:
                "Arquivo selecionado:",

            noResults:
                "Nenhum resultado encontrado",
                
                editMessage:
    "Editar",

deleteMessage:
    "Excluir",

deleteConfirm:
    "Excluir esta mensagem?",

edited:
    "Editado",

messageDeleted:
    "Mensagem excluída"

        }


    };
/* =====================================================
   GLOBAL ACCESS
===================================================== */

/* =====================================================
   FLOWCHAT — LANGUAGE SYSTEM
===================================================== */

const LANGUAGE_CODES =
    Object.keys(LANGUAGES).filter(
        code => TEXT[code]
    );

/* =====================================================
   CURRENT LANGUAGE
===================================================== */

function getCurrentLanguage() {

    const saved =
        localStorage.getItem(
            "flowchat_language"
        );

    if (
        saved &&
        TEXT[saved]
    ) {
        return saved;
    }

    return TEXT.ru
        ? "ru"
        : LANGUAGE_CODES[0];

}


/* =====================================================
   SET LANGUAGE
===================================================== */

function setLanguage(language) {

    if (
        !language ||
        !TEXT[language]
    ) {

        console.warn(
            "FlowChat: язык не найден:",
            language
        );

        return false;
    }


    localStorage.setItem(
        "flowchat_language",
        language
    );


    updateLanguageUI();


    window.dispatchEvent(
        new CustomEvent(
            "flowchatLanguageChanged",
            {
                detail: {
                    language: language
                }
            }
        )
    );


    return true;

}


/* =====================================================
   GET LANGUAGE TEXT
===================================================== */

function getLanguageText(
    key,
    fallback = ""
) {

    const language =
        getCurrentLanguage();


    if (
        TEXT[language] &&
        TEXT[language][key] !== undefined
    ) {

        return TEXT[language][key];

    }


    if (
        TEXT.ru &&
        TEXT.ru[key] !== undefined
    ) {

        return TEXT.ru[key];

    }


    return fallback;

}


/* =====================================================
   UPDATE LANGUAGE UI
===================================================== */

/* =====================================================
   LANGUAGE UI
===================================================== */

function updateLanguageUI() {

    const language =
        getCurrentLanguage();

    /*
       Берём русский как основу.

       Затем поверх него накладываем
       перевод выбранного языка.

       Благодаря этому даже если в каком-то
       языке забыли один ключ, интерфейс
       НЕ ломается.
    */

    const text = {
        ...(TEXT.ru || {}),
        ...(TEXT[language] || {})
    };


    const info =
        LANGUAGES?.[language] || {};


    /* =================================================
       FLAG
    ================================================= */

    const languageFlag =
        document.getElementById(
            "languageFlag"
        );

    if (languageFlag) {

        languageFlag.textContent =
            info.flag ||
            text.flag ||
            "🌐";

    }


    /* =================================================
       LANGUAGE TITLE
    ================================================= */

    const languageTitle =
        document.getElementById(
            "languageTitle"
        );

    if (languageTitle) {

        languageTitle.textContent =
            text.language ||
            "Language";

    }


    /* =================================================
       SELECTED LANGUAGE
    ================================================= */

    const languageDesc =
        document.getElementById(
            "languageDesc"
        );

    if (languageDesc) {

        languageDesc.textContent =
            info.nativeName ||
            info.name ||
            language;

    }


    /* =================================================
       TEXT
    ================================================= */

    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset.i18n;


                if (
                    text[key] !== undefined
                ) {

                    element.textContent =
                        text[key];

                }

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
                    text[key] !== undefined
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
                    text[key] !== undefined
                ) {

                    element.title =
                        text[key];

                }

            }
        );


    /* =================================================
       ARIA LABEL
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
                    text[key] !== undefined
                ) {

                    element.setAttribute(
                        "aria-label",
                        text[key]
                    );

                }

            }
        );


    /* =================================================
       HTML LANG
    ================================================= */

    document.documentElement.lang =
        language;


    /* =================================================
       DEBUG
    ================================================= */

    console.log(
        "🌍 FlowChat UI переведён:",
        language
    );

}

/* =====================================================
   TRANSLATE ELEMENT
===================================================== */

function translateElement(element) {

    if (!element) {
        return;
    }


    const key =
        element.dataset.i18n;

    if (!key) {
        return;
    }


    element.textContent =
        getLanguageText(
            key,
            element.textContent
        );

}


/* =====================================================
   TRANSLATE PAGE
===================================================== */

function translatePage() {

    updateLanguageUI();

}


/* =====================================================
   LANGUAGE CHANGED
===================================================== */

window.addEventListener(
    "flowchatLanguageChanged",
    function () {

        translatePage();

    }
);


/* =====================================================
   GLOBAL ACCESS
===================================================== */

window.TEXT =
    TEXT;

window.LANGUAGES =
    LANGUAGES;

window.LANGUAGE_CODES =
    LANGUAGE_CODES;

window.flowChatLanguages = {

    getCurrentLanguage:
        getCurrentLanguage,

    setLanguage:
        setLanguage,

    updateLanguageUI:
        updateLanguageUI,

    getLanguageText:
        getLanguageText,

    translateElement:
        translateElement,

    translatePage:
        translatePage,

    LANGUAGE_CODES:
        LANGUAGE_CODES

};


console.log(
    "🌍 FlowChat Language System загружен:",
    LANGUAGE_CODES
);

/* =====================================================
   INITIALIZATION
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            updateLanguageUI();

        }
    );

} else {

    updateLanguageUI();

}


/* =====================================================
   GLOBAL ACCESS
===================================================== */

window.TEXT =
    TEXT;

window.LANGUAGES =
    LANGUAGES;

window.LANGUAGE_CODES =
    LANGUAGE_CODES;


window.flowChatLanguages = {

    getCurrentLanguage:
        getCurrentLanguage,

    setLanguage:
        setLanguage,

    updateLanguageUI:
        updateLanguageUI,

    getLanguageText:
        getLanguageText,

    translateElement:
        translateElement,

    translatePage:
        translatePage,

    LANGUAGE_CODES:
        LANGUAGE_CODES

};


console.log(
    "🌍 FlowChat Language System загружен:",
    LANGUAGE_CODES
);


/* =====================================================
   CLOSE FLOWCHAT LANGUAGE SYSTEM
===================================================== */

})();