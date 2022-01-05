FROM node:alpine

WORKDIR /app

COPY graphile/yarn.lock graphile/package.json /app/

RUN yarn --production

COPY graphile/index.js .

CMD [ "index.js" ]