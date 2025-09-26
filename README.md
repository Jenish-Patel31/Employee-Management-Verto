# Employee Management System

A simple CRUD application for managing employee data. Built with React frontend and Node.js backend.

## Features

- Add, edit, delete employees
- Search and filter employees
- Sort table columns
- Show/hide columns
- Export data to CSV
- Responsive design

## Tech Stack

**Backend:**
- Node.js + Express
- SQLite database
- RESTful API

**Frontend:**
- React + Vite
- Tailwind CSS
- Axios for API calls

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Database

The application uses SQLite database which is automatically created when you start the backend server. The database file `database.sqlite` will be created in the backend folder.

**Database Schema:**
- `employees` table with fields: id, name, email, position, created_at, updated_at

## Running Tests

To run the backend tests:
```bash
cd backend
npm test
```

## API Endpoints

- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/health` - Health check

## Usage

1. Open the frontend application in your browser
2. Add employees using the "Add Employee" button
3. Edit employees by clicking the "Edit" button
4. Delete employees with the "Delete" button
5. Use the search bar to filter employees
6. Click column headers to sort data
7. Use the "Columns" button to show/hide columns
8. Export data using the "CSV" button

## Project Structure

```
VertoProject/
├── backend/          # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── app.js
│   ├── tests/
│   └── package.json
└── frontend/         # React frontend
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

## Design Choices

- Used SQLite for simplicity and no external database setup required
- Implemented client-side sorting and filtering for better performance
- Used modal for editing to keep the interface clean
- Added toast notifications for better user feedback
- Made the table responsive for mobile devices