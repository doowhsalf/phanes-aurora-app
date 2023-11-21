TEMPFILE='source/public/buildstuff/tri_build_number.txt'
METAFILE='source/public/buildstuff/tri_build_meta.txt'
CHECKFILE='build_performed.time'

# Loop goes here
  # Fetch the value and increase it
  COUNTER=$[$(cat $TEMPFILE) + 1]
  Mdate="$(date +"%Y%m%d_%H%M%S")"
  GITINFO="$(git log --format="%H" -n 1)"
  echo $COUNTER
  # Store the new value
  echo $COUNTER > $TEMPFILE
  echo $Mdate > $CHECKFILE
  echo "gudrun.search build was processed at: $Mdate" > $METAFILE
  echo "GIT Info: $GITINFO" >> $METAFILE
  echo "Build number: $COUNTER" >> $METAFILE
# Loop done, script done, delete the file
