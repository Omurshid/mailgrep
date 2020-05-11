FROM ubuntu:16.04

#MAINTANER Your Name "youremail@domain.tld"

RUN apt-get update -y &&\
    apt-get install -y python python-pip

RUN export FLASK_APP=app.py

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

CMD ["flask", "run"]