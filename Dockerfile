# specify the node base image with your desired version node:<version>
FROM node:9
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run start
