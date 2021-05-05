# SEPM Sem A - 2021 Project
MIT OpenCourseWare Search Engine

## Team Members
* Tran Vinh Nghia - S3713031
* Nguyen Dinh Long - S3804737
* Huynh Le Minh Hieu - S3804595
* Nguyen Thu Hang - S3798976

## Run Requirements
* NodeJS v12 or higher (v14 recommended).
* NPM 

## Backend Development Requirements
* MongoDB (v3.3 or higher)

## How to run

* Frontend

  ```
  # change into frontend directory
  cd frontend
  
  # installing dependencies
  npm install
  
  # start the project
  npm start
  ```
  
* Backend

  ```
  # change into backend directory
  cd backend
  
  # installing dependencies
  npm install
  
  # start the project
  node index.js
  ```
 
* audio-process-backend

  ```
  # change into directory
  cd audio-process-backend
  
  # installing dependencies
  npm install
  
  # start the project 
  # default env
  node index.js
  # local test env
  node -r dotenv/config index.js dotenv_config_path=./.env.local.test
  ```
