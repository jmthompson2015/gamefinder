#! /bin/bash

export HOME=/Volumes/StorageDrive/jmthompson
export TARGET=${HOME}/git/gamefinder/src/main/js
export FORMAT="--format amd"
#export LAYOUT="--layout dot"
export LAYOUT="--layout neato"
#export LAYOUT="--layout fdp"
#export LAYOUT="--layout twopi"
#export LAYOUT="--layout circo"

# All
madge ${FORMAT} ${LAYOUT} --image gamefinder.svg ${TARGET}

# Data
#madge ${FORMAT} ${LAYOUT} --exclude '^(abilitystats|damagestats|pilotstats|process|upgradestats)' --image starfighterSquadronsData.svg ${TARGET}

# Process
#madge ${FORMAT} ${LAYOUT} --exclude '^(abilitystats|damagestats|pilotstats|process/ui|upgradestats)' --image starfighterSquadronsProcess.svg ${TARGET}

# UI
#madge ${FORMAT} ${LAYOUT} --exclude '^(abilitystats|damagestats|pilotstats|upgradestats)' --image starfighterSquadronsUI.svg ${TARGET}

# All
#madge ${FORMAT} ${LAYOUT} --image bgg.svg ${TARGET6}

# All
#madge ${FORMAT} ${LAYOUT} --image simulator.png ${TARGET2}

# All
#madge ${FORMAT} ${LAYOUT} --image ai.png ${TARGET3}

# All
#madge ${FORMAT} ${LAYOUT} --image lotrlcg.png ${TARGET4}

# All
#madge ${FORMAT} ${LAYOUT} --image tardissimulator.png ${TARGET5}

# All
#madge ${FORMAT} ${LAYOUT} --image sudoku.svg ${TARGET7}
