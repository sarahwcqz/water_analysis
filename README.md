# Water analysis

## Overview
1. [Introduction](#introduction)
2. [Set up](#setup)
3. [Usage](#usage)
4. [Development choices](#development-choices)

## Introduction
This project is a simple Flask-based web application used to visualize and explore water analysis data.

## Set up
1. *(Optional)* Create and activate a virtual environment

    ```bash
    python3 -m venv <venv_name>
    source <venv_name>/bin/activate
    ```

2. Install dependencies

    ```bash
    pip install -r requirements.txt
    ```

3. Run the application

    ```bash
    python3 app.py
    ```

   The application will be available at http://127.0.0.1:5000 by default.

## Usage
- Open the application in a web browser
- Interact with the interface to visualize water analysis data


## Development choices
### Architecture
```
├── README.md
├── app.py
├── data.json
├── requirements.txt
├── static
│   ├── css
│   │   └── style.css
│   └── js
│       └── main.js
└── templates
    └── index.html
```
- app.py : Application entry point and Flask server configuration
- data.json : Contains water analysis data
- requirements.txt : Python dependencies required to run the project
- static/ : Frontend assets
- templates/ : HTML templates rendered by Flask


### 



