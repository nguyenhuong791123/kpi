#!/bin/bash

if [ "$1" == "insights-web" ]
then
    echo "Setup[$1] !!!"
    curl -sL https://rpm.nodesource.com/setup_11.x | bash -
    yum install nodejs -y
    npm update -g npm
    echo "Complete Setup[$1] !!!"
elif [ "$1" == "insights-cdk" ]
then
    echo "Setup[$1] !!!"
    echo "Complete Setup[$1] !!!"
elif [ "$1" == "insights-jenkins" ]
then
    echo "Setup[$1] !!!"
    echo "Complete Setup[$1] !!!"
elif [ "$1" == "insights-service" ]
then
    echo "Setup[$1] !!!"
    echo "Complete Setup[$1] !!!"
else
    echo "Not Setup !!!"
fi