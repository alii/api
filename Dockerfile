FROM oven/bun
WORKDIR /app
COPY package.json .
COPY bun.lockb .
RUN bun install --production
COPY . .
# Wipe bun node module cache
RUN rm -rf /root/.bun/install/cache
# We don't need bunx
RUN rm /usr/local/bin/bunx
CMD ["bun", "start"]