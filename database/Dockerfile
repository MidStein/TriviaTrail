FROM postgres:16.4-bookworm
RUN echo 'set editing-mode vi' >> /etc/inputrc
COPY postgresql-dump .
COPY init-user-db.sh /docker-entrypoint-initdb.d/init-user-db.sh
EXPOSE 5432
