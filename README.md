[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)



# Explore Sphere

Explore Sphere is a web application that allows users to explore detailed information about countries worldwide. It provides features such as searching for countries, filtering by region and language, viewing detailed country information, and managing favorite countries for authenticated users. The application is built with a Node.js/Express backend and a React frontend, utilizing MongoDB for data storage and the REST Countries API for country data.

## Features
- **Country Exploration**: Browse and search for countries with details like capital, population, region, and languages.
- **Filters**: Filter countries by region or language for a tailored experience.
- **Favorites**: Authenticated users can save and manage favorite countries.
- **Authentication**: User registration and login with JWT-based authentication.
- **Responsive Design**: Fully responsive UI with light/dark mode support using Tailwind CSS.
- **Interactive UI**: Enhanced user experience with SweetAlert2 for notifications and smooth animations.

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS, SweetAlert2, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **APIs**: REST Countries API (https://restcountries.com/)
- **Testing**: Jest, React Testing Library
- **Others**: dotenv, cors, react-cookie

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git
- A modern web browser

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-Samadinee.git
   cd af-2-Samadinee
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
     Replace `your_mongodb_connection_string` with your MongoDB URI and `your_jwt_secret_key` with a secure key (e.g., a 64-character hexadecimal string).

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

4. **Start the Application**:
   - **Backend**:
     ```bash
     cd backend
     npm start
     ```
     The backend will run on `http://localhost:5000`.
   - **Frontend**:
     ```bash
     cd frontend
     npm start
     ```
     The frontend will run on `http://localhost:3000` and open automatically in your browser.

## Build Process
To build the application for production:
1. **Backend**:
   - Ensure the `.env` file is configured correctly.
   - The backend does not require a separate build step as it runs directly with Node.js.
2. **Frontend**:
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Run the build command:
     ```bash
     npm run build
     ```
   - This generates a `build` folder with optimized static assets.
   - Serve the build folder using a static server (e.g., `serve -s build`) or configure your backend to serve these files.

## Usage Instructions
1. **Homepage**:
   - View a list of countries with details like flags, capital, region, and population.
   - Use the search bar to find specific countries.
   - Apply region or language filters to narrow down the list.
2. **Country Details**:
   - Click "View Details" on a country card to see detailed information, including official name, currencies, timezones, and maps.
   - Switch between tabs (General, Culture, Maps) for different information categories.
3. **Authentication**:
   - Register or log in via the navigation bar to access features like favoriting countries.
   - After logging in, toggle the favorite button on country cards to save or remove countries from your favorites.
   - View your favorite countries on the `/favorites` page.
4. **Theme Toggle**:
   - Use the theme toggle button in the navbar to switch between light and dark modes.
5. **Profile**:
   - Access your profile to view your username and favorite countries (if authenticated).

## Testing
- **Backend**: Tests are not explicitly defined in the provided code. You can add tests using a framework like Mocha or Jest.
- **Frontend**:
  - Run tests with:
    ```bash
    cd frontend
    npm test
    ```
  - For watch mode:
    ```bash
    npm run test:watch
    ```
  - Tests cover components (e.g., `CountryCard`), services (e.g., `AuthService`), and integration tests for the `Home` page.

## Deployment
1. **Backend**:
   - Deploy to a platform like Heroku, Render, or AWS.
   - Ensure the `.env` variables are set in the hosting platform's environment configuration.
2. **Frontend**:
   - Deploy the `build` folder to a static hosting service like Netlify, Vercel, or GitHub Pages.
   - Update the backend API URL in `frontend/src/services` to point to the deployed backend.


## 📡 API Documentation

- 🔐 Auth Endpoints
   - POST   `/api/auth/register`    *Register new user* 
   - POST   `/api/auth/login`    *Login and return JWT* 

- 👤 User Endpoints
   - GET `/api/users/me`      *Get current user info*

- ⭐ Favorites Endpoints
   - GET`/api/favorites`*Get user's favorite countries*
   - POST`/api/favorites`*Add a country to favorites*
   - DELETE`/api/favorites/:code`*Remove country from favorites*

   ⚠️ *All favorites and users/me routes require Authorization header with a valid JWT token.*


## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## report.md
   `af-2-Samadinee\report.md` - contains brief report discussing the chosen APIs, any challenges faced, and how they
                                 were resolved