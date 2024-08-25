# Blog Application

## Overview

This is a full-stack blog application. It consists of a backend server built with Node.js and Express, a frontend application built with Angular, and a PostgreSQL database. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts.

## Project Structure

- **Backend**: Node.js with Express, connected to a PostgreSQL database.
- **Frontend**: Angular application for a user interface.
- **Database**: PostgreSQL for data storage.

## Prerequisites

- **Docker** and **Docker Compose** installed on your machine.

## Setup and Running the Application

### Backend

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

- **Database Connectivity**: Ensure that the backend service can connect to the PostgreSQL database. The `docker-compose.yml` file should define the `postgres` service correctly, and the backend should reference this service name as the host for the database connection.

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
- The backend service must have a successful connection to the `postgres` container for the application to work correctly.

## Conclusion

This project demonstrates a full-stack application setup using Docker for containerization, allowing seamless deployment of both the frontend and backend services. Follow the steps provided to build, run, and test the application successfully.

## Submission

- Ensure your code is committed and pushed to the repository.
- Submit the link to your GitHub repository for evaluation.
