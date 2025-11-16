# 🔧 Vite + Handlebars Component-Based Starter

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Vite](https://img.shields.io/badge/Vite-5.x-blue?logo=vite)
![Handlebars](https://img.shields.io/badge/Handlebars-4.x-orange?logo=handlebarsdotjs)
![License](https://img.shields.io/badge/license-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blueviolet)


## 🔗 Pull Request
> [Ссылка на PR →](https://github.com/Zouver/middle.messenger.praktikum.yandex/pull/1)

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

## 📁 Структура проекта

```
src
├── components/                 # UI-компоненты (Handlebars)
│   ├── button-icon.hbs
│   ├── form-button.hbs
│   ├── form-input.hbs
│   ├── helper-*.hbs            # Вспомогательные шаблоны
│   ├── text-*.hbs              # Тестовые компоненты
│   ├── widget-*.hbs            # Сложные UI блоки (auth, chat, profile)
│   └── html.hbs                # Базовая разметка
│
├── consts/                     # Мок-данные, конфиги, типы контента
│   ├── chats.ts
│   ├── messages.ts
│   ├── profile-information.ts
│   └── index.ts
│
├── pages.ts                    # Регистрация страниц, загрузка данных
│
├── *.html                      # Точки входа страниц
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── error-404.html
│   └── error-500.html
│
├── public/                     # Статические ресурсы
│   └── camera.png
│
├── styles/                     # Стилизация
│   ├── components.scss
│   ├── typography.css
│   ├── tokens.css
│   └── styles.css
│
└── main.ts
```

---

## 💡 Использование компонентов

Пример подключения компонента:

```hbs
{{> 
  widget-chat-preview
      nickname="Andrey"
      time="11:51"
      message="Hello world!"
}}
```

Пример использования простого текстового компонента:

```hbs
{{> text text="Список чатов" color="primary"}}
```

---

## 🧩 Работа с данными

Константы подключаются из директории `src/consts`:

```ts
import { chats, messages, profileInformation } from './consts'
```

Они доступны для рендера через `pages.ts`.

---

## 🧑‍💻 Команда проекта

- **Andrey A** — Frontend Developer  
  [GitHub](https://github.com/Zouver)

---

© 2025 | MIT License | Создано с ❤️ на Vite + Handlebars