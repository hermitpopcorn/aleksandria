FROM node:18-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm config set store-dir /pnpm/store/v3 --global
RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "run", "dev"]
