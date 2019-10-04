FROM node:10

ENV NODE_ENV=development

RUN npm install -g yarn

COPY ./package.json .
COPY ./src/server/index.ts ./src/server
RUN ls src/server
RUN pwd

RUN yarn install
RUN yarn build

# CMD yarn dev:server
CMD ["pm2-runtime", "app/server"]
