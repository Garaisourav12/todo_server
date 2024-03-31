# To-Do Server API Documentation

Welcome to the To-Do Server API documentation. This document provides details about all available endpoints, their functionality, HTTP methods, and request body structure.

## Base URL :
The base URL for all API endpoints is https://todo-server-wine.vercel.app/


## Endpoints :

### 1. Home Route :
* Endpoint : /
* Method : GET
* Description: Displays a welcome message for the To-Do server.

### 2. User Registration :
* Endpoint : /user/register
* Method : POST
* Description : Registers a new user.
* Request Body Structure:

        {
            "name": "string",
            "email": "string",
            "username": "string",
            "password": "string"
        }

### 3. User Login :
* Endpoint : /user/login
* Method : POST
* Description : Logs in an existing user.
* Request Body Structure :

        {
            "loginId": "string",
            "password": "string"
        }

### 4. User Logout :
* Endpoint : /user/logout
* Method : GET
* Description : Logs out the current user.

### 5. Logout From All Devices :
* Endpoint : /user/logout_all
* Method : GET
* Description : Logs out the current user from all devices.

### 6. Get Todos :
* Endpoint : /todo/my-todos
* Method : GET
* Description : Retrieves all todos of the logged-in user.
* Query Parameters : page (Page No.), max (Data Per Page)

### 6. Get Running Todos :
* Endpoint : /todo/my-running-todos
* Method : GET
* Description : Retrieves all running todos of the logged-in user.
* Query Parameters : page (Page No.), max (Data Per Page)

### 6. Get Completed Todos :
* Endpoint : /todo/my-completed-todos
* Method : GET
* Description : Retrieves all completed todos of the logged-in user.
* Query Parameters : page (Page No.), max (Data Per Page)

### 7. Add Todo :
* Endpoint : /todo/add
* Method : POST
* Description : Adds a new todo for the logged-in user.
* Request Body Structure :

        {
            "title": "string"
        }

### 8. Delete Todo :
* Endpoint : /todo/delete
* Method : DELETE
* Description : Deletes a todo by todoID of the logged-in user.
* Query Parameters : id (todo ID)

### 8. Delete All Completed Todos :
* Endpoint : /todo/delete-all-completed
* Method : DELETE
* Description : Deletes all completed todos of the logged-in user.
* Query Parameters : id (todo ID)

### 9. Edit Todo :
* Endpoint : /todo/edit
* Method : PUT
* Description: Edits a todo by ID of the logged-in user.
* Query Parameters : id (todo ID)
* Request Body Structure :

        {
            "title": "string"
        }

### 10. Complete Todo :
* Endpoint : /todo/complete
* Method : PUT
* Description : Marks a todo as completed by ID of the logged-in user.
* Query Parameters : id (todo ID)


Feel free to explore these endpoints and start building your To-Do application! 📝🚀

Please note that this README is a template, and you should customize it further based on your specific project requirements. If you have any questions or need further assistance, feel free to reach out! 😊