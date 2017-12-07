Form Task

Инструкция

Для установки зависимостей выполните:

npm install

Для запуска development mode выполните:

npm start

Приложение будет доступно на 3000 порту(http://localhost:3000).

Production Mode

Для сборки production mode выполните:

npm run build

Задание

Реализовать, используя библиотеку React.js или фреймворк React Native, приложение
со следующим функционалом:
на главном экране приложения должен отображаться список задач
* должна быть возможность добавить новую задачу
* должна быть возможность редактировать/удалить задачу
* должна быть возможность пометить задачу как выполненную задача
* должна включать следующее:
    - название
    - описание
    - важность
    - задачи (обычная, важная, очень важная)
    - дату и время когда задачу нужно выполнить (и возможность создать задачу без даты)
    - дату и время когда задача была выполнена на
      главном экране должна быть возможность просмотреть задачи только
      определенной важности, т.е. должно быть 4 фильтра: все, обычные, важные,
      очень важные

Приложение должно помечать просроченные задачи (например, красным цветом) задачи
должны сохраняться между запусками приложения

Примечание

Допустимые языки: JavaScript, CSS, HTML
Требования к дизайну: нет
Требования к приложению: кроссплатформенное (React Native) мобильное приложение
(Android или iOS) или вебсайт (вебприложение)