FROM node:lts-alpine as base


WORKDIR /code

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM base as prod

ENV NODE_ENV production

EXPOSE 5000

CMD ["npm", "start"]
