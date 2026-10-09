# Library REST API Design

This document outlines the API endpoints, HTTP methods, and status codes for a digital library management system.

## 1. Book Resources (`/api/books`)

### Endpoints and HTTP Methods

* **`GET /api/books`**
  * **Description:** Retrieve a list of all available books.
  * **Success Response Code:** `200 OK`
  * **Response Body Example:** `[{"id": 1, "title": "1984", "author": "George Orwell", "available": true}]`

* **`GET /api/books/:id`**
  * **Description:** Fetch details of a specific book by its unique ID.
  * **Success Response Code:** `200 OK`
  * **Error Response Code:** `404 Not Found` (if book ID does not exist)

* **`POST /api/books`**
  * **Description:** Add a new book to the library system.
  * **Success Response Code:** `201 Created`
  * **Error Response Code:** `400 Bad Request` (if required fields like `title` or `author` are missing)

* **`PUT /api/books/:id`**
  * **Description:** Update all information for an existing book record.
  * **Success Response Code:** `200 OK`
  * **Error Response Codes:** `400 Bad Request` or `404 Not Found`

* **`DELETE /api/books/:id`**
  * **Description:** Remove a book record from the library system.
  * **Success Response Code:** `204 No Content`
  * **Error Response Code:** `404 Not Found`

## 2. HTTP Status Code Summary

* **`200 OK`:** Request succeeded, data returned in response.
* **`201 Created`:** New resource successfully created.
* **`204 No Content`:** Action completed successfully with no response body.
* **`400 Bad Request`:** Missing required data or invalid payload format.
* **`404 Not Found`:** Requested endpoint or resource ID does not exist.
* **`500 Internal Server Error`:** Unexpected failure on the API server side.