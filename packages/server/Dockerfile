FROM node:22-alpine as builder

WORKDIR /app

# Copy package.json and yarn.lock
COPY ./package.json ./
COPY ./yarn.lock ./
# For monorepo structure, copy workspace configuration if needed
COPY ./tsconfig.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application code
COPY ./apps ./apps
COPY ./libs ./libs
COPY ./config ./config
COPY ./nest-cli.json ./
COPY ./.env.production ./.env

# Build the application
RUN yarn build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy production dependencies and build files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

# Copy migration scripts
COPY ./scripts ./scripts

# Expose the port your app runs on
EXPOSE 4000

# Command to run migrations and start the application
# TODO: I have Procfile in my web-server directory. Why should I need it?
CMD ["sh", "-c", "yarn migration:run && yarn start:prod:web-server"]
