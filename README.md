# BTST Technologies - Full Stack Intern Assignment

## Job Description

For the detailed job description, please refer to the following [link](https://bitbucket.org/btst-solutions/news-app/src/master/BE-assignment.md).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- CRUD operations for managing user authentication, and tasks management
- Single and multiple document queries
- Distinct endpoints for various operations

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- Docker
- Git

### Installation

#### 1. Clone the repository.

```bash
git clone https://github.com/kvardaan/BTST_Assignment.git
cd BTST_Assignment
```

#### 2. Install dependencies.

```bash
npm install
```

#### 3. Configure Environment Variables

In the root of the directory, create a .env file by copying the .env.example file.

```bash
cp .env.example .env
```

#### 4. Set Up Database (PostgreSQL)

You can use a cloud service like Neon or Supabase, or run a local instance with Docker -

- Local PostgreSQL with Docker:

```bash
docker-compose up -d
```

Update the `.env` file with your PostgreSQL connection details -

- Local instance -

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_management"
```

- Hosted instance

Add the instance database url in the `.env` file at the variable `DATABASE_URL`

#### 5. Run Prisma migrations -

```bash
npm run db:migrate
```

#### 6. Seed the database -

```bash
npm run db:seed
```

## Usage

To run the application locally -

```bash
npm run dev
```

To watch the database -

```bash
npm run studio
```

## API Endpoints

### Users

- POST /api/v1/auth/signup - Add a new user
- POST /api/v1/auth/login - Login the user
- POST /api/v1/auth/logout - Logout the user
- GET /api/v1/user - Get user details by ID

### Tasks

- GET /api/v1/tasks - Get all the tasks of a user
- GET /api/v1/tasks/:id - Get task details by ID
- POST /api/v1/tasks/ - Add a new task
- PATCH /api/v1/tasks/:id - Edit a task
- DELETE /api/v1/tasks/:id - Delete a task

Note: Replace `:id` with the actual ID of the user or task when making requests.

The application will be available at `http://localhost:3000`.

> [!NOTE]  
> Suggestions are welcomed for additional endpoints or improvements to the existing API structure. If you have ideas for enhancing the functionality or user experience, please feel free to open an issue or submit a pull request.
