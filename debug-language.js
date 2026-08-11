/* =====================================================
   FLOWCHAT — LANGUAGE SYNTAX CHECK
===================================================== */

async function debugLanguagesJS() {

    console.log(
        "🔎 FLOWCHAT — ПОИСК SYNTAX ERROR"
    );

    try {

        const response =
            await fetch(
                "./languages.js?debug=" +
                Date.now()
            );

        const code =
            await response.text();

        console.log(
            "📦 Размер:",
            code.length,
            "символов"
        );


        /*
         * ВАЖНО:
         * Проверяем ВЕСЬ файл целиком.
         */

        try {

            new Function(code);

            console.log(
                "✅ new Function: СИНТАКСИС OK"
            );

        } catch (error) {

            console.error(
                "🔥 SYNTAX ERROR"
            );

            console.error(
                "Тип:",
                error.name
            );

            console.error(
                "Сообщение:",
                error.message
            );

            console.error(
                "Stack:",
                error.stack
            );


            /*
             * Пытаемся достать строку
             */

            let line =
                null;

            let column =
                null;


            let match =
                error.stack &&
                error.stack.match(
                    /<anonymous>:(\d+):(\d+)/
                );


            if (match) {

                line =
                    Number(
                        match[1]
                    );

                column =
                    Number(
                        match[2]
                    );

            }


            /*
             * Если браузер не дал строку,
             * ищем подозрительные символы.
             */

            if (!line) {

                console.warn(
                    "⚠️ Браузер не сообщил номер строки."
                );

                console.log(
                    "🔎 Проверяем подозрительные символы..."
                );


                findSuspiciousCharacters(
                    code
                );

            } else {

                showContext(
                    code,
                    line,
                    column
                );

            }

        }

    } catch (error) {

        console.error(
            "❌ Ошибка debugger:",
            error
        );

    }

}


/* =====================================================
   SEARCH SUSPICIOUS CHARACTERS
===================================================== */

function findSuspiciousCharacters(code) {

    const lines =
        code.split("\n");


    for (
        let i = 0;
        i < lines.length;
        i++
    ) {

        const line =
            lines[i];


        /*
         * Невидимые символы
         */

        if (
            line.includes("\u200B") ||
            line.includes("\u200C") ||
            line.includes("\u200D") ||
            line.includes("\uFEFF")
        ) {

            console.warn(
                "⚠️ Невидимый символ:",
                i + 1,
                line
            );

        }


        /*
         * Типографские кавычки
         */

        if (
            line.includes("“") ||
            line.includes("”") ||
            line.includes("‘") ||
            line.includes("’")
        ) {

            console.warn(
                "⚠️ Неправильные кавычки:",
                i + 1,
                line
            );

        }


        /*
         * Длинное тире вместо -
         */

        if (
            line.includes("—") ||
            line.includes("–")
        ) {

            console.warn(
                "⚠️ Подозрительное тире:",
                i + 1,
                line
            );

        }

    }


    console.log(
        "🔎 Проверка символов завершена."
    );


    /*
     * Дополнительная проверка строк
     * с новыми переводами
     */

    console.group(
        "🌍 НОВЫЕ ПЕРЕВОДЫ"
    );


    for (
        let i = 0;
        i < lines.length;
        i++
    ) {

        if (
            lines[i].includes(
                "editMessage"
            ) ||
            lines[i].includes(
                "deleteMessage"
            ) ||
            lines[i].includes(
                "deleteConfirm"
            ) ||
            lines[i].includes(
                "edited:"
            ) ||
            lines[i].includes(
                "messageDeleted"
            )
        ) {

            console.log(
                `${i + 1}: ${lines[i]}`
            );

        }

    }


    console.groupEnd();

}


/* =====================================================
   SHOW CONTEXT
===================================================== */

function showContext(
    code,
    line,
    column
) {

    const lines =
        code.split("\n");


    console.error(
        "📍 ОШИБКА В СТРОКЕ:",
        line
    );

    console.error(
        "📍 СТОЛБЕЦ:",
        column
    );


    console.group(
        "📖 КОНТЕКСТ"
    );


    const start =
        Math.max(
            1,
            line - 5
        );


    const end =
        Math.min(
            lines.length,
            line + 5
        );


    for (
        let i = start;
        i <= end;
        i++
    ) {

        if (
            i === line
        ) {

            console.error(
                `🔥 ${i}: ${lines[i - 1]}`
            );

        } else {

            console.log(
                `   ${i}: ${lines[i - 1]}`
            );

        }

    }


    console.groupEnd();

}


/* =====================================================
   START
===================================================== */

debugLanguagesJS();