FROM node:10.16.0-alpine
WORKDIR /app
COPY . /app
RUN npm install --production
RUN npm i -g nodemon
EXPOSE 3000
CMD ["nodemon", "src/index.js"]