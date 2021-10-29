# Quick Guide

## Setup virtual environment

- I recommend using python's venv module
- Docs: https://docs.python.org/3/library/venv.html

## Running main file

- Navigate to src/
- Start virtual env
- run: python main.py
  - or: python -m main.py

## To run tests

- in src/: python -m pytest
- helpful flags
  - verbose: -v
  - (write output to file): ... pytest > <file-name>.txt
  - specific file: ... pytest <path/to/file>

## Formatting tool

- I am using **autopep8** but you can replace with your own
