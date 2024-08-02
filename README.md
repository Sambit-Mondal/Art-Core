# Art-Core

Art-Core is a comprehensive platform for showcasing and managing artworks. This project is built with a modern tech stack to provide a seamless user experience for both art enthusiasts and administrators.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)




## Features

### User Authentication
- Secure login and signup using Firebase Authentication.
- Support for email/password and Google login.

### Admin Access
- Special admin privileges to add and manage artworks.
- Admin login with fixed credentials stored in the database.

### Artworks Management
- Add, view, and filter artworks dynamically.
- Store artwork details (Title, Description, Price, Image, Type) in MongoDB.
- Filter artworks by different categories using tabs.

### Responsive Design
- Fully responsive UI using Tailwind CSS.
- Optimized for different screen sizes.

### Payment Integration
- Razorpay integration for handling payments.
- Store payment details in the database.
- Email notifications to admin upon successful payment.




## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.

### Database
- **Firebase Firestore**: NoSQL cloud database to store and sync data in real-time.

### Authentication
- **Firebase Auth**: Provides backend services for easy use of authentication.

### Payment Gateway
- **Razorpay**: Payment gateway integration for processing payments.




## Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **npm**: Node package manager, which comes with Node.js.
- **Firebase Project**: Set up a Firebase project to obtain your configuration details.
- **Razorpay Account**: Create a Razorpay account and obtain your API keys.




## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Sambit-Mondal/Art-Core.git
   cd Art-Core
   ```

2. Install dependencies for both client and server:
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `server` directory.
   - Add your Firebase and Razorpay configuration details.

4. Start the development server:
   ```sh
   cd client
   npm start
   ```
5. Start the backend server:
   ```sh
   cd ../server
   npm start
   ```




## Usage

### Frontend
- **React**: The frontend is built with React, leveraging functional components and hooks.
- **Tailwind CSS**: Utilized for building a responsive and visually appealing UI.

### Backend
- **Node.js & Express**: The backend handles API requests, user authentication, and interacts with Firestore and Razorpay.

### Database
- **MongoDB**: Used to store user data, artwork details, and payment information.

### Authentication
- **Firebase Auth**: Manages user authentication seamlessly.

### Payment Gateway
- **Razorpay**: Integrated for secure and efficient payment processing.



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



## Contact

For any inquiries or feedback, feel free to contact:
- https://skillicons.dev/icons?i=github&theme=dark: [Sambit-Mondal](https://github.com/Sambit-Mondal)
