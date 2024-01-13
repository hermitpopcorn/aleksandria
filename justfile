list:
  @just --list

up:
  docker compose -f compose-dev.yml up -d

down:
  docker compose -f compose-dev.yml down

exec:
  docker exec -it aleksandria-next sh
