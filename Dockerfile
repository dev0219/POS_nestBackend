FROM node:19-alpine3.17 as development

WORKDIR /usr/src/app

COPY --chown=node:node ["package.json", "yarn.lock", "./"]

RUN yarn install

USER node

FROM node:19-alpine3.17 as build

ARG app=api

WORKDIR /app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build ${app}

ENV NODE_ENV=production

RUN yarn install --production && yarn cache clean --force

USER node

FROM node:19-alpine3.17 as production

ARG app=api

COPY --chown=node:node --from=build /app/node_modules ./app/node_modules

COPY --chown=node:node --from=build /app/dist ./app

WORKDIR /app

RUN chown -R node /app

COPY --chown=node:node --from=build /app/node_modules ./node_modules

COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE 3000

USER node
ENV APP_MAIN_FILE=apps/${app}/apps/${app}/src/main.js

CMD node ${APP_MAIN_FILE}
