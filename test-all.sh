#! /bin/bash

export BASE="/Users/jmthompson/Documents/Software Development/git/gamefinder"

open "${BASE}/artifact/TestSuite.html"

open "${BASE}/state/TestSuite.html"

open "${BASE}/model/TestSuite.html"

cd view
./viewtest-suite.sh

cd ../container
./viewtest-suite.sh
