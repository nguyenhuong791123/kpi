#!/bin/bash

ISPATH=$(pwd)
DBDIR=$ISPATH/db
DBUIDIR=$ISPATH/dbui
RUNSUDO=$(which sudo)
RUNCD=$(which cd)
RUNMKDIR=$(which mkdir)

if [ -d "/$DBDIR" ]; then
  echo "${DBDIR} is exist..."
else
  ###  Create Dir if $DIR does NOT exists ###
  echo "Create: ${DBDIR} and continue..."
  $RUNSUDO $RUNMKDIR $DBDIR
fi

if [ -d "/$DBUIDIR" ]; then
  echo "${DBUIDIR} is exist..."
else
  ###  Create Dir if $DIR does NOT exists ###
  echo "Create: ${DBUIDIR} and continue..."
  $RUNSUDO $RUNMKDIR $DBUIDIR
fi

COMPOSENAME=docker-compose-kpi.yml
RUNCOMPOSE=$(which docker-compose)

$RUNCOMPOSE -f $COMPOSENAME down
$RUNCOMPOSE -f $COMPOSENAME up -d

GETCODE=$1
if [ -z $GETCODE ]; then
  echo "Not Clone Code !!!"
else
  echo "$(pwd)"
fi
