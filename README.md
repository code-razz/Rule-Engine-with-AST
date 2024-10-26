# Rule-Engine-with-AST

This project is a Rule Engine that uses Abstract Syntax Trees (AST) to parse and evaluate complex logical expressions. It is designed to handle rules defined in a string format and evaluate them against data objects. The project is structured with a backend built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), and a frontend developed with [React](https://reactjs.org/).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Parse rule strings into ASTs for easy manipulation and evaluation.
- Evaluate rules against data objects to determine if they meet specified conditions.
- Combine multiple rules using logical operators.
- RESTful API for managing rules in a [MongoDB](https://www.mongodb.com/) database.
- User-friendly React frontend for rule creation, combination and evaluation.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 16 or later
- **npm**: Version 7 or later
- **MongoDB**: A running instance of MongoDB (local or cloud-based)
- **Git**: Version control system to clone the repository

## Installation

1. **Clone the repository**:
   ```bash
   https://github.com/code-razz/Rule-Engine-with-AST
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add your MongoDB connection string:
     ```
     MONGO=your_mongodb_connection_string
     ```

3. **Frontend Setup**:
   - Navigate to the client directory:
     ```bash
     cd ../client
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```

## Usage

### Running the Backend

1. Start the backend server:
   ```bash
   node index.js
   ```
   The backend server will run on `http://localhost:8800`.

### Running the Frontend

1. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173`.

### Interacting with the Application

- Use the frontend interface to create, combine, and evaluate rules.

- The backend API provides endpoints for creating, updating, deleting, and retrieving rules.

## Project Structure

- **backend**: Contains the server-side code, including API routes and database models.
- **client**: Contains the client-side code, including React components and utility functions.
- **client/src/components**: React components for the user interface.
- **client/src/functions**: Utility functions for parsing and evaluating rules.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.