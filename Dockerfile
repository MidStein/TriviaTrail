FROM nginx:1.26-bookworm
RUN echo 'set editing-mode vi' >> /etc/inputrc
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
