FROM node:19-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .yarn .yarn
COPY .yarnrc.yml .
RUN yarn workspaces focus --production
COPY . .
RUN yarn cache clean
CMD ["yarn", "start"]