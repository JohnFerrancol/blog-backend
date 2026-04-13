# Express Template

[Link To Front End Repository](#)<br/><br/>
[![The Odin Project](https://img.shields.io/badge/The%20Odin%20Project-A9792B?logo=theodinproject&logoColor=fff)](#)

## Overview

This is a project from [The Odin Project](https://theodinproject.com): [Project: Blog API](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api). This is where we created a Blog website which has an Express server which listens to two front-ends. The first frontend is to allow users to read and comment on posts. The other frontend allows only admin users write, edit and publish posts.

## Learning Points

- Understand the interaction between a Front-end Web Application like React with an Express Back-end through the use of REST APIs
- Understand the best practises for the REST API framework and how to create routes for such APIs
- Implement API security best practises for APIs through the use of JSON Web Tokens and CORS

## Tech Stack

- [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
- [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
- [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
- [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#)
- [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](#)
- [![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=000)](#)

## Getting Started

### Prerequisites

You will need to install the latest version of npm to get started on using this project

- npm

```sh
npm install npm@latest -g
```

### Installation

Getting started on running the webpack server to your localhost, localhost:8080

1. Cloning the repository

```sh
git clone git@github.com:JohnFerrancol/blog-backend.git
```

2. Navigate to blog-backend folder and install npm packages

```sh
cd blog-backend && npm install
```

3. Set up local environment and fill in DATABASE_URL, Session Secret and the Supabase information

```sh
cp .env.example .env
```

4. Run prisma migrations to create the database tables

```sh
npx prisma migrate dev
```

5. Generate prisma client

```sh
npx prisma generate
```

6. Running the Express server

```sh
npm run start
```

4. Open in web browser via: http://localhost:3000

## Roadmap

- [x] Add Authentication Routes to the API using Passport.js, using the local strategy for Authentication and the JWT strategy for Authorisation
- [x] Add Routes for the public users to the API to allow users to view and comment on posts/blogs
- [x] Add Routes for the admin users to the API to allow admin users to create, edit and delete posts
