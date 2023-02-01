# netologyCourse

## Задание 1

docker pull busybox

Using default tag: latest
latest: Pulling from library/busybox
205dae5015e7: Pull complete 
Digest: sha256:7b3ccabffc97de872a30dfd234fd972a66d247c8cfc69b0550f276481852627c
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

docker run -it --name pinger busybox ping -c 7 netology.ru

PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=36 time=24.253 ms
64 bytes from 188.114.98.224: seq=1 ttl=36 time=31.022 ms
64 bytes from 188.114.98.224: seq=2 ttl=36 time=24.152 ms
64 bytes from 188.114.98.224: seq=3 ttl=36 time=20.828 ms
64 bytes from 188.114.98.224: seq=4 ttl=36 time=23.837 ms
64 bytes from 188.114.98.224: seq=5 ttl=36 time=18.558 ms
64 bytes from 188.114.98.224: seq=6 ttl=36 time=23.026 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 18.558/23.668/31.022 ms

docker ps -a

CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS                          PORTS     NAMES
a1cad3aaa57d   busybox   "ping -c 7 netology.…"   About a minute ago   Exited (0) About a minute ago             pinger

docker logs pinger 

george@MBP-Georgij netologyCourse % docker logs pinger 
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=36 time=24.253 ms
64 bytes from 188.114.98.224: seq=1 ttl=36 time=31.022 ms
64 bytes from 188.114.98.224: seq=2 ttl=36 time=24.152 ms
64 bytes from 188.114.98.224: seq=3 ttl=36 time=20.828 ms
64 bytes from 188.114.98.224: seq=4 ttl=36 time=23.837 ms
64 bytes from 188.114.98.224: seq=5 ttl=36 time=18.558 ms
64 bytes from 188.114.98.224: seq=6 ttl=36 time=23.026 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 18.558/23.668/31.022 ms

docker start pinger

pinger

docker ps -a       

CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS                      PORTS     NAMES
a1cad3aaa57d   busybox   "ping -c 7 netology.…"   4 minutes ago   Exited (0) 30 seconds ago             pinger

docker rm pinger

pinger

docker logs pinger

PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=36 time=24.253 ms
64 bytes from 188.114.98.224: seq=1 ttl=36 time=31.022 ms
64 bytes from 188.114.98.224: seq=2 ttl=36 time=24.152 ms
64 bytes from 188.114.98.224: seq=3 ttl=36 time=20.828 ms
64 bytes from 188.114.98.224: seq=4 ttl=36 time=23.837 ms
64 bytes from 188.114.98.224: seq=5 ttl=36 time=18.558 ms
64 bytes from 188.114.98.224: seq=6 ttl=36 time=23.026 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 18.558/23.668/31.022 ms
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=36 time=19.472 ms
64 bytes from 188.114.98.224: seq=1 ttl=36 time=23.473 ms
64 bytes from 188.114.98.224: seq=2 ttl=36 time=23.842 ms
64 bytes from 188.114.98.224: seq=3 ttl=36 time=22.709 ms
64 bytes from 188.114.98.224: seq=4 ttl=36 time=23.126 ms
64 bytes from 188.114.98.224: seq=5 ttl=36 time=17.450 ms
64 bytes from 188.114.98.224: seq=6 ttl=36 time=35.436 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 17.450/23.644/35.436 ms

Общее количество запусков команды ping - 2
Общее количество отправленных запросов - 14

docker rm pinger -f

pinger

docker rmi busybox 

Untagged: busybox:latest
Untagged: busybox@sha256:7b3ccabffc97de872a30dfd234fd972a66d247c8cfc69b0550f276481852627c
Deleted: sha256:66ba00ad3de8677a3fa4bc4ea0fc46ebca0f14db46ca365e7f60833068dd0148
Deleted: sha256:b64792c17e4ad443d16b218afb3a8f5d03ca0f4ec49b11c1a7aebe17f6c3c1d2

## Задание 2

docker pull node:15.14

15.14: Pulling from library/node
bfde2ec33fbc: Pull complete 
787f5e2f1047: Pull complete 
7b6173a10eb8: Pull complete 
dc05be471d51: Pull complete 
55fab5cadd3c: Pull complete 
bd821d20ef8c: Pull complete 
6041b69671c6: Pull complete 
989c5d2d2313: Pull complete 
4b57d41e8391: Pull complete 
Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Status: Downloaded newer image for node:15.14
docker.io/library/node:15.14

