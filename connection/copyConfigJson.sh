#!/bin/bash

if [[ $# -lt 1 ]]; then
  echo "FILE_PATH is required"
else
  FILE_PATH=$1
  shift
fi

rm connection-org1.json

cp $FILE_PATH ./connection-org1.json

echo $(sed -e "s/grpcs:\/\/peer0\.org1\.example\.com/grpcs:\/\/localhost/" \
    -e "s/grpcs:\/\/peer1\.org1\.example\.com/grpcs:\/\/localhost/" \
    -e "s/https:\/\/ca\.org1\.example\.com/https:\/\/localhost/" \
    ./connection-org1.json) > connection-org1.json
    