/* =====================================================
   FLOWCHAT — CRYPTO
   AES-256-GCM
===================================================== */

const FLOWCHAT_CRYPTO_VERSION = 1;
const FLOWCHAT_CRYPTO_ALGORITHM = "AES-GCM";
const FLOWCHAT_CRYPTO_KEY_LENGTH = 256;


/* =====================================================
   TEXT → BYTES
===================================================== */

function textToBytes(text) {

    return new TextEncoder().encode(
        text
    );

}


/* =====================================================
   BYTES → TEXT
===================================================== */

function bytesToText(bytes) {

    return new TextDecoder().decode(
        bytes
    );

}


/* =====================================================
   ARRAY BUFFER → BASE64
===================================================== */

function bufferToBase64(buffer) {

    const bytes =
        new Uint8Array(buffer);

    let binary = "";

    for (
        let i = 0;
        i < bytes.length;
        i++
    ) {

        binary +=
            String.fromCharCode(
                bytes[i]
            );

    }

    return btoa(binary);

}


/* =====================================================
   BASE64 → ARRAY BUFFER
===================================================== */

function base64ToBuffer(base64) {

    const binary =
        atob(base64);

    const bytes =
        new Uint8Array(
            binary.length
        );

    for (
        let i = 0;
        i < binary.length;
        i++
    ) {

        bytes[i] =
            binary.charCodeAt(i);

    }

    return bytes.buffer;

}


/* =====================================================
   RANDOM BYTES
===================================================== */

function randomBytes(length) {

    return crypto.getRandomValues(
        new Uint8Array(length)
    );

}


/* =====================================================
   GENERATE AES KEY
===================================================== */

async function generateChatKey() {

    return await crypto.subtle.generateKey(

        {
            name:
                FLOWCHAT_CRYPTO_ALGORITHM,

            length:
                FLOWCHAT_CRYPTO_KEY_LENGTH
        },

        true,

        [
            "encrypt",
            "decrypt"
        ]

    );

}


/* =====================================================
   EXPORT AES KEY
===================================================== */

async function exportChatKey(key) {

    const rawKey =
        await crypto.subtle.exportKey(
            "raw",
            key
        );

    return bufferToBase64(
        rawKey
    );

}


/* =====================================================
   IMPORT AES KEY
===================================================== */

async function importChatKey(base64Key) {

    const rawKey =
        base64ToBuffer(
            base64Key
        );

    return await crypto.subtle.importKey(

        "raw",

        rawKey,

        {
            name:
                FLOWCHAT_CRYPTO_ALGORITHM
        },

        true,

        [
            "encrypt",
            "decrypt"
        ]

    );

}


/* =====================================================
   ENCRYPT TEXT
===================================================== */

async function encryptText(
    text,
    key
) {

    if (
        !text
    ) {

        throw new Error(
            "Нельзя зашифровать пустой текст"
        );

    }


    if (
        !key
    ) {

        throw new Error(
            "Ключ шифрования отсутствует"
        );

    }


    const iv =
        randomBytes(12);


    const encrypted =
        await crypto.subtle.encrypt(

            {
                name:
                    FLOWCHAT_CRYPTO_ALGORITHM,

                iv:
                    iv
            },

            key,

            textToBytes(
                text
            )

        );


    return {

        version:
            FLOWCHAT_CRYPTO_VERSION,

        algorithm:
            FLOWCHAT_CRYPTO_ALGORITHM,

        encrypted:
            bufferToBase64(
                encrypted
            ),

        iv:
            bufferToBase64(
                iv
            )

    };

}


/* =====================================================
   DECRYPT TEXT
===================================================== */

async function decryptText(
    data,
    key
) {

    if (
        !data ||
        !data.encrypted ||
        !data.iv
    ) {

        throw new Error(
            "Некорректные данные шифрования"
        );

    }


    if (
        !key
    ) {

        throw new Error(
            "Ключ шифрования отсутствует"
        );

    }


    const iv =
        new Uint8Array(
            base64ToBuffer(
                data.iv
            )
        );


    const encrypted =
        base64ToBuffer(
            data.encrypted
        );


    try {

        const decrypted =
            await crypto.subtle.decrypt(

                {
                    name:
                        FLOWCHAT_CRYPTO_ALGORITHM,

                    iv:
                        iv
                },

                key,

                encrypted

            );


        return bytesToText(
            new Uint8Array(
                decrypted
            )
        );

    } catch (error) {

        console.error(
            "❌ Ошибка расшифровки:",
            error
        );

        throw new Error(
            "Не удалось расшифровать сообщение"
        );

    }

}


/* =====================================================
   CREATE RANDOM CHAT KEY
===================================================== */

async function createRandomChatKey() {

    const key =
        await generateChatKey();


    const exported =
        await exportChatKey(
            key
        );


    return {

        key,

        keyString:
            exported

    };

}


/* =====================================================
   SAVE KEY LOCALLY
===================================================== */

function saveChatKey(
    chatId,
    keyString
) {

    if (
        !chatId ||
        !keyString
    ) {

        return;

    }


    localStorage.setItem(

        `flowchat_chat_key_${chatId}`,

        keyString

    );

}


/* =====================================================
   LOAD KEY LOCALLY
===================================================== */

function loadChatKey(
    chatId
) {

    if (
        !chatId
    ) {

        return null;

    }


    return localStorage.getItem(

        `flowchat_chat_key_${chatId}`

    );

}


/* =====================================================
   DELETE LOCAL KEY
===================================================== */

