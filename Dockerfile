FROM node:18:alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .yarn .yarn
COPY .yarnrc.yml .
RUN yarn install
COPY . .

CMD ["yarn", "start"]