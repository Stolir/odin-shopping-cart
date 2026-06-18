# odin-shopping-cart

## Table of Contents

- [odin‑shopping‑cart](#odin-shopping-cart)
- [1. Project Overview](#1-project-overview)
- [2. Features](#2-features)
- [3. Technical Stack](#3-technical-stack)
- [4. Getting Started](#4-getting-started)
  - [4.1. Prerequisites](#41-prerequisites)
  - [4.2. Installation](#42-installation)
  - [4.3. Running the Application](#43-running-the-application)
- [5. API Reference](#5-api-reference)
- [6. Testing](#6-testing)
- [7. Project Structure](#7-project-structure)
- [8. Live Preview](#8-live-preview)

## 1. Project Overview

`odin-shopping-cart` is a front-end shopping store application. It demonstrates how to fetch product data from an external API, display it in a storefront, and manage a shopping cart. The project focuses on client-side development using React and provides a responsive user interface. Check out the [live preview](#8-live-preview) section.

## 2. Features

The application includes the following key features:

- **Fetch Products**: Retrieves product information from the [FakeStoreAPI](https://fakestoreapi.com/).
- **View Product Details**: Allows users to view detailed information about individual products.
- **Add/Remove Items**: Users can add products to their shopping cart and remove them as needed.
- **View Total Cart Price**: Displays the cumulative price of all items currently in the shopping cart.
- **Responsive Design**: The user interface is designed to be adaptable and functional across various devices and screen sizes.

## 3. Technical Stack

This project is built using a modern front-end stack:

| Layer                | Technology                                |
| :------------------- | :---------------------------------------- |
| **Frontend**         | React                                     |
| **API**              | [FakeStoreAPI](https://fakestoreapi.com/) |
| **Styling**          | CSS Modules                               |
| **Routing**          | `react-router`                            |
| **State Management** | React Context API (for Cart Management)   |
| **Build Tool**       | Vite                                      |
| **Testing**          | Vitest, React Testing Library             |

## 4. Getting Started

To get the `odin-shopping-cart` project up and running on your local machine, follow these instructions:

### 4.1. Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- npm or Yarn (Node Package Manager)

### 4.2. Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Stolir/odin-shopping-cart.git
    cd odin-shopping-cart
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    ```

### 4.3. Running the Application

To start the development server:

```bash
npm run dev
# or yarn dev
```

The application will typically be available at `http://localhost:5173/`.

## 5. API Reference

This project utilizes the [FakeStoreAPI](https://fakestoreapi.com/) for product data. Below are some example endpoints used:

- **Get all products**: `GET https://fakestoreapi.com/products`
- **Get single product**: `GET https://fakestoreapi.com/products/:id`
- **Get all categories**: `GET https://fakestoreapi.com/products/categories`

## 6. Testing

The project includes a testing setup to ensure functionality and component integrity.

- **Test Runner**: [Vitest](https://vitest.dev/)
- **Component Testing**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

To run all tests:

```bash
npm test
# or yarn test
```

## 7. Project Structure

The project follows a standard React application structure:

```
public/             # Public assets
src/                # Source code
├── components/     # Reusable React components
├── context/        # React Context for global state management (e.g., CartContext)
├── hooks/          # Custom React hooks
├── pages/          # Page-level components (e.g., Home, Shop, Cart)
├── router/         # React Router configuration
├── App.jsx         # Main application component
├── index.css       # Global styles
├── main.jsx        # Entry point for React application
.gitignore
.prettierignore
.prettierrc.json
eslint.config.js
index.html
package.json        # Project metadata and dependencies
package-lock.json
vite.config.js
```

## 8. Live Preview

View the project at https://stolir-odin-shoppingcart.netlify.app/
