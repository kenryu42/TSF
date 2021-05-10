yarn install
cd ./dataQuery
python3.9 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
npm install
deactivate
echo "--------Setup Completed--------"
