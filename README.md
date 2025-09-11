# Maintenly
*A vehicle maintenance log for car owners.*
A full-stack vehicle maintenance application built with React, TypeScript, Vite, Bootstrap, Node.js, MongoDB, and a custom API.

## Features
- User can add, edit, and delete maintainance repairs completed 
- Add, edit, and delete Vehicles to account. 
- User can see when the last repair was completed
- User can see when the next recommended repair will be based on mileage
- User can choose between all the vehicles they own to see records
 
## Tech Stack 

| Frontend     | Backend / API | Database | Tools      |
|--------------|---------------|----------|------------|
| React, Vite, | Node.js       | MongoDB  | Git, VS    |
| TypeScript,  | Express       |          | code       |
| Bootstrap    | REST API      |          | Postman    |

## Backend Setup (Node.js + MongoDB + Express + Cors = .Env)
![Installed Dependencies](/images/ReadMeFile/Backend/DependencyInstall.png)
- Installed dependencies .env, Node.js, Express, mongoose, and cors

- connected to the mongoDB through the Mongo_URI 

- created  a Schema to define what the vehcle looks like so that all the vehicles follow the same structure.

- Built the CRud API endpoints GEt, Post, Put, and Delete.

-Tested all endpoints in postman and verified data was being stored and changed in MongoDB.


## Frontend Setup (React + vite + TypeScript + BootStrap)
```bash
# clone the repo
git clone https://github.com/wilsonl1/maintenly.git

# go into frontend folder
cd maintenly/frontend

# add vite and react in Frontend
npm create vite@latest . -- --template react-ts

# install dependencies 
npm install

# start dev server 
npm run dev
