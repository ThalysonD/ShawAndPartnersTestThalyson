# Shaw And Partners - Project

## Overview

The Shaw And Partners Project is a sophisticated full-stack application that allows users to upload a .csv file containing predefined data. This data is then processed by an API, which returns the values to be displayed on the frontend. This seamless interaction between the frontend and backend ensures efficient and user-friendly data management.

## Libraries and Frameworks

### Backend

The backend architecture is built on a solid foundation of modern technologies:

- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **Typescript**: A superset of JavaScript that compiles to clean JavaScript output.
- **Csv-parser**: An intuitive, streaming CSV parser for Node.js.
- **Multer**: A middleware for handling `multipart/form-data`, primarily used for uploading files.
- **Cors**: A Node.js package for providing an Express middleware that can be used to enable CORS (Cross-Origin Resource Sharing).

### Frontend

Our frontend leverages cutting-edge technologies for a responsive and dynamic user experience:

- **Next.js with React**: A powerful React framework that allows for server-side rendering and generating static websites.
- **Typescript**: Typescript adds static typing to JavaScript, enhancing the development process and reducing errors.
- **Tailwind CSS**: A highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.
- **SWR**: A React hooks library for remote data fetching that allows you to fetch, cache, and update data in your React and Next.js applications effortlessly.

## Getting Started

### Running the Frontend

To start the frontend application, follow these steps:

1. Clone the repository to your local environment.
2. Change directory to the frontend folder:

    ```sh
    cd frontend
    ```

3. Install the required packages:

    ```sh
    npm install
    ```

4. Launch the development server:

    ```sh
    npm run dev
    ```

### Running the Backend

For local backend setup:

1. Navigate to the backend directory:

    ```sh
    cd backend
    ```

2. Install the necessary node modules:

    ```sh
    npm install
    ```

3. Start the backend server (default port is 3000):

    ```sh
    npm run dev
    ```

### Backend Testing

To execute the backend tests:

1. Change to the backend directory:

    ```sh
    cd backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Run the tests:

    ```sh
    npm run test
    ```

## Deployment

The application is fully deployed and can be accessed at the following URLs:

### Because the hosted servers are free, performance may not be the best, I recommend running local with local pointing

- **Frontend**: [https://main--shaw-partnerts-test-thalyson.netlify.app/](https://main--shaw-partnerts-test-thalyson.netlify.app/)
- **Backend**: [https://shaw-and-parters-thalyson-cae22a68e1ab.herokuapp.com/](https://shaw-and-parters-thalyson-cae22a68e1ab.herokuapp.com/)
