#!/bin/bash
echo "Rendering PDFs"
echo "first set db link"
 ssh -fN -L 3348:localhost:3306 -p 2251 johang@217.70.37.112 -N
echo "run the script"
node render-pdf-from-word_v4.js
echo "Done"
 