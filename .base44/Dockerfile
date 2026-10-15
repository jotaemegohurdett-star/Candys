# Development runtime image for the Base44 sandbox.
# It only provides Node + pnpm tooling — application source is bind-mounted
# from the repo (see docker-compose.base44.yml) so edits stay live.
FROM node:22

RUN npm install -g pnpm@10

WORKDIR /app
