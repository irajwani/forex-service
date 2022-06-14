FROM node:14.17.4-alpine as dev
WORKDIR /usr/src/app
COPY package*.json ./
#RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:14.17.4-alpine as prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=dev /usr/src/app/dist ./dist
# COPY wait-for-it.sh .
# RUN apk update && apk add bash
EXPOSE 3000

CMD ["node", "dist/main"]