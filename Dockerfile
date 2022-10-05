FROM node:14 AS base
WORKDIR /app
COPY package.json .

FROM base AS dependencies
RUN yarn --no-progress

FROM dependencies AS development
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 3333
CMD yarn dev

# Production
FROM dependencies AS production
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build
EXPOSE 3333
CMD yarn start