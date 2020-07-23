FROM node:11-alpine

COPY . . 

RUN yarn install

EXPOSE 80

CMD yarn start
