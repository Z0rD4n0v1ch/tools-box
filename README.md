# Tools Box

Витрина моих приложений. Каждое приложение висит на стене мастерской, как инструмент
на крючке: нажимаешь — открывается описание, веб-версия и APK для Android.
Работает в браузере телефона и компьютера и как Mini App в Telegram.

Витрина: https://z0rd4n0v1ch.github.io/tools-box/

## Приложения

| Приложение | Что это | Где |
|---|---|---|
| **Органайзер монтажника** | задачи, объекты, ТО, часы, авто, расходы | [organizer-app](https://github.com/Z0rD4n0v1ch/organizer-app) |
| **Экран на ТВ** | трансляция экрана телефона на Android TV-приставку | APK скоро |

## Структура

```
index.html            стена с инструментами (строится из apps/list.js), карточка приложения, «О проекте», установка
apps/list.js          список приложений: id, title, note, tags, icon, tool, color, platforms, web, repo, downloads, features
apps/<id>/icon.png    иконка приложения для карточки (квадрат, 192×192)
shared/tg.js          адаптер Telegram Mini App (шапка, ссылки во внешний браузер, «Поделиться», startapp)
manifest.webmanifest, sw.js, icon-*.png   установка витрины на телефон, офлайн-кэш
promo/ТЕКСТЫ.txt      тексты для бота в @BotFather
sync.sh               отправка на GitHub
```

## Новое приложение

1. Положи иконку в `apps/<id>/icon.png`.
2. Добавь запись в `apps/list.js` (поля описаны в начале файла).
3. Выбери инструмент на стене: `tool: 'wrench'`, `'screwdriver'`, `'multimeter'` или `'hammer'`, и цвет ручки `color`.
4. Увеличь `VERSION` в `sw.js` и выполни `bash sync.sh`.

## Версии и APK

Если у приложения указан `repo`, витрина сама берёт с GitHub последний релиз:
номер версии, дату и ссылку на APK. Новую версию достаточно выложить в Releases
репозитория приложения — витрину менять не нужно.

Если в релизе несколько APK (как у «Экрана на ТВ»), кнопки задаются в `downloads`:
`match` — часть имени файла. Например, `sender-debug.apk` найдётся по `sender`.

### Как выложить «Экран на ТВ»

1. Создай на GitHub репозиторий `phone-to-tv` (Public) и загрузи туда папку PhoneToTvCast.
2. Справа нажми **Releases → Create a new release**, тег `v1.0`, и прикрепи
   `sender-debug.apk` и `receiver-debug.apk`.
3. В `apps/list.js` у «Экрана на ТВ» поставь `repo: 'Z0rD4n0v1ch/phone-to-tv'`.

## Офлайн и кэш

Витрина работает без интернета после первого открытия. Сервис-воркер всегда сначала
спрашивает сервер, поэтому обновления видны сразу. Если поменял файлы, увеличь `VERSION` в `sw.js`.

## Публикация

1. Создай на github.com пустой репозиторий `tools-box` (Public).
2. В этой папке открой Git Bash и выполни `bash sync.sh`.
3. В репозитории: Settings → Pages → Branch: `main`, папка `/ (root)` → Save.

## Telegram

1. В @BotFather: `/newbot` → придумай имя и юзернейм (у витрины — `toolsbox_app`).
2. `/mybots` → бот → Bot Settings → Configure Mini App → Enable Mini App →
   адрес `https://z0rd4n0v1ch.github.io/tools-box/`.
3. Там же Menu Button → тот же адрес, текст «Открыть».
4. Юзернейм бота записан в `BOT` в `shared/tg.js` (`toolsbox_app`) — поэтому «Поделиться» будет давать ссылку на бота.

Ссылка `t.me/<бот>?startapp=<id>` сразу открывает нужное приложение, на сайте то же делает `#<id>`
(например, `tools-box/#organizer`). В Telegram сайты приложений и APK открываются во внешнем браузере.
