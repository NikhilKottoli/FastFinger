# FastFinger

FastFinger is a fun and interactive typing game that helps improve your typing speed and accuracy. Challenge yourself and see how fast you can type!

## Features

- Randomly generated words to type
- Timer to track your typing speed
- Accuracy calculation
- Leaderboard to compare your scores with others
- Multiple difficulty levels

## Tech Stack

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (hosted on MongoDB Atlas)
- **Deployment**: Render (for backend) and GitHub Pages (for frontend)

## Demo

A demo video showcasing the functionality of the FastFinger game can be found in the `public` directory. 

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/NikhilKottoli/FastFinger.git
    ```

2. Navigate to the project directory:

    ```bash
    cd FastFinger
    ```

3. Install the required dependencies for both frontend and backend:

    **For Frontend:**

    ```bash
    cd frontend
    npm install
    ```

    **For Backend:**

    ```bash
    cd ../backend
    npm install
    ```

## Usage

### Starting the Backend

1. Make sure you are in the `backend` directory:

    ```bash
    cd backend
    ```

2. Start the backend server:

    ```bash
    npm start
    ```

### Starting the Frontend

1. Open a new terminal window or tab.
2. Navigate to the `frontend` directory:

    ```bash
    cd FastFinger/frontend
    ```

3. Start the frontend application:

    ```bash
    npm start
    ```

4. Open your web browser and navigate to `http://localhost:3000`.

5. Type the displayed words as fast and accurately as possible.

## MongoDB Hosting

The MongoDB database for this project is hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). To connect your backend to MongoDB Atlas:

1. Create a MongoDB Atlas account and set up a new cluster.
2. Add your IP address to the cluster's IP whitelist.
3. Create a database and note the connection string.
4. In your backend code, use the connection string to connect to your MongoDB database.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [MonkeyType](https://monkeytype.com) - Inspiration for the typing game concept

## Contact

For any inquiries or feedback, please contact us at fastfinger@example.com.
