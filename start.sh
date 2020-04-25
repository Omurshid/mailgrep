#!/bin/bash
source api/venv/bin/activate
npm start & cd api && flask run --no-debugger

