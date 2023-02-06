# netologyCourse

## Задание 1 и 2

написать в терминал node script.js и юзать postman для теста ;)
DOCKER контейнеризация приложений - 1 задание

docker build -t library .   

netologyCourse % docker run --rm --name library -e PORT=3000 -p 80:3000 library

Ссылка на репозиторий https://hub.docker.com/repository/docker/metavxnn/library/general

# MONGODB

db.books.insertOne([
    {
      id: 1,
      title: "Торадора!",
      description: "Торадора",
      authors: "Юко Такэмия",
      favorite: "favorite"
    },
    {
      id: 2,
      title: "Клинок, рассекающий демонов",
      description: "Demon slayer",
      authors: "GOTOUGE Koyoharu",
      favorite: "favorite"
    }
])

db.books.find(
    { title: "Торадора!" },
)

db.books.updateOne(
    { title: "Торадора!" },
    { $set: { description: "new description", authors: "new author"}}
)