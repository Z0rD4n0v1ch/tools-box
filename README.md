# Tools Box

Витрина моих приложений: органайзер монтажника, трансляция экрана на ТВ и другие.
Каждое приложение висит на стене мастерской, как инструмент на крючке: описание, веб-версия
и APK для Android в одном месте. Бесплатно, открывается в браузере телефона и компьютера и в Telegram.

Открыть: https://z0rd4n0v1ch.github.io/tools-box/ · Telegram: [@toolsbox_app](https://t.me/toolsbox_app)

## Приложения

| Приложение | Что это | Где |
|---|---|---|
| **Органайзер монтажника** | задачи, объекты, ТО, рабочие часы, авто и расходы монтажника слаботочки | [organizer-app](https://github.com/Z0rD4n0v1ch/organizer-app) |
| **Экран на ТВ** | трансляция экрана Android-телефона на ТВ-приставку по Wi‑Fi | [phone-to-tv](https://github.com/Z0rD4n0v1ch/phone-to-tv) |

## Структура

```
index.html            стена с инструментами (строится из apps/list.js), карточка приложения, «О проекте», установка
apps/list.js          список приложений: id, title, note, tags, icon, tool, color, platforms, web, repo, downloads, features
apps/<id>/icon.png    иконка приложения для карточки
shared/tg.js          адаптер Telegram Mini App (шапка, ссылки во внешний браузер, «Поделиться», startapp)
manifest.webmanifest, sw.js, icon-*.png   установка витрины на телефон, офлайн-кэш
promo/ТЕКСТЫ.txt      тексты для бота
```

## Офлайн и кэш

Витрина работает без интернета после первого открытия. Версии и APK приложений берутся из их релизов на GitHub.

## Установка на телефон

Chrome → ⋮ → «Установить приложение» на странице витрины.

## Telegram

Tools Box открывается как Mini App в боте [@toolsbox_app](https://t.me/toolsbox_app). Сайт тот же (GitHub Pages), бот только открывает его.
Ссылка `t.me/toolsbox_app?startapp=<id>` сразу открывает нужное приложение, на сайте то же делает `#<id>`.
