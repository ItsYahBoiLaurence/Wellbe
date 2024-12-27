# dev build image
FROM node:lts-alpine3.16 AS development
WORKDIR /src/app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN ls -al
RUN yarn run core:build
RUN ls -al

# prod image
FROM node:lts-alpine3.16 AS production
WORKDIR /src/app
COPY --from=development /src/app/package.json ./
COPY --from=development /src/app/node_modules ./node_modules
COPY --from=development /src/app/dist/apps/core ./dist/apps/core
EXPOSE 5200
CMD ["node", "dist/apps/core/main"]
