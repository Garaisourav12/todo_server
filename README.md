To-Do Server API Documentation

Welcome to the To-Do Server API documentation. This document provides details about all available endpoints, their functionality, HTTP methods, and request body structure.

Base URL:
The base URL for all API endpoints is https://todo-server-wine.vercel.app/


Endpoints:

1. Home Route:
    Endpoint: /
    Method: GET
    Description: Displays a welcome message for the To-Do server.
    Request Body: N/A

2. User Registration:
    Endpoint: /register
    Method: POST
    Description: Registers a new user.
    Request Body Structure: {
        "name": "string",
        "email": "string",
        "username": "string",
        "password": "string"
    }

3. User Login:
    Endpoint: /login
    Method: POST
    Description: Logs in an existing user.
    Request Body Structure: {
        "loginId": "string",
        "password": "string"
    }

4. User Logout:
    Endpoint: /logout
    Method: GET
    Description: Logs out the current user.
    Request Body: N/A

5. Logout From All Devices:
    Endpoint: /logout_all
    Method: GET
    Description: Logs out the current user from all devices.
    Request Body: N/A

6. Get Todos:
    Endpoint: /todos
    Method: GET
    Description: Retrieves all todos for the logged-in user.
    Request Body: N/A

7. Add Todo:
    Endpoint: /add
    Method: POST
    Description: Adds a new todo for the logged-in user.
    Request Body Structure: {
        "title": "string"
    }

8. Delete Todo:
    Endpoint: /delete/:id
    Method: DELETE
    Description: Deletes a todo by ID for the logged-in user.
    Request Parameters: id (todo ID)

9. Edit Todo:
    Endpoint: /edit/:id
    Method: PUT
    Description: Edits a todo by ID for the logged-in user.
    Request Parameters: id (todo ID)
    Request Body Structure: {
        "title": "string"
    }

10. Complete Todo:
    Endpoint: /complete/:id
    Method: PUT
    Description: Marks a todo as completed by ID for the logged-in user.
    Request Parameters: id (todo ID)
    Request Body: N/A
