# Appointment Manager
This is a React project that uses Firebase Auth REST API for authentication 
  and Firebase Database REST API for "Appointment" manipulation 

## Install
1) node.js https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi
2) yarn https://github.com/yarnpkg/yarn/releases/download/v1.22.19/yarn-1.22.19.msi for .msi download
    or https://github.com/yarnpkg/yarn/releases/tag/v1.22.19 if the .msi doesn't work
    
## Usage
1) Run "npm install --global yarn" in the extracted folder
2) Run "yarn install" to fully install node.js and yarn into the project
3) Run "yarn start" to view the project

## Description
This application has the user login which if accepted gives the user a token that gives them permission to access the page and gets the users ID.
  The token will deactivate after a while of inactivity and the user will be logged out.
  If the user information is correct they will be sent to the appointments page, 
  where they are then allowed  to add, edit, and delete appointments as well as logout.
  All appoinment data is unique to the user so that each user is able to have their own separate appointments.
