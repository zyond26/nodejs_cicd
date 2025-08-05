# Stage 1: Build web with Expo
FROM node:24 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -g expo-cli
RUN npm install

COPY . .
RUN npx expo export --platform web --output-dir dist

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
