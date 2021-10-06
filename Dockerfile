# Stage 0 - Build frontend
FROM node:12.16.3-alpine as Build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run Build

CMD ["npm", "run", "start"]