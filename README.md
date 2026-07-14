# pixel-pint-arcade

## Docker local stack

Create a local env file first:

```bash
cp .env.example .env
```

For the Docker stack, the app container receives its own `DATABASE_URL` from
`docker-compose.yml`, so you do not need to point `.env` at the Docker database.
Keep `.env` for local Next.js/Prisma runs and optional auth settings like
Google OAuth.

Run the app and PostgreSQL together:

```bash
docker compose up --build
```

The app is available at:

```txt
http://localhost:3000
```

The PostgreSQL container is exposed to the host on port `5435` by default to
avoid conflicts with other local databases:

```txt
postgresql://pixel_pint:pixel_pint_dev_password@localhost:5435/pixel_pint_arcade?schema=public
```

Inside Docker, the app uses:

```txt
postgresql://pixel_pint:pixel_pint_dev_password@db:5432/pixel_pint_arcade?schema=public
```

On startup, the app container waits for the database, runs `prisma generate`,
applies migrations with `prisma migrate deploy`, and starts `next dev`.

Useful commands:

```bash
docker compose logs -f app db
docker compose down
```
