#!/bin/sh
set -eu

node docker/wait-for-tcp.mjs db 5432 60
npx prisma generate
npx prisma migrate deploy

exec npm run dev -- --hostname 0.0.0.0
