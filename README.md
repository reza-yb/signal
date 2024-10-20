# Canada's Optimal Food Planner

Canada's Optimal Food Planner is a web application designed to help Canadians create personalized meal plans based on Canada's Food Guide recommendations. This project is built using React, TypeScript, and Vite, with Material-UI for styling.

## Features

- Create personalized meal plans for individuals and families
- Generate shopping lists based on meal plans
- View nutritional recommendations and tips
- Responsive design for desktop and mobile devices
- Light and dark mode support

## Continuous Integration and Continuous Deployment

We are using **GitHub Workflows** for Continuous Integration (CI) to automate testing, linting, and building the project with every pull request or code push. This ensures the code quality is maintained throughout the development lifecycle.

For Continuous Deployment (CD), we use **Vercel** to automatically deploy the latest version of the app to production. Every successful build on the `main` branch is deployed seamlessly to Vercel, ensuring that users always have access to the latest features and bug fixes.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/reza-yb/signal
   cd signal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Alternative: Running with Docker

If you prefer to use Docker, follow these steps:

1. Make sure you have Docker installed on your machine.

2. Build the Docker image:
   ```
   docker build -t canadas-optimal-food-planner .
   ```

3. Run the Docker container:
   ```
   docker run -p 5000:5000 canadas-optimal-food-planner
   ```

4. Open your browser and navigate to `http://localhost:5000`

This method will build and run the application in a Docker container, making it easy to deploy and run in different environments.

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint to check for code quality issues
- `npm run preview`: Preview the production build locally
- `npm test`: Run Jest tests
- `docker build -t canadas-optimal-food-planner .`: Build the Docker image
- `docker run -p 5000:5000 canadas-optimal-food-planner`: Run the Docker container

## Project Structure

- `src/`: Source code
    - `components/`: Reusable React components
    - `pages/`: Main page components
    - `hooks/`: Custom React hooks
    - `utils/`: Utility functions
    - `types/`: TypeScript type definitions
    - `config.ts`: Configuration file
- `public/`: Static assets and data files
- `tests/`: Test files

## Technologies Used

- React
- TypeScript
- Vite
- Material-UI
- React Router
- Papa Parse (for CSV parsing)
- Jest (for testing)

## Security Best Practices

We have implemented several security best practices to ensure the safety and integrity of our application:

- **Input Validation**: We validate user inputs to prevent injection attacks and ensure data integrity.
- **Content Security Policy (CSP)**: We recommend setting up a CSP to mitigate XSS attacks.
- **HTTPS**: We recommend that the application is served over HTTPS in production to protect data in transit.
- **Dependency Management**: We regularly update dependencies and use `npm audit` to check for vulnerabilities.
- **Error Handling**: We handle errors gracefully to avoid exposing sensitive information.
- **Rate Limiting**: We recommend implementing rate limiting on API endpoints to prevent abuse.

These practices help us maintain a secure and robust application environment.
