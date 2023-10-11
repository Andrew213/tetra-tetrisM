## About us and our project

Привет!

Мы команда Tetra.
В данном проекте мы реализовали игру Тетрис.
Посмотреть презентацию нашего проекта можно в видео:
[Presentation](https://www.loom.com/share/e20dee6c39c34131b4bd186ac919e2f9?sid=b653ef44-226d-42a6-8f7f-03333574a4f7)


На данный момент в проекте есть следующие страницы

**авторизация и регистрация**
На все страницы проекта можно попасть только после регистрации/авторизации.

**об игре (она же главная странциа)**
На странцие представлена краткая история игры, описание тетрамино и правила

**профиль пользователя**
В верхнем меню можно найти аватар пользователя. При клике на аватар в выпадающем меню можно выбрать раздел Profile. 
На странице профиля пользователь может изменить информацию о себе и задать аватар.

**сама игра**
Страница с игрой Тетрис. Процесс игры подробно описан в следующем разделе

**leaderboard**
Страница с достижениями разных игроков.
На странице представлена тройка лидеров в верхней части и в таблице можно увидеть достижения всех игроков. 

**форум**
Раздел для общения. Здесь можно увидеть основные темы и перейдя в тему открываются сообщения.


### Описание игры

При переходе на страницу с игрой вы видите стартовый экран.
После нажатия на кнопку "Старт" появляется сама игра. В область игры (стакан) падают фигурки (тетрамино) сверху вниз.
Необходимо расставить их так чтобы заполнить ряд. Если ряд заполнен - он сгорает, а игроку начисляются +100 очков к счету.
Когда игрок достигает счета кратного 1000 его скорость меняется. Тетрамино начинают падаь быстрее. 
Игрок начинает с 0 скорости и может дойти до 5. После достижения максимальной скорости происходит сброс на 0.

Если игрок заполнил весь "стакан", то игра заканчивается. Открывается экран "Game over" и выводятся полученные очки.

Справа от игры есть блок с информацией об игре. Здесь можно найти количество набранных очков, текущую скорость и следующий тетрамино.
Так же в этом блоке есть кнопка "Выйти", в случае если игрок хочет завершить игру.

### Дополнительный функционал.

Дополнительно в проекте настроена возможность fullScreen для игры.
Во время игры можно нажать на 'f' и игра будет развернута на весь экран. 

Так же реализована работа с service workers. Это позволяет запускть игру в offline режиме.


## Technical

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`