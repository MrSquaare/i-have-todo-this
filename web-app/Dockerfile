FROM node:20-alpine AS base

ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"

WORKDIR ${APP_DIRECTORY}

COPY ./package.json ./package-lock.json ./
COPY ./common/types/package.json ./common/types/
COPY ./web-app/package.json ./web-app/

RUN npm ci


FROM base AS build

COPY ./common/types ./common/types
RUN npm run build -w @common/types

ARG API_URL
ENV API_URL=${API_URL}

COPY ./web-app ./web-app
RUN npm run build -w web-app


FROM base

COPY --from=build ${APP_DIRECTORY}/common/types/dist/ ./common/types/dist/
COPY --from=build ${APP_DIRECTORY}/web-app/dist/ ./web-app/dist/
COPY --from=build ${APP_DIRECTORY}/web-app/public/ ./web-app/public/

RUN npm i --omit=dev

RUN npm cache clean -f

RUN apk add --no-cache dumb-init

EXPOSE 4000

ENTRYPOINT ["dumb-init", "--"]

CMD ["npm", "run", "start", "-w", "web-app"]
