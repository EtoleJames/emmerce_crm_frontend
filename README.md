# Emmerce CRM Frontend

Welcome to the frontend of the Emmerce CRM application! This is a mini CRM system designed to help agents track their leads. The frontend is built using **Vue 3** with the **Composition API** and **Vuetify** for UI components. It communicates with the backend built with Django and Django REST Framework to manage leads, contacts, notes, and reminders.
The link to the site is here [Visit the Emmerce Mini CRM Frontend](https://etole-emmerce-mini-crm.web.app/)

---

## Features

- **Vue 3** with the Composition API for component logic.
- **Vuetify** UI framework for responsive and modern design.
- State management using **Pinia**.
- Routing with **Vue Router** and authentication guards.
- API communication using **Axios**.
- JWT authentication for secure login and token refresh.
- Fully responsive and functional for managing contacts, leads, notes, and reminders.

---

## Project Setup

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (>=16.x)
- **npm** or **yarn** (npm comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EtoleJames/emmerce_crm_frontend.git
   cd emmerce_crm_frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   Or if you are using **yarn**:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```bash
   VITE_API_URL=https://emmercecrmbackend-production.up.railway.app/api
   ```

   Replace `VITE_API_URL` with your backend API URL if different.

---

## Running the Development Server

To start the development server and view the app in your browser:

```bash
npm run dev
```

Or if you are using **yarn**:

```bash
yarn dev
```

This will start a local server on [http://localhost:3000](http://localhost:3000).

---

## Building the Project

To create a production build of the frontend, run:

```bash
npm run build
```

Or with **yarn**:

```bash
yarn build
```

---

## Preview the Production Build

To preview the production build locally:

```bash
npm run preview
```

Or with **yarn**:

```bash
yarn preview
```

---

## Project Structure

Here’s a brief overview of the project structure:

- `src/`: Contains all the application source code.
  - `assets/`: Static assets like images, fonts, etc.
  - `components/`: Reusable Vue components.
  - `views/`: Views like `Leads`, `Contacts`, `Dashboard`, etc.
  - `store/`: Pinia stores for state management.
  - `router/`: Vue Router configuration for navigation.
  - `plugins/`: Axios plugin for API calls and other utility plugins.

---

## Authentication

The frontend uses JWT-based authentication for user login and token refresh.

- **Login**: Users can log in with their email and password, and receive an access token and a refresh token.
- **Token Refresh**: When the access token expires, a refresh token can be used to obtain a new access token.

Ensure that the backend has JWT authentication set up.

---

## API Endpoints

The frontend communicates with the backend using the following main API endpoints:

- **Login**: `/api/auth/login/` (POST)
- **Logout**: `/api/auth/logout/` (POST)
- **Register**: `/api/auth/register/` (POST)
- **Leads**: `/api/leads/` (GET, POST), `/api/leads/{id}/` (GET, PUT, PATCH, DELETE)
- **Contacts**: `/api/contacts/` (GET, POST), `/api/contacts/{id}/` (GET, PUT, PATCH, DELETE)
- **Notes**: `/notes/` (GET, POST), `/api/notes/{id}/` (GET, PUT, PATCH, DELETE)
- **Reminders**: `/reminders/` (GET, POST), `/api/reminders/{id}/` (GET, PUT, PATCH, DELETE)

All API calls are handled by **Axios** through a custom plugin that adds JWT tokens to request headers automatically.

---

## Testing

### Unit Testing with Vitest

To run unit tests for the components and logic:

```bash
npm run test
```

Or with **yarn**:

```bash
yarn test
```

### End-to-End Testing with Cypress

Cypress is used for end-to-end testing. To run the tests:

```bash
npm run cypress:open
```

Or with **yarn**:

```bash
yarn cypress:open
```

---

## Development Tools

The following tools are used for development and testing:

- **Vite**: A fast and optimized build tool for modern web projects.
- **Vue Router**: For routing and navigation between different views.
- **Pinia**: The state management library for Vue 3.
- **Vuetify**: Material Design component framework for Vue.js.
- **Cypress**: For end-to-end testing.
- **Vitest**: A fast unit testing framework.
- **Axios**: For making HTTP requests to the backend.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out to the maintainer at [etolejames@gmail.com](mailto:etolejames@gmail.com) if you have any questions or need further assistance!

---
