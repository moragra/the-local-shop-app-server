# The Local Shop - Backend

## Overview

This is the backend server for The Local Shop application, which connects users with local businesses, providing visibility and support to local shop owners.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL, Knex.js
- **Authentication**: JWT
- **Environment Management**: dotenv

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/moragra/the-local-shop-app-server.git
```

### 2. Navigate to the Project Directory

```bash
cd the-local-shop-app-server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add your environment variables as needed (e.g., database connection details, JWT secret). Refer to `.env.sample` for the required variables.

### 5. Run Database Migrations

```bash
npm run migrate
```

### 6. Run Seeds Data

First we need to run users, because it has the foreign key (id) for business
```bash
npx knex seed:run --specific=users.js 
```
Once we have run users data, then we can run business data
```bash
npx knex seed:run --specific=business.js
```
If you only run npx knex seed:run you will encounter errors because of the dependancy

### 7. Start the Server

```bash
npm start
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Contact

For any questions, feel free to reach out:

- GitHub: [moragra](https://github.com/moragra)
