As part of the test task, it is required to develop a user interface for
sending and receiving WhatsApp messages
Time to complete the task: 5 days
Requirements:
1. It is required to develop a user interface for sending and receiving
WhatsApp messages
2. It is required to use the GREEN-API service https://green-api.com/
3. It is required to implement sending and receiving only text messages
4. It is required to take the appearance of the chat
https://web.whatsapp.com/ as a prototype of the interface
5. It is required to implement the interface as simple as possible with a minimum set of
functions

6. It is required to send messages using the method https://green-
api.com/docs/api/sending/SendMessage/

7. It is required to receive messages using the method https://green-
api.com/docs/api/receiving/technology-http-api/

8. It is required to use React technology
Expected result:
 The user goes to the chat site and enters their credentials from the GREEN-API system (idInstance, apiTokenInstance)
 User enters recipient's phone number and creates a new chat
 User writes a text message and sends it to the recipient in
WhatsApp
 Recipient replies to the message in WhatsApp messenger
 User sees the recipient's reply in the chat
🔥 Как развернуть сайт

1️⃣ Установка необходимых программ

Перед началом тебе нужно установить несколько программ:


🔹 1.1 Установка Node.js

Открой браузер и перейди на сайт https://nodejs.org/.

Там будет две версии:

LTS (рекомендуемая) — стабильная версия.

Current — последняя версия с новыми фишками.

Скачай LTS и установи её, нажимая «Далее» (Next) во всех окнах установки.

После установки перезагрузи компьютер (на всякий случай).

🔹 1.2 Установка Git

Открой браузер и перейди на сайт https://git-scm.com/.

Нажми на большую кнопку Download.

Запусти скачанный установщик и нажимай «Далее» (Next), пока не закончится установка.

2️⃣ Клонирование проекта с GitHub

Теперь нужно скачать (склонировать) код проекта с GitHub.


🔹 2.1 Открытие терминала

Нажми Win + R, напечатай cmd и нажми Enter.

Откроется чёрное окно — это командная строка (терминал).

🔹 2.2 Переход в нужную папку

В терминале введи команду, чтобы перейти в папку, куда хочешь скачать проект. Например, если хочешь загрузить его в C:\Projects, напиши:


cd C:\Projects


Если такой папки нет, сначала создай её:


mkdir C:\Projects

cd C:\Projects


🔹 2.3 Клонирование репозитория


В терминале напиши команду:


git clone  https://github.com/wellfinee/green-api

Подожди, пока скачаются файлы.


-----------------     С этого момента вы можете просто через любой редактор просмотреть код проекта, 
                      а результат видеть в браузере по ссылке https://wellfinee.github.io/green-api/index.html  или  https://wellfinee.github.io/green-api/         -----------------
                      


🔹 2.4 Переход в папку проекта

После скачивания перейди в папку проекта (она называется так же, как репозиторий на GitHub):


cd green-api


3️⃣ Установка зависимостей

Теперь нужно установить все пакеты, которые нужны для работы проекта.


В терминале (он всё ещё открыт) введи:


npm install


4️⃣ Запуск локального сервера

Когда всё установилось, можно запустить проект:


npm run dev

После запуска в терминале появится что-то вроде:


VITE v4.0.0 ready in 500ms
➜ Local: http://localhost:5173/


5️⃣ Открытие сайта в браузере

Открой браузер (Chrome, Firefox, Edge — какой угодно).

В адресной строке введи:


http://localhost:5173/


Нажми Enter — твой сайт откроется! 🎉

🛑 Возможные ошибки

🔥 Ошибка: «npm не является внутренней или внешней командой»

Решение:


Перезапусти компьютер.

Если не помогло, удали и заново установи Node.js (см. Шаг 1.1).

🔥 Ошибка: «port 5173 is already in use» (порт уже используется)

Решение:

Закрой терминал, открой его снова и попробуй ещё раз npm run dev.

Или попробуй запустить с другим портом:


npm run dev -- --port=3000

После этого сайт откроется на http://localhost:3000/.
