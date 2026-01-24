📘 Blog Platform – REST API & Frontend

This project is a Blog Platform built using Node.js, Express, TypeScript, and React.
It implements a RESTful API for managing blog posts and a basic frontend to consume the API.

The project fulfills all functional requirements, follows REST best practices, and includes bonus features such as pagination, search, filtering, validation, and unit tests.

▶️ How to Run the Project
🔹 Prerequisites

Node.js (v16 or higher)

npm

🔹 Backend Setup
cd blog-api
npm install
npm run dev


The backend server will start at:

http://localhost:3000

🔹 Frontend Setup
cd blog-frontend
npm install
npm run dev


The frontend will run at:

http://localhost:5173


The frontend communicates with the backend using a Vite proxy configuration.

🔗 API Documentation

This project exposes a RESTful API for managing blog posts.

📌 The API design and endpoints follow the Problem Statement (Blog API PDF) and REST conventions.

📌 Get all posts
GET /api/posts


Query Parameters (Optional):

page – page number

limit – number of posts per page

search – search posts by title

author – filter posts by author

📌 Get a single post
GET /api/posts/:id

📌 Create a post
POST /api/posts


Request Body:

{
  "title": "Post Title",
  "content": "Post content",
  "author": "Author Name"
}

📌 Update a post
PUT /api/posts/:id

📌 Delete a post
DELETE /api/posts/:id


Response:

204 No Content on successful deletion

404 Not Found if the post does not exist

🧪 Running Unit Tests (Bonus)

Backend unit tests are implemented using Jest and Supertest.

From the backend directory:

cd blog-api
npm test


Tests include:

Fetching all posts

Creating a post

Validation error handling

⏱ Time Spent

Approximately 18–22 hours were spent on this project, broken down as follows:

Backend API development and validation: ~8 hours

Frontend development and API integration: ~7 hours

Debugging, routing fixes, and error handling: ~4 hours

Testing and documentation: ~3 hours

🚀 What I Would Improve With More Time

With additional time, the following improvements could be made:

Add user authentication and authorization (JWT-based)

Use a database (e.g., PostgreSQL or MongoDB) instead of JSON storage

Add more extensive unit and integration tests

Enhance the dashboard with analytics and insights

Improve frontend accessibility and responsiveness

Deploy the application to a cloud platform

✅ Summary

All required API endpoints are implemented

Frontend successfully consumes the API

RESTful design and proper HTTP status codes are used

Bonus features (pagination, search, filter, validation, tests) are included

Project meets all requirements stated in the PDF

👤 Author

Komal Goel
