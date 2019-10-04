FROM node:10

ENV NODE_ENV=development

RUN npm install -g yarn

COPY ./package.json .
COPY . /
RUN ls

RUN yarn install
RUN yarn build

# CMD yarn dev:server
CMD ["pm2-runtime", "app/server"]
