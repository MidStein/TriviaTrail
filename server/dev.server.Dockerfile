FROM python:3.12-slim-bookworm

RUN echo 'set editing-mode vi' >> /etc/inputrc

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000
