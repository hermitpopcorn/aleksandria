FROM node:18-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm config set store-dir /pnpm/store/v3 --global

WORKDIR /app

CMD ["sh", "-c", "pnpm install && pnpm run dev"]
