# Процент готовности проекта

## 10.6% 

### Развертка на linux машине 

Есть <a href="https://github.com/Sapfir0/deploymentMetida">небольшой</a> скрипт, поднимающий сервер на unix)

### Развертка на Windows машине 

Для установки всех пакетов и запуска сервера:


Команды терминала:

``` npm install
npm start ```

<p>Команды MySQL Command Line:
``` create database usersDB2; 
create user 'metidaSQL'@'localhost' identified with mysql_native_password by '123456';
grant all privileges on usersDB2.users to 'metidaSQL'@'localhost';
grant all privileges on usersDB2.articles to 'metidaSQL'@'localhost'; ```
<p> Таблица и поля в ней создадутся автоматически

<p>Для обновления таблицы, чтобы не создавать столбцы, указанные в моделях, можно удалить таблицу:
``` drop table usersDB2.users```

##Структура проекта
<p>Если ты пришел и не понимаешь что тут происходит, я тебе расскажу хотя бы про структуру проекта

###  /config 
 #### Настройки базы данных  
<p>Рекомендую создать такой же аккаунт с таким же логином и паролем(см выше)

 ### /routes 
 #### Маршрутизация  
<p>Реализовано пока всего-лишь несколько переходов по сайту. 

 ### /controllers 
 #### Работа с регистрацией юзера  
<p> Файл, который должен соединяться с таблицей юзеров в БД и проверять на соответствие поля

 ### /services 
 #### Непосредственная валидация на стороне сервера 

 ### /public 
 #### Лицо сайта  
<p>Ой, там нет html файлов. Возможно, я к ним еще вернусь, но не сегодня. Там лежат стили, картинки и фронтендовые скрипты вроде валидации ввода

 ### /views 
 #### Предтрансляционные html файлы  
<p>Файлы pug(мопс ахах) браузер транслирует в html файлы. Надо перейти на реакт

 ### /views/modules  
 #### Элементы сайта, которые должны отображаться больше, чем на одной странице. 
<p>Чтобы не копировать код(dry ofc), мы создаем отельный файлик, который инклудим с требуемой страницы. Конечно же, для наших файлов-модулей необходим и стайл модуль, поэтому кидаем такие же модульные стили в /public/css/modules

 ### /bin 
<p>Есть идея создать там точку входа, чтобы именно файл www, отвечал за саму инициализацию сервера, как в express-generator

## Код стайл 
<p> Да, возможно, не всем нравится за ним следить, но это важно, т.к. проект развивается, и становится все больше и больше (на момент написания было окло 1-1.5к строк), за этим достаточно тяжело следить так, что хотя бы код стайл должен быть плюс-минус одинаковым
<p> Венгерской нотации я думаю смысла придерживаться нет (хотя это топово особенно для жабкаскрипт), но есть минимальный набор:

1. отступы: 4 пробела
2. название файлов и папок(сиротам не понять) в змеином стайле: вот_так.файл
3. в то время как весь код в верблюжьем стайле: слышьЯВызываюПокемона()
4. функции должны быть с максимально понятным названием 

 ### Docker 
<p>Это контейнер 
<img src="https://im0-tub-ru.yandex.net/i?id=9c8143a2c07d5d1b78dbad9b2567a6ae-l&n=13">
<p> Создание контейнера
``` docker build .
docker images
docker run <IMAGE_ID> ```

<p>Теперь, если ты сделал что-то, и не смог исправить ошибку, или просто нашел баг в работе и не смог сразу поправить, возможно, стоит создать issue с этой ошибкой, чтобы она мозолила глаза и кто-нибудь(хм) ее пофиксил

