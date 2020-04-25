#!/bin/bash

sudo apt-get update
sudo apt update && sudo apt install yarn
sudo apt-get install nodejs
sudo apt install python3-venv
cd api && virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
sudo apt-get install npm
npm install


