FROM node:19.9.0-slim
WORKDIR /app
RUN npm install -g npm@7.24.2 && npm install react-scripts --force && npm install --save-dev eslint-plugin-react && npm i cors
COPY package*.json ./
RUN npm install
COPY public public
COPY src src
EXPOSE 3000
CMD ["npm", "start"]
