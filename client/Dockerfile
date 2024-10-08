FROM node:22.9-bookworm-slim AS builder
WORKDIR /build-stage
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:1.26.2-bookworm
RUN echo 'set editing-mode vi' >> /etc/inputrc
WORKDIR /data
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /build-stage/dist ./dist
EXPOSE 80
