# Blog Application Backend

## Overview

This is the backend server for a full-stack blog application. It is built with Node.js and Express and connects to a PostgreSQL database. The backend provides RESTful API endpoints to perform CRUD (Create, Read, Update, Delete) operations on blog posts.

## Project Structure

- **Node.js** with **Express**: The core framework used to build the backend server.
- **PostgreSQL**: The database used for storing blog post data.
- **Sequelize**: An ORM (Object-Relational Mapping) library for Node.js to interact with the PostgreSQL database.

## Prerequisites

- **Node.js** and **npm** installed on your machine.
- **PostgreSQL** installed and running locally (if not using Docker).
- **Docker** and **Docker Compose** installed (if using Docker).

## Setup and Running the Backend

### 1. Running the Backend Locally

1. **Navigate to the backend directory**:
   ```bash
   cd blog-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `blog-backend` directory with the following content:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   ```

4. **Ensure PostgreSQL is running** and create a database with the name specified in `DB_NAME`.

5. **Run database migrations** to set up the initial database schema:
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Start the backend server**:
   ```bash
   npm run dev
   ```
   This will start the backend server in development mode on `http://localhost:3000`.

### 2. Running the Backend with Docker

1. **Navigate to the backend directory**:
   ```bash
   cd blog-backend
   ```

2. **Run the backend using Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   This command will build the Docker image for the backend and start the service along with a PostgreSQL container.

### API Endpoints

- **GET** `/api/posts` - Retrieve all blog posts with optional pagination.
- **GET** `/api/posts/:id` - Retrieve a single blog post by ID.
- **POST** `/api/posts` - Create a new blog post.
- **PUT** `/api/posts/:id` - Update an existing blog post by ID.
- **DELETE** `/api/posts/:id` - Delete a blog post by ID.

### Testing

1. **Run tests**:
   ```bash
   npm test
   ```
   This will run all the unit tests for the backend.

## Environment Configuration

- Use a `.env` file to manage environment-specific variables like database connection details.
- Make sure the `.env` file is correctly configured for your local or Docker environment.

## Docker Configuration

- The `Dockerfile` and `docker-compose.yml` are set up to build and run the backend service along with a PostgreSQL container.

## Known Issues

- Ensure the port `3000` is free before running the backend server locally.
- The backend service must have a successful connection to the `postgres` container or a local PostgreSQL instance for the application to work correctly.

## Conclusion

This backend service provides a robust and scalable foundation for a full-stack blog application. Follow the steps provided to build, run, and test the backend successfully.
