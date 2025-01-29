FROM imbios/bun-node
WORKDIR /app
COPY package.json .
COPY bun.lock .
RUN bun install --production
COPY . .
CMD ["bun", "start"]