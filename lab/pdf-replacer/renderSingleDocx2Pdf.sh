#!/bin/bash
echo "Rendering PDF with" 
unoconv -f pdf $1
echo "Done"
 