docker run -it --name mynode -e NAME=George -e SURNAME=Romashko node:15.14

Welcome to Node.js v15.14.0.
Type ".help" for more information.
>

> console.log(`Привет, ${process.env.NAME} ${process.env.SURNAME}!`)

docker stop mynode

mynode

docker rm mynode -f

mynode

docker rmi node:15.14

Untagged: node:15.14
Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Deleted: sha256:3d3f41722daf1a77c34d6eade6676bbffa2d6a2a21095de2ab0c427a5c942fc9
Deleted: sha256:601382991a159cfc5013ad973158f30b7b7a913e8d7e547b3456deab3ad98022
Deleted: sha256:d5db49eecae8c02c9ea3a79f89c43ded9162bac118a0302a7b514d0df82aa112
Deleted: sha256:a2c1973858d0aad3de0927294602b17c8ef9050c30e0f461e0868997a08552a4
Deleted: sha256:a0153172017a08a521a8be971ca4dcb5fbc4b7227642c12bbb2da6265bd66b50
Deleted: sha256:f1123940e954d335d91b52a40fab4f8144f38ff113ade7d65663071d0f06da6f
Deleted: sha256:f1f4fbb0e7e6e0ce2d9eae1e577f9f6df0a719dd874bff00b2d08895c75c297d
Deleted: sha256:1eb455ab6d45fdbbd90fccff791ffa228080c052acf464f8da1b1d78650bd706
Deleted: sha256:1dbe832a694971a925d7d216f49b700c95f402bd72288f9d37eceb1d59dcf72d
Deleted: sha256:2f4ee6a2e1b5dfb9236cd262e788f9d39109242ca27a4aacb583c8af66ec3ff7


## Задание 3

docker pull node:15.14

15.14: Pulling from library/node
bfde2ec33fbc: Pull complete 
787f5e2f1047: Pull complete 
7b6173a10eb8: Pull complete 
dc05be471d51: Pull complete 
55fab5cadd3c: Pull complete 
bd821d20ef8c: Pull complete 
6041b69671c6: Pull complete 
989c5d2d2313: Pull complete 
4b57d41e8391: Pull complete 
Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Status: Downloaded newer image for node:15.14
docker.io/library/node:15.14

docker run --name first_node -d -t -v ~/data:/var/first/data node:15.14

1bb7012a1f3ea7b190f0496571e4271980cf5a1376efdf2322ed030e5a199fad

docker run --name second_node -d -t -v ~/data:/var/second/data node:15.14

357bff3e422d38e5b11f506f9b3b018e883debb4241182740d886d54017681cf

docker exec -it first_node bash

root@1bb7012a1f3e:/#

echo content1 > var/first/data/first_content.txt

root@1bb7012a1f3e:/#

echo host_content > var/first/data/host_content.txt

root@1bb7012a1f3e:/#

netologyCourse % docker exec -it second_node bash

root@357bff3e422d:/# 

ls /var/second/data

first_content.txt host_content.txt

cat /var/second/data/*

content1
host_content

docker stop first_node second_node

first_node
second_node

docker rm first_node second_node

first_node
second_node

docker rmi node:15.14

Untagged: node:15.14
Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Deleted: sha256:3d3f41722daf1a77c34d6eade6676bbffa2d6a2a21095de2ab0c427a5c942fc9
Deleted: sha256:601382991a159cfc5013ad973158f30b7b7a913e8d7e547b3456deab3ad98022
Deleted: sha256:d5db49eecae8c02c9ea3a79f89c43ded9162bac118a0302a7b514d0df82aa112
Deleted: sha256:a2c1973858d0aad3de0927294602b17c8ef9050c30e0f461e0868997a08552a4
Deleted: sha256:a0153172017a08a521a8be971ca4dcb5fbc4b7227642c12bbb2da6265bd66b50
Deleted: sha256:f1123940e954d335d91b52a40fab4f8144f38ff113ade7d65663071d0f06da6f
Deleted: sha256:f1f4fbb0e7e6e0ce2d9eae1e577f9f6df0a719dd874bff00b2d08895c75c297d
Deleted: sha256:1eb455ab6d45fdbbd90fccff791ffa228080c052acf464f8da1b1d78650bd706
Deleted: sha256:1dbe832a694971a925d7d216f49b700c95f402bd72288f9d37eceb1d59dcf72d
Deleted: sha256:2f4ee6a2e1b5dfb9236cd262e788f9d39109242ca27a4aacb583c8af66ec3ff7