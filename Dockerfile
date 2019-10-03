FROM node:10

ENV NODE_ENV=development

RUN npm install -g yarn

COPY ./package.json .

RUN yarn install

CMD yarn dev:server