function deleteChatKey(
    chatId
) {

    if (
        !chatId
    ) {

        return;

    }


    localStorage.removeItem(

        `flowchat_chat_key_${chatId}`

    );

}


/* =====================================================
   GET IMPORTED CHAT KEY
===================================================== */

async function getChatKey(
    chatId
) {

    const keyString =
        loadChatKey(
            chatId
        );


    if (
        !keyString
    ) {

        return null;

    }


    return await importChatKey(
        keyString
    );

}


/* =====================================================
   GLOBAL API
===================================================== */

window.FlowChatCrypto = {

    generateChatKey,

    exportChatKey,

    importChatKey,

    encryptText,

    decryptText,

    createRandomChatKey,

    saveChatKey,

    loadChatKey,

    deleteChatKey,

    getChatKey

};


/* =====================================================
   READY
===================================================== */

console.log(
    "🔐 FlowChat Crypto загружен"
);

console.log(
    "🔐 Алгоритм:",
    FLOWCHAT_CRYPTO_ALGORITHM
);

console.log(
    "🔐 Ключ:",
    "AES-256"
);
/* =====================================================
   FLOWCHAT — ECDH USER KEYS
   Для E2E приватных чатов
===================================================== */

const FLOWCHAT_ECDH_CURVE = "P-256";


/* =====================================================
   GENERATE USER KEY PAIR
===================================================== */

async function generateUserKeyPair() {

    return await crypto.subtle.generateKey(

        {
            name: "ECDH",
            namedCurve:
                FLOWCHAT_ECDH_CURVE
        },

        true,

        [
            "deriveKey"
        ]

    );

}


/* =====================================================
   EXPORT PUBLIC KEY
===================================================== */

async function exportUserPublicKey(
    publicKey
) {

    return await crypto.subtle.exportKey(
        "jwk",
        publicKey
    );

}


/* =====================================================
   EXPORT PRIVATE KEY
===================================================== */

async function exportUserPrivateKey(
    privateKey
) {

    return await crypto.subtle.exportKey(
        "jwk",
        privateKey
    );

}


/* =====================================================
   IMPORT PUBLIC KEY
===================================================== */

async function importUserPublicKey(
    jwk
) {

    return await crypto.subtle.importKey(

        "jwk",

        jwk,

        {
            name: "ECDH",
            namedCurve:
                FLOWCHAT_ECDH_CURVE
        },

        true,

        []

    );

}


/* =====================================================
   IMPORT PRIVATE KEY
===================================================== */

async function importUserPrivateKey(
    jwk
) {

    return await crypto.subtle.importKey(

        "jwk",

        jwk,

        {
            name: "ECDH",
            namedCurve:
                FLOWCHAT_ECDH_CURVE
        },

        true,

        [
            "deriveKey"
        ]

    );

}


/* =====================================================
   CREATE SHARED CHAT KEY
===================================================== */

async function createSharedChatKey(
    privateKey,
    otherPublicKey
) {

    if (
        !privateKey ||
        !otherPublicKey
    ) {

        throw new Error(
            "Недостаточно ключей для создания общего ключа"
        );

    }


    return await crypto.subtle.deriveKey(

        {
            name: "ECDH",

            public:
                otherPublicKey
        },

        privateKey,

        {
            name: "AES-GCM",

            length: 256
        },

        true,

        [
            "encrypt",
            "decrypt"
        ]

    );

}


/* =====================================================
   SAVE PRIVATE KEY LOCALLY
===================================================== */

function savePrivateKey(
    privateKeyJwk
) {

    localStorage.setItem(

        "flowchat_private_key",

        JSON.stringify(
            privateKeyJwk
        )

    );

}


/* =====================================================
   LOAD PRIVATE KEY
===================================================== */

function loadPrivateKey() {

    const value =
        localStorage.getItem(
            "flowchat_private_key"
        );


    if (!value) {

        return null;

    }


    try {

        return JSON.parse(
            value
        );

    } catch {

        return null;

    }

}


/* =====================================================
   SAVE PUBLIC KEY LOCALLY
===================================================== */

function savePublicKey(
    publicKeyJwk
) {

    localStorage.setItem(

        "flowchat_public_key",

        JSON.stringify(
            publicKeyJwk
        )

    );

}


/* =====================================================
   LOAD PUBLIC KEY
===================================================== */

function loadPublicKey() {

    const value =
        localStorage.getItem(
            "flowchat_public_key"
        );


    if (!value) {

        return null;

    }


    try {

        return JSON.parse(
            value
        );

    } catch {

        return null;

    }

}


/* =====================================================
   ECDH API
===================================================== */

window.FlowChatCrypto.generateUserKeyPair =
    generateUserKeyPair;

window.FlowChatCrypto.exportUserPublicKey =
    exportUserPublicKey;

window.FlowChatCrypto.exportUserPrivateKey =
    exportUserPrivateKey;

window.FlowChatCrypto.importUserPublicKey =
    importUserPublicKey;

window.FlowChatCrypto.importUserPrivateKey =
    importUserPrivateKey;

window.FlowChatCrypto.createSharedChatKey =
    createSharedChatKey;

window.FlowChatCrypto.savePrivateKey =
    savePrivateKey;

window.FlowChatCrypto.loadPrivateKey =
    loadPrivateKey;

window.FlowChatCrypto.savePublicKey =
    savePublicKey;

window.FlowChatCrypto.loadPublicKey =
    loadPublicKey;