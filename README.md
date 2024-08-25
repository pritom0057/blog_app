
# Blog Application

## Overview

This is a full-stack blog application. It consists of a backend server built with Node.js and Express, a frontend application built with Angular, and a PostgreSQL database. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts.

## Project Structure

- **Backend**: Node.js with Express, connected to a PostgreSQL database.
- **Frontend**: Angular application for a user interface.
- **Database**: PostgreSQL for data storage.

## Prerequisites

- **Node.js** and **npm** installed on your machine.
- **Angular CLI** installed globally for the frontend (`npm install -g @angular/cli`).
- **PostgreSQL** installed and running locally (if not using Docker).
- **Docker** and **Docker Compose** installed (if using Docker).

## Setup and Running the Application

### Backend

#### 1. Running the Backend Locally

1. **Navigate to the backend directory**:
   ```bash
   cd blog-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create/Edit `.env` file** in the `blog-backend` directory with the following content:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   ```

4. **Start the backend server**:
   ```bash
   npm run dev
   ```
   This will start the backend server in development mode.

#### 2. Running the Backend with Docker

1. **Navigate to the backend directory**:
   ```bash
   cd blog-backend
   ```

2. **Run the backend using Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   This command will build the Docker image for the backend and start the service along with a PostgreSQL container.

### Frontend

#### 1. Running the Frontend Locally

1. **Navigate to the frontend directory**:
   ```bash
   cd blog-client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Angular application**:
   ```bash
   ng serve
   ```
   This will start the Angular application in development mode. Open your browser and go to `http://localhost:4200`.

#### 2. Running the Frontend with Docker

1. **Navigate to the frontend directory**:
   ```bash
   cd blog-client
   ```

2. **Run the frontend using Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   This command will build the Docker image for the frontend and start the Angular application.

### Accessing the Application

- **Frontend**: Open your browser and go to `http://localhost:4200`.
- **Backend API**: The backend API is accessible at `http://localhost:3000/api/posts`.

### Important Notes

- **Database Connectivity**: Ensure that the backend service can connect to the PostgreSQL database. The `.env` file or `docker-compose.yml` file should define the `postgres` service correctly, and the backend should reference this service name as the host for the database connection.

## Testing

### Backend

1. **Run tests**:
   ```bash
   cd blog-backend
   npm test
   ```

### Frontend

1. **Run tests**:
   ```bash
   cd blog-client
   ng test
   ```

## Environment Configuration

- Use `.env` files to manage environment-specific variables. Ensure that your backend `.env` file is properly configured with database connection details.

## Docker Configuration

- **Backend**: Dockerfile and Docker Compose are set up to build and run the backend service along with a PostgreSQL container.
- **Frontend**: Dockerfile and Docker Compose are set up to build and run the Angular frontend application.

## Known Issues

- Ensure ports `3000` (backend) and `4200` (frontend) are free before running the containers.
- The backend service must have a successful connection to the `postgres` container or a local PostgreSQL instance for the application to work correctly.

## Conclusion

This project demonstrates a full-stack application setup using Docker for containerization, allowing seamless deployment of both the frontend and backend services. Follow the steps provided to build, run, and test the application successfully.