<h1> Процент готовности проекта </h1>

<h2> 10.6% </h2>

<h3>Развертка на linux машине </h3>
<p> Есть <a href="https://github.com/Sapfir0/deploymentMetida">небольшой</a> скрипт, поднимающий сервер на unix)

<h3>Развертка на Windows машине </h3>
<p>Для установки всех пакетов и запуска сервера:
<p>Команды терминала:
<pre><code>npm install
npm start</pre></code>

<p>Команды MySQL Command Line:
<pre><code>create database usersDB2; 
create user 'metidaSQL'@'localhost' identified with mysql_native_password by '123456';
grant all privileges on usersDB2.users to 'metidaSQL'@'localhost';
grant all privileges on usersDB2.articles to 'metidaSQL'@'localhost';</code></pre>
<p> Таблица и поля в ней создадутся автоматически

<h3> Важно! В последней версии был изменен пароль от базы юзеров, чтобы соотвествововть минимальным требованиям безопасности. Вводим команду для фикса:</h3>
<pre><code>ALTER USER 'metidaSQL'@'localhost' IDENTIFIED BY '123456';FLUSH PRIVILEGES;</code></pre> 
<p>Для очищения таблицы юзать 
<pre><code> truncate usersDB2.users</code></pre> (либо не обращаемся через точку, если мы все еще в текущей БД)

<h2>Структура проекта</h2>
<p>Если ты пришел и не понимаешь что тут происходит, я тебе расскажу хотя бы про структуру проекта

<h3> /config </h3>
<h4>Настройки базы данных </h4>
<p>Рекомендую создать такой же аккаунт с таким же логином и паролем(см выше)

<h3>/routes</h3>
<h4>Маршрутизация </h4>
<p>Реализовано пока всего-лишь несколько переходов по сайту. 

<h3>/controllers</h3>
<h4>Работа с регистрацией юзера </h4>
<p> Файл, который должен соединяться с таблицей юзеров в БД и проверять на соответствие поля

<h3>/services</h3>
<h4>Непосредственная валидация на стороне сервера</h4>

<h3>/public</h3>
<h4>Лицо сайта </h4>
<p>Ой, там нет html файлов. Возможно, я к ним еще вернусь, но не сегодня. Там лежат стили, картинки и фронтендовые скрипты вроде валидации ввода

<h3>/views</h3>
<h4>Предтрансляционные html файлы </h4>
<p>Файлы pug(мопс ахах) браузер транслирует в html файлы. 

<h3>/views/modules </h3>
<h4>Элементы сайта, которые должны отображаться больше, чем на одной странице.</h4>
<p>Чтобы не копировать код(dry ofc), мы создаем отельный файлик, который инклудим с требуемой страницы. Конечно же, для наших файлов-модулей необходим и стайл модуль, поэтому кидаем такие же модульные стили в /public/css/modules

<h3>/bin</h3>
<p>Есть идея создать там точку входа, чтобы именно файл www, отвечал за саму инициализацию сервера, как в express-generator

<h2> Код стайл </h2>
<p> да, возможно не всем нравится за ним следить но это важно, тк проект развивается и становится все больше и больше (на момент написания было окло 1-1.5к строк), за этим достаточно тяжело следить так что хотябы код стайл должен быть плюс минус одинаковым
<p> венгерской нотации я думаю смысла придерживаться нет (хотя это топово особенно для жабкаскрипт), но есть минимальный набор:

1. отступы: 4 пробела
2. название файлов и папок(сиротам не понять) в змеином стайле: вот_так.файл
3. в то время как весь код в верблюжьем стайле: слышьЯВызываюПокемона()
4. функции должны быть с максимально понятным названием 

<h3>Docker</h3>
<p>Это контейнер 
<img src="https://im0-tub-ru.yandex.net/i?id=9c8143a2c07d5d1b78dbad9b2567a6ae-l&n=13">
<p> Создание контейнера
<pre><code>docker build .
docker images
docker run <IMAGE_ID> </code></pre>

<p>Теперь, если ты сделал что-то, и не смог исправить ошибку, или просто нашел баг в работе и не смог сразу поправить, возможно, стоит создать issue с этой ошибкой, чтобы она мозолила глаза и кто-нибудь(хм) ее пофиксил

