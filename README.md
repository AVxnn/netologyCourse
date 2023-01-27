# netologyCourse

## Задание 1

docker pull busybox 

Using default tag: latest
latest: Pulling from library/busybox
205dae5015e7: Pull complete 
Digest: sha256:7b3ccabffc97de872a30dfd234fd972a66d247c8cfc69b0550f276481852627c
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

docker run --name pinger -i -t busybox ping netology.ru

PING netology.ru (188.114.99.229): 56 data bytes
64 bytes from 188.114.99.229: seq=0 ttl=36 time=77.923 ms
64 bytes from 188.114.99.229: seq=1 ttl=36 time=47.909 ms
64 bytes from 188.114.99.229: seq=2 ttl=36 time=69.165 ms
64 bytes from 188.114.99.229: seq=3 ttl=36 time=51.042 ms
64 bytes from 188.114.99.229: seq=4 ttl=36 time=51.063 ms
64 bytes from 188.114.99.229: seq=5 ttl=36 time=42.556 ms
64 bytes from 188.114.99.229: seq=6 ttl=36 time=46.667 ms

docker ps

CONTAINER ID   IMAGE     COMMAND              CREATED          STATUS          PORTS     NAMES
cd37e9cbc181   busybox   "ping netology.ru"   14 seconds ago   Up 13 seconds             pinger

docker logs pinger


PING netology.ru (188.114.99.229): 56 data bytes
64 bytes from 188.114.99.229: seq=0 ttl=36 time=50.814 ms
64 bytes from 188.114.99.229: seq=1 ttl=36 time=43.039 ms
64 bytes from 188.114.99.229: seq=2 ttl=36 time=42.459 ms
64 bytes from 188.114.99.229: seq=3 ttl=36 time=51.244 ms
64 bytes from 188.114.99.229: seq=4 ttl=36 time=49.387 ms
64 bytes from 188.114.99.229: seq=5 ttl=36 time=48.545 ms
64 bytes from 188.114.99.229: seq=6 ttl=36 time=48.585 ms
64 bytes from 188.114.99.229: seq=7 ttl=36 time=46.788 ms
64 bytes from 188.114.99.229: seq=8 ttl=36 time=49.098 ms
64 bytes from 188.114.99.229: seq=9 ttl=36 time=48.259 ms
(и так далее)

docker run --name pinger -i -t busybox ping netology.ru

docker: Error response from daemon: Conflict. The container name "/pinger" is already in use by container "cd37e9cbc181f361861ed50db1d8596507fe4003b4ca46775f8cf2e4fe8947ec". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.

docker ps

CONTAINER ID   IMAGE     COMMAND              CREATED         STATUS         PORTS     NAMES
cd37e9cbc181   busybox   "ping netology.ru"   6 minutes ago   Up 6 minutes             pinger

8 не совсем понял возможно что то сделал не так (>50 ответов)

docker rm pinger

pinger

docker rmi busybox

Untagged: busybox:latest
Untagged: busybox@sha256:7b3ccabffc97de872a30dfd234fd972a66d247c8cfc69b0550f276481852627c
Deleted: sha256:66ba00ad3de8677a3fa4bc4ea0fc46ebca0f14db46ca365e7f60833068dd0148
Deleted: sha256:b64792c17e4ad443d16b218afb3a8f5d03ca0f4ec49b11c1a7aebe17f6c3c1d2