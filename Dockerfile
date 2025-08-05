FROM node:24
FROM nginx:alpine

COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app
COPY . .

RUN npm install -g expo-cli
RUN npm install

RUN npx expo export:web --output-dir web-build

CMD ["echo", "Expo build completed."]
