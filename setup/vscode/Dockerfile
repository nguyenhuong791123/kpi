FROM codercom/code-server:v2

ENV DEBCONF_NOWARNINGS yes
RUN sudo apt-get update
RUN sudo apt-get install nodejs -y
RUN sudo apt-get install npm -y

RUN curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
RUN sudo apt-get install nodejs -y
RUN sudo apt-get install python-pip python3-pip -y \
 && sudo pip3 install virtualenv \
 && sudo apt-get update -y \
 && sudo apt-get upgrade -y
 