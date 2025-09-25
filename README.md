# Shopping Cart

A simple shopping store frontend built with **[FakeStoreAPI](https://fakestoreapi.com/)**.
This project demonstrates fetching products, displaying them in a storefront, and managing a shopping cart.

---

## Features

- 📦 Fetch products from FakeStoreAPI
- 🔎 View product details
- 🛒 Add/remove items to/from cart
- 💰 View total cart price
- 📱 Responsive design

---

## Tech Stack

- **Frontend:** React
- **API:** [FakeStoreAPI](https://fakestoreapi.com/)
- **Styling:** CSS Modules

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Stolir/odin-shopping-cart.git
cd odin-shopping-cart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

The app will be available at:
👉 `http://localhost:5173/`

---

## 🔗 API Reference

This project uses [FakeStoreAPI](https://fakestoreapi.com/).

### Example endpoints:

- **Get all products:**
  `GET https://fakestoreapi.com/products`
- **Get single product:**
  `GET https://fakestoreapi.com/products/:id`
- **Get all categories:**
  `GET https://fakestoreapi.com/products/categories`

---

## Testing

This project uses **[Vitest](https://vitest.dev/)** as the test runner and **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** for component testing.

#### Run all tests:

```bash
npm test
```
