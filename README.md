
# Foodeli 


**Foodeli** is a comprehensive web application designed for food enthusiasts to easily buy and sell a variety of foods. Built using the **MERN** stack (MongoDB, Express.js, React.js, and Node.js), Foodeli offers a seamless and intuitive user experience with features like user authentication, shopping cart management, order tracking, and profile updates.





## Demo

![Untitled video - Made with Clipchamp (7) (1)](https://github.com/daaniissh/Foodeli/assets/102005928/dd31e4a5-485a-4eea-9c78-d533990b5012)



## Screenshots
![Screenshot (651)](https://github.com/daaniissh/Foodeli/assets/102005928/381ee437-e7af-49b7-ae93-2b9dc7800a0f)


![Screenshot (652)](https://github.com/daaniissh/Foodeli/assets/102005928/7c415784-2a16-49fc-b3ef-3d0cf20dd085)



## Features

- **User Authentication:** Secure login and signup options for users to create and manage their accounts.
- **Food Marketplace:** Browse, search, and filter through a wide variety of food items available for sale.
- **Add to Cart:** Conveniently add desired food items to the shopping cart for easy purchase.
- **Favorites:** Mark favorite food items for quick access and future reference.
- **Order Management:** View and track current and past orders with detailed order information.
- **Profile Updates:** Users can update their personal information and manage their profile settings

## Tech Stack
## Frontend
- **React.js:** A JavaScript library for building user interfaces.
- **Styled Components:** Utilized for styling React components.
- **Redux:** A state management library for managing application state.
- **Axios:** A promise-based HTTP client for making requests to the backend.
- **Toster:** Used for displaying toast notifications.
- **Material-UI (MUI):** A popular React UI framework for building responsive, accessible design components.
- **Cloudinary:** A cloud-based service for managing images and videos.

## Backend
- **Express.js:** A web application framework for building the backend API and handling server-side logic.
- **MongoDB:** A NoSQL database for storing user data, food items, orders, and other relevant information.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT (jsonwebtoken):** For handling user authentication and generating tokens.
- **Bcrypt:** For hashing passwords.
- **Dotenv:** For loading environment variables from a .env file.
- **Cors:** Middleware for enabling Cross-Origin Resource Sharing.
- **Nodemon:** A tool that helps develop node.js based applications by automatically restarting the node application when file changes are detected.

## Installation

   Clone the repository:

```bash
git clone https://github.com/yourusername/foodeli.git
cd foodeli
```
Install server dependencies:

```bash
cd ./server
npm install
```
Install client dependencies:

```bash
cd ./client
npm install
```

Set up environment variables: Create a .env file in the backend directory and add the necessary environment variables.
```bash
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
