# Library Management API / BookTracker

A simple Library Management System backend API built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**.

---

## Features

- **Book Management**  
  - Create, read, update, delete books  
  - Filtering by genre, sorting, and pagination support  
  - Validation on all fields including unique ISBN  

- **Borrowing System**  
  - Borrow books with quantity and due date validation  
  - Checks and updates book availability and copies  
  - Aggregated summary of total borrowed books with book details  

- **Error Handling**  
  - Proper validation and error responses  
  - Clear error messages for missing or invalid data  

---

## Technologies Used

- Node.js  
- Express.js  
- TypeScript  
- MongoDB with Mongoose  
- ESLint & Prettier (optional for code quality)  

---## Setup Instructions

### Prerequisites

- Node.js (v16 or later recommended)  
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)  

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ananna-Datta/BookTracker-server.git
cd BookTracker-server