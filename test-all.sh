#! /bin/bash

export BASE=/Volumes/StorageDrive/jmthompson/git/gamefinder

open ${BASE}/artifact/TestSuite.html

open ${BASE}/state/TestSuite.html

open ${BASE}/model/TestSuite.html

cd view
./viewtest-suite.sh

cd ../container
./viewtest-suite.sh
