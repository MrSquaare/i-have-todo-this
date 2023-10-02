FROM node:20-alpine AS base

ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"

WORKDIR ${APP_DIRECTORY}

COPY ./package.json ./package-lock.json ./
COPY ./common/types/package.json ./common/types/
COPY ./server/package.json ./server/

RUN npm ci


FROM base AS build

COPY ./common/types ./common/types
RUN npm run build -w @common/types

COPY ./server ./server
RUN npm run build -w server


FROM base

COPY --from=build ${APP_DIRECTORY}/server/dist/ ./server/dist/
COPY --from=build ${APP_DIRECTORY}/common/types/dist/ ./common/types/dist/

RUN npm i --omit=dev

RUN npm cache clean -f

RUN apk add --no-cache dumb-init

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["npm", "run", "start", "-w", "server"]
