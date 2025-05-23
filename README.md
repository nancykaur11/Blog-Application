# 📝 Blog Application (MERN Stack)

A full-featured, full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) enabling users to seamlessly create, manage, and explore blog posts with an intuitive interface.

---

## 🚀 Project Overview

This modern blogging platform is designed using a modular, client-server architecture. The frontend is developed in **React.js** with **Material-UI** for responsive, sleek UI components, while the backend is powered by **Node.js** and **Express.js**, with **MongoDB** as the database.

### 🔑 Key Functionalities

- User Authentication
- Blog CRUD Operations
- Search and Filter Capabilities
- Responsive Design
- Protected Routes

---

## 🔄 Application Workflow

### 🔐 Authentication Flow

#### 1. User Registration
- Users input **email**, **username**, and **password**.
- Backend validates input and checks for duplicate users.
- Password is hashed using `bcryptjs`.
- A **JWT token** is generated and stored in `localStorage`.
- User is redirected to their dashboard.

#### 2. User Login
- User credentials are verified against the database.
- On success, a JWT token is issued and stored.
- User is redirected to the dashboard with access to protected routes.

---

### 📝 Blog Management Flow

#### 1. Create Blog
- User accesses the “Create Blog” form with **title**, **content**, and **category** fields.
- On form submission, blog data is sent to the backend.
- Backend validates the data and stores it in MongoDB.
- User is redirected to their blog list view.

#### 2. Read Blogs
- Blogs are fetched from the backend when the component mounts.
- Displayed in a **responsive grid or list**.
- Users can **filter by category** or **search by title or author**.

#### 3. Update Blog
- Authenticated users can edit their own blogs.
- The edit form is **pre-filled** with existing blog data.
- On submission, changes are validated and updated in MongoDB.
- UI reflects the update instantly.

#### 4. Delete Blog
- Users confirm the deletion of a blog.
- Backend verifies blog ownership.
- The blog is deleted from the database.
- The UI is updated to reflect the deletion.

---

## 📦 Tech Stack

| Technology | Description                |
|------------|----------------------------|
| MongoDB    | NoSQL Database             |
| Express.js | Backend Framework          |
| React.js   | Frontend UI Library        |
| Node.js    | Server Environment         |
| Material-UI| UI Component Library       |
| JWT        | Authentication             |
| bcryptjs   | Password Hashing           |

