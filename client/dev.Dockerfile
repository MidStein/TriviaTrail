FROM node:22.9-bookworm-slim
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
USER node
RUN echo 'set editing-mode vi' > ~/.inputrc
COPY . ./
EXPOSE 5173
