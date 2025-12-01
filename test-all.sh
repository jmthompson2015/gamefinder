#! /bin/bash

export BASE="/Users/jmthompson/Documents/SoftwareDev/git/gamefinder"

open "${BASE}/artifact/TestSuite.html"

open "${BASE}/state/TestSuite.html"

open "${BASE}/model/TestSuite.html"

cd view
./viewtest-suite.sh

cd ../container
./viewtest-suite.sh
