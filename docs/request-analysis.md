# Анализ HTTP-запроса

## Общие данные

- **Request URL:** `https://tservers.ru/`
- **Request Method:** `GET`
- **Status Code:** `200 OK`
- **Content-Type:** `text/html; charset=UTF-8`

## Request Headers (что отправил браузер)

- `:authority: tservers.ru` — домен, к которому идёт запрос
- `:method: GET` — HTTP-метод
- `:scheme: https` — используемая схема
- `user-agent: Mozilla/5.0 ...` — браузер и ОС
- `accept: text/html,...` — какие MIME-типы клиент готов принять

## Response Headers (что вернул сервер)

- `server: nginx/1.24.0` — веб-сервер
- `content-type: text/html; charset=UTF-8` — тип и кодировка тела ответа
- `cache-control: no-store, no-cache, must-revalidate` — правила кэширования
- `strict-transport-security: max-age=31536000` — требование работать только по HTTPS
- `date: ...` — время генерации ответа

## Что произошло между браузером и сервером

Браузер получил IP-адрес домена через DNS, установил TCP-соединение
и выполнил TLS-рукопожатие (сайт работает по HTTPS). Затем браузер
отправил HTTP-запрос методом GET на путь `/` с заголовками Host,
User-Agent, Accept и др.

Сервер (nginx/1.24.0) принял запрос, сформировал HTML-документ
и вернул ответ. Статус **200 OK** означает, что запрос обработан
успешно, содержимое найдено и передано клиенту. Заголовки ответа
сообщили браузеру тип контента (`text/html; charset=UTF-8`),
правила кэширования и требование использовать HTTPS.
Браузер распарсил HTML и отрисовал страницу.