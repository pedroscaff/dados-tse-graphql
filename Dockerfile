FROM ubuntu:18.10
RUN apt-get update
RUN apt-get install wget -y
RUN apt-get install curl -y
RUN wget -O mongodb.tgz https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.0.2.tgz
RUN tar -xvzf mongodb.tgz
RUN mv mongodb-linux-x86_64-ubuntu1804-4.0.2 mongodb
ENV PATH="/mongodb/bin:${PATH}"
RUN mkdir -p /data/db
RUN echo "bind_ip = 0.0.0.0" > /etc/mongodb.conf
ENTRYPOINT mongod --config /etc/mongodb.conf
