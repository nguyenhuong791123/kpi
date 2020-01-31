FROM centos:7
MAINTAINER nhdocker <huongnv@vnext.vn>

# 各パッケージをインストール
# pipやvirtualenvインストールも想定しています。
#ENV PYTHON_VER "3.7.0"
ARG ROOT_PASSWORD
ARG MODE_APP
# RUN yum -y update
# RUN yum -y groupinstall "Development Tools"
# RUN yum -y install \ 
#            kernel-devel \
#            kernel-headers \
#            gcc-c++ \
#            patch \
#            libyaml-devel \
#            libffi-devel \
#            autoconf \
#            automake \
#            make \
#            libtool \
#            bison \
#            tk-devel \
#            zip \
#            wget \
#            tar \
#            gcc \
#            zlib \
#            zlib-devel \
#            bzip2 \
#            bzip2-devel \
#            readline \
#            readline-devel \
#            openssl \
#            openssl-devel \
#            openssh-server \
#            git \
#            gdbm-devel \
#            python-devel \ 
#            firewalld

# ロケーション設定(日本語ロケールを設定)
# RUN localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
# ENV LANG="ja_JP.UTF-8" \
#     LANGUAGE="ja_JP:ja" \
#     LC_ALL="ja_JP.UTF-8"

# RUN ./bash.sh $MODE_APP

# python3系をインストール
# RUN yum install -y https://centos7.iuscommunity.org/ius-release.rpm
# RUN yum install -y python36u python36u-devel python36u-libs python36u-pip

# virtualenvインストール
# RUN pip3.6 install --upgrade pip
# RUN pip3.6 install virtualenv

#USER root
RUN echo "$ROOT_PASSWORD"
# RUN echo "$ROOT_PASSWORD" | passwd --stdin root 
# RUN sed -i "s/#PermitRootLogin yes/PermitRootLogin yes/g" /etc/ssh/sshd_config
#RUN systemctl start sshd.service
#RUN systemctl enable sshd.service
#RUN systemctl start firewalld.service
#RUN systemctl enable firewalld.service

# RUN sudo rm -f bash.sh
RUN mkdir -p /home/app
WORKDIR /home/app
ADD ./bash.sh bash.sh
RUN pwd
RUN chmod u+x bash.sh
RUN /bin/sh bash.sh ${MODE_APP}

CMD [ "/sbin/init" ]