#!/bin/bash

# puppeteer test scripts can be flakey. one example is how our datepicker tests will fail
# once every ~10 or so runs. this script was written to efficiently run a command n times
# and count the number of successful exits. most people accept some unreliability in e2e
# tests, so some amount of false-negatives will not cause this script to immediately exit.

# sh runn.sh -n 30 yarn e2e:test datepicker-unreliable.e2e.js

ok=0
n=0
command=""

while :; do
  case $1 in
    -n)
      n=$2
      shift
      shift
      command="$@"
      ;;
    *) break
  esac
  shift
done


for (( c=0; c<$n; c++ ))
do
  COMMAND $command
  if [ $? -eq 0 ]
  then
    ok=$(($ok + 1))
  else
    echo "command exited with a non-zero exit code"
  fi
done

echo "command successfully ran $ok times out of $n."