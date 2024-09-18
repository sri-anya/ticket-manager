# Ticket Manager App


![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![React Router DOM](https://img.shields.io/badge/React%20Router%20DOM-CA4245?style=flat&logo=react-router&logoColor=white)
![Flask SQLAlchemy](https://img.shields.io/badge/Flask%20SQLAlchemy-003B57?style=flat&logo=flask&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

Welcome to the Ticket Manager App! This application allows users to manage their tickets efficiently with a user-friendly interface. It’s built with a React frontend and a Flask backend, using SQLite as the database.

## Features

- **User Authentication**: 
  - **Login**: Users can log in to access their tickets.
  - **Signup**: New users can create an account.
  - **Logout**: Users can securely log out of their session.
  
- **Ticket Management**:
  - View and manage your tickets.
  - Create new tickets.
  - Update ticket status.
  
- **Comments**:
  - Add comments to tickets.
  - View comments associated with each ticket.
  
## Architecture

- **Frontend**: Built with React, featuring client-side routing for a seamless user experience.
- **Backend**: Developed with Flask, providing a robust API for managing users, tickets, and comments.
- **Database**: Utilizes SQLite for data storage, ensuring efficient and reliable data handling.

## Data Relationships

- **User and Tickets**: 
  - A user can create many tickets (one-to-many relationship).
  
- **Tickets and Assignees**:
  - There is a many-to-many relationship between tickets and users (assignees), allowing multiple users to be assigned to a ticket and a user to have multiple tickets.

- **Tickets and Comments**:
  - A user can create many comments on tickets, and each ticket can have multiple comments, allowing for in-depth discussions and updates.

## Association Proxy

To manage the many-to-many relationship between tickets and assignees, we employ an association proxy. This allows us to simplify access and manipulation of the relationships in the database.

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- SQLite

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ticket-manager-app.git
   cd ticket-manager-app
   ```

2. **Set up the backend**:
    - Navigate to the backend directory:
     ```bash
     cd server
     ```
    - Install dependencies:
    ```bash
    pipenv install && pipenv shell 
    ```
    - Run the Flask server
    ```bash
    python app.py
    ```

3. **Set up the frontend**:
   - Navigate to the frontend directory:
   ```bash 
   cd ../frontend
   ```
   - Install dependencies:
   ```bash
   npm install
   ```
   - Run the React app:
   ```bash
   npm run dev
   ```

### Usage
- Access the application through your browser at http://localhost:3000.
- Register a new account or log in with existing credentials.
- Start managing your tickets!

### Contributing
If you would like to contribute to the development of the Ticket Manager App, please feel free to fork the repository and submit a pull request.

Thank you for using the Ticket Manager App! We hope you find it useful.
