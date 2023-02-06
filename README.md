# netologyCourse

## Задание 1 и 2

написать в терминал node script.js и юзать postman для теста ;)
DOCKER контейнеризация приложений - 1 задание

docker build -t library .   

netologyCourse % docker run --rm --name library -e PORT=3000 -p 80:3000 library

Ссылка на репозиторий https://hub.docker.com/repository/docker/metavxnn/library/general