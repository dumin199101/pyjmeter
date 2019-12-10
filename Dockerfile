FROM ubuntu:latest
RUN  sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN  apt-get clean
RUN apt-get update


#JDK
ENV JAVA_VERSION="1.8.0_231"
ENV JAVA_HOME="/usr/local/jdk${JAVA_VERSION}"
ENV PATH="${PATH}:${JAVA_HOME}/bin"
COPY ./docker-src/jdk-${JAVA_VERSION}-linux-x64.tar.gz /tmp
RUN cd /tmp \
    && tar -zxvf jdk-${JAVA_VERSION}-linux-x64.tar.gz -C /usr/local




#JMETER
ENV http_proxy ""
ENV https_proxy ""

RUN mkdir /jmeterdocker
RUN mkdir -p /jmeterdocker/test
RUN mkdir -p /jmeterdocker/test/input/jmx
RUN mkdir -p /jmeterdocker/test/input/testdata
RUN mkdir -p /jmeterdocker/test/report/html
RUN mkdir -p /jmeterdocker/test/report/jtl
RUN mkdir -p /jmeterdocker/test/report/outputdata
RUN cd /jmeterdocker

ENV JMETER_VERSION=5.2.1
ENV JMETER_HOME=/jmeterdocker/apache-jmeter-${JMETER_VERSION}
ENV JMETER_PATH=${JMETER_HOME}/bin
ENV PATH=${JMETER_HOME}/bin:${PATH}

COPY ./docker-src/apache-jmeter-${JMETER_VERSION}.tgz /tmp

RUN cd /tmp \
&& tar -zxvf apache-jmeter-5.2.1.tgz -C /jmeterdocker





RUN apt-get install -y python-pip
RUN apt-get install -y cron
RUN env >> /dockerenv.txt
RUN bash /etc/init.d/cron restart
RUN pip install --upgrade pip
RUN pip install flask
RUN pip install setuptools
RUN pip install python-crontab

RUN apt-get install -y rsyslog
RUN apt-get install -y vim

RUN mkdir /PythonJmeter
WORKDIR /PythonJmeter
COPY  static  /PythonJmeter/static
COPY templates /PythonJmeter/templates
COPY ./*.* /PythonJmeter/
EXPOSE 5000
CMD ["python", "/PythonJmeter/app.py"]

