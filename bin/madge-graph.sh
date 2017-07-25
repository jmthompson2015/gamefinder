#! /bin/bash

export HOME=/Volumes/StorageDrive/jmthompson
export TARGET=${HOME}/git/gamefinder/src/main/js
export FORMAT="--format amd"
#export LAYOUT="--layout dot"
export LAYOUT="--layout neato"
#export LAYOUT="--layout fdp"
#export LAYOUT="--layout twopi"
#export LAYOUT="--layout circo"

madge ${FORMAT} ${LAYOUT} --image gamefinder.svg ${TARGET}
