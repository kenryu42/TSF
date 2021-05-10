#!/bin/bash
set -e
source .venv/bin/activate
python queryTSgraphQL.py 
node formData.js 
node queryFlow.js 
node mergeData.js 
cp data.json ../src/.
echo "--------Database Creation Completed--------"
echo ""
deactivate
