# Task Management

This Task Management App is designed to simplify how you organize and track your daily tasks.

## Project Description

A simple and intuitive web application to help you create, edit, complete, and delete tasks. The goal is to boost productivity and keep your workflow organized.

## Getting Started

### Prerequisites

- **Node.js** (includes npm)
- **npm** or **Yarn**

### Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/katy-pacheco/task-management-challenge
   ```

2. **Navigate to the project directory:**

   ```sh
   cd task-management-challenge
   ```

3. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

4. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser at** [http://localhost:5173](http://localhost:5173)

## Technologies & Libraries Used

- **React** with **TypeScript** – UI library and type safety
- **Vite** – Fast build tool and development server
- **Apollo Client** with **GraphQL** – Data management and API queries
- **React Router DOM** – Routing
- **React Hook Form** – Form state management
- **Zod** – Schema validation
- **dnd-kit** – Drag and drop functionality
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
  ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

## Screenshots

![Dashboard Screenshot](./src/assets/app-dashboard.png)

## Rationale & Decisions

- **Stack:** React was chosen for its popularity and ease of building reactive interfaces. Vite provides a fast and efficient development experience.
- **Structure:** Components, routes, and styles are separated for better organization and scalability.
- **Styling:** CSS Modules are used to avoid style conflicts and keep the code clean.
