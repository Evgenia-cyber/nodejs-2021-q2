FROM node:14-alpine
WORKDIR /user/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm","run","dev"]