ARG NODE_VERSION=16-alpine3.12

FROM node:${NODE_VERSION}

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY package*.json ./

COPY . ${APP_HOME}

RUN yarn

RUN chmod 777 /app/node_modules

CMD ["yarn", "run", "dev", "--", "--host", "0.0.0.0"]


