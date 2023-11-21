#!/bin/sh

# Input file
CHECKFILE='build_performed.time'
# How many seconds before file is deemed "older"
OLDTIME=800
MINUTES=$((OLDTIME/60))
# Get current and file times
CURTIME=$(date +%s)
FILETIME=$(stat $CHECKFILE -c %Y)
TIMEDIFF=$(expr $CURTIME - $FILETIME)

# Check if file older
if [ $TIMEDIFF -gt $OLDTIME ]; then
   echo "BuildIt"
   sh build_perform.sh
fi
if [ $OLDTIME -gt $TIMEDIFF ]; then
   echo "Last build was already processed within $OLDTIME seconds i.e. $MINUTES minutes Build has been stopped."
fi
