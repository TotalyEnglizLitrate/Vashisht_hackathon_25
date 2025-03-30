# Vashisht Hackathon 2.O 2025 - Team Bit4Bit

### Problem Statement
Design a seamless and user-friendly solution that simplifies the discovery and utilization of responsible e-waste disposal channels for everyday consumers and small businesses.

### Solution Brief Description
An E-waste collection platform, acting as an intermediary between consumers/businesses and certified e-waste processing entities, addressing the primary issue of improper disposal due to a lack of convenience. It will have 2 parts to it, a mobile app & the collecter's website.

### Team Members
- [Ammog Warrier](https://github.com/Amps-ammog)
- [Narendra S](https://github.com/TotalyEnglizLitrate)
- [R Uthaya Murthy](https://github.com/Uthayamurthy/)
- [Varghese K James](https://github.com/vicfic18/)

## Installation and Setup

### Before you start
- Clone this repo and go into repo's directory
```bash
git clone https://github.com/TotalyEnglizLitrate/Vashisht_hackathon_25.git

cd Vashisht_hackathon_25/
```

- Add the necessary api keys as **Environment Variables in the .env file**

### Frontend
<TBA>

### Backend
> **Note :** Backend Tested on Python 3.12

- Create a virtual environment and activate it
```bash
python3 -m venv env
source env/bin/activate # For Linux
```
- Install all the necessary dependencies
```bash
pip install -r requirements.txt
```

## Usage

### Frontend

### Backend
Just run the main.py file. 
```bash
python3 backend/main.py
```
It will start a Uvicorn server and create a database with appropriate schema if it is the first start !
If you want to look at the API Endpoints, just visit
```
http://127.0.0.1:8000/docs
```
in your browser