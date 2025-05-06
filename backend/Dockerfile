FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Run Prisma Generate after code is copied and .env is accessible
RUN npx prisma generate

# Build TypeScript
RUN npm run build

CMD ["npm", "start"]
