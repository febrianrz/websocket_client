#/bin/bash
docker build -t websocket_client_test .
docker stop $(docker ps -a -q --filter ancestor=websocket_client_test --format="{{.ID}}") || true
docker stop websocket_client_test || true
docker container rm websocket_client_test || true
docker run -d --name=websocket_client_test --restart unless-stopped -p 6002:80 websocket_client_test
#docker system prune -af