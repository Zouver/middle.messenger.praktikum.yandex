# 🔧 Vite + Handlebars Component-Based Starter

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Vite](https://img.shields.io/badge/Vite-5.x-blue?logo=vite)
![Handlebars](https://img.shields.io/badge/Handlebars-4.x-orange?logo=handlebarsdotjs)
![License](https://img.shields.io/badge/license-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blueviolet)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b6697f2d-0522-4c0c-ad13-f51fe6cc31e0/deploy-status)](https://app.netlify.com/projects/verdant-concha-6bcabc/deploys)


## Netlify
> https://verdant-concha-6bcabc.netlify.app/

## 🔗 Pull Request
> [Ссылка на PR →](https://github.com/Zouver/middle.messenger.praktikum.yandex/pull/3)

---

## 📚 Описание

Учебный проект, демонстрирующий разработку интерфейса с использованием **Vite**, **Handlebars** и компонентного подхода.  
Проект ориентирован на построение UI систем через переиспользуемые шаблонные компоненты.

**Основные возможности:**
- Компонентная структура UI (atomic-like)
- Использование Handlebars для шаблонов UI
- Поддержка SCSS и CSS-токенов
- Горячая перезагрузка (HMR)
- Оптимизация и сборка для продакшена
- Отдельные HTML-страницы (login, signup, profile и др.)
- Управление мок-данными через TS-константы

---

## 🚀 Установка и запуск

```bash
git clone https://github.com/Zouver/middle.messenger.praktikum.yandex.git
cd middle.messenger.praktikum.yandex
npm install
npm run dev
npm run build
npm run preview
```

---

## 🧪 Тесты (Mocha + Chai)

Тесты лежат **рядом с тестируемыми файлами** и имеют суффикс `*.test.ts`.

Запуск:

```bash
npm run test
```

## 📁 Структура проекта

```
src/
├── components/                     # UI-компоненты с TypeScript
│   ├── pages/                      # Страничные компоненты
│   │   ├── auth/                   # Авторизация
│   │   │   ├── auth.ts             # Компонент авторизации
│   │   │   ├── auth.template.ts    # Шаблон Handlebars
│   │   │   ├── auth.props.ts       # Типы пропсов
│   │   │   ├── auth.css            # Стили
│   │   │   └── index.ts            # Экспорт
│   │   ├── chat/                   # Страница чата
│   │   │   ├── chat.ts
│   │   │   ├── chat.template.ts
│   │   │   ├── chat.props.ts
│   │   │   ├── chat.css
│   │   │   ├── consts/             # Константы для чата
│   │   │   │   ├── chat.ts
│   │   │   │   ├── chat-list.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── error/                  # Страницы ошибок
│   │   │   ├── error.ts
│   │   │   ├── error.template.ts
│   │   │   ├── error.props.ts
│   │   │   ├── error.css
│   │   │   ├── consts/             # Константы ошибок
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── profile/                # Профиль пользователя
│   │   │   ├── profile.ts
│   │   │   ├── profile.template.ts
│   │   │   ├── profile.props.ts
│   │   │   ├── profile.css
│   │   │   ├── consts/             # Константы профиля
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts                # Экспорт всех страниц
│   │
│   ├── shared/                     # Переиспользуемые компоненты
│   │   ├── button/                 # Кнопка
│   │   │   ├── button.ts
│   │   │   ├── button.template.ts
│   │   │   ├── button.props.ts
│   │   │   ├── button.css
│   │   │   └── index.ts
│   │   ├── button-icon/            # Кнопка с иконкой
│   │   ├── input/                  # Поле ввода
│   │   ├── input-form/             # Форма с полями ввода
│   │   ├── key-value-item/         # Элемент ключ-значение
│   │   ├── key-value-list/         # Список ключ-значение
│   │   ├── typography/             # Типографика
│   │   │   ├── text/               # Базовый текст
│   │   │   ├── text-display/       # Display текст
│   │   │   ├── text-heading/       # Заголовки
│   │   │   ├── text-label/         # Метки
│   │   │   ├── text-title/         # Заголовки разделов
│   │   │   ├── types.ts            # Типы типографики
│   │   │   └── typography.css      # Стили типографики
│   │   └── index.ts                # Экспорт shared компонентов
│   │
│   ├── widgets/                    # Сложные UI виджеты
│   │   ├── chat/                   # Виджет чата
│   │   ├── chat-list/              # Список чатов
│   │   ├── chat-preview/           # Преview чата
│   │   ├── login/                  # Виджет логина
│   │   ├── message/                # Сообщение
│   │   ├── navigation/             # Навигация
│   │   ├── profile-actions/        # Действия профиля
│   │   ├── profile-change-password/ # Смена пароля
│   │   ├── profile-information/     # Информация профиля
│   │   ├── profile-nav/            # Навигация профиля
│   │   ├── profile-picture/        # Аватарка профиля
│   │   ├── signup/                 # Виджет регистрации
│   │   └── index.ts                # Экспорт виджетов
│   └── index.ts                    # Главный экспорт компонентов
│
├── lib/                            # Библиотечные утилиты
│   ├── component/                  # Система компонентов
│   │   ├── base-component.ts       # Базовый класс компонента
│   │   ├── component.ts            # Реализация компонента
│   │   ├── types.ts                # Типы компонентов
│   │   └── index.ts                # Экспорт
│   ├── event-bus/                  # Event Bus система
│   │   ├── event-bus.ts            # Реализация EventBus
│   │   ├── types.ts                # Типы событий
│   │   └── index.ts                # Экспорт
│   ├── fetch/                      # HTTP клиент
│   │   ├── httptransport.ts        # Транспорт для HTTP
│   │   ├── fetch.ts                # Обертка для fetch
│   │   ├── consts.ts               # Константы
│   │   ├── utils.ts                # Утилиты
│   │   ├── types.ts                # Типы
│   │   └── index.ts                # Экспорт
│   ├── render.ts                   # Система рендеринга
│   ├── router/                     # Роутер
│   │   ├── router.ts               # Реализация роутера
│   │   ├── types.ts                # Типы роутера
│   │   └── index.ts                # Экспорт
│   └── index.ts                    # Главный экспорт библиотек
│
├── styles/                         # Глобальные стили
│   ├── styles.css                  # Основные стили
│   └── tokens.css                  # CSS переменные (токены)
│
├── routes.ts                       # Конфигурация маршрутов
├── main.ts                         # Точка входа приложения
├── index.html                      # Главный HTML файл
└── public/                         # Статические ресурсы
    └── camera.png                  # Изображения
```

---

## 💡 Использование компонентов

Пример подключения компонента:

```ts
new Button({
  text: "Нет аккаунта?", 
  variant: "transparent"
});
```

Пример использования простого текстового компонента:

```ts
new Text({
  text: "Текстовый текст", 
});
```

---

## 🧩 Работа со страницами

Виджеты подключаются из директории `@components/pages (/src/components/pages)`:

```ts
import {AuthPage, ChatPage, ErrorPage, ProfilePage} from "@components/pages";
render("#app", new AuthPage({widget: new Login()}))
```

Они доступны для рендера через `routes.ts`.

---

## 🧑‍💻 Команда проекта

- **Andrey A** — Frontend Developer  
  [GitHub](https://github.com/Zouver)

---

© 2025 | MIT License | Создано с ❤️ на Vite + Handlebars
