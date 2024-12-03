
# Markdown-HTML Converter API

**Codename:** `md-html-conv-api`

# Table of Contents

1. [Overview](#overview)
2. [Swagger Documentation](#swagger-documentation)
3. [Running with Docker](#running-with-docker)
4. [Installation and Setup](#installation-and-setup)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Error Handling](#error-handling)
8. [Security](#security)

## Overview

The `md-html-conv-api` is a TypeScript-based RESTful API that converts:

- **Markdown to HTML** (`/api/convert/html`)
- **HTML to Markdown** (`/api/convert/markdown`)

**This API includes features such as:**

- Validation and sanitization of user input
- Authentication using API keys
- Error handling and JSON responses
- Secure implementation with protections against XSS and other attacks

## Swagger Documentation

The API includes a detailed Swagger (OpenAPI) documentation that describes all available endpoints, their parameters, and example responses.

### Access the Swagger Documentation

Once the server is running, you can access the Swagger documentation at:

- **URL**: `http://localhost:12345/api/docs/`

### Features of Swagger Documentation

- Explore and test all API endpoints interactively.
- View detailed descriptions of each endpoint, including required headers, parameters, and responses.
- Easily understand the expected input and output for the API.

## Running with Docker

To run the app in a Docker container, follow these steps:

 **Build and Run the App**:

   ```bash
   docker-compose up --build
   ```

 **Access the App**:

The app will be available at `http://localhost:12345`

 **Stopping the App**:

   ```bash
   docker-compose down
   ```

## Installation and Setup

### Prerequisites

1. Ensure you have **Node.js** (v16+) and **npm** installed.
2. Install **TypeScript** globally if not already installed:

   ```bash
   npm install -g typescript

### Installation

1. Clone the repository:

    ```bash
    git clone ssh://git@pulsar.huulke.com:10022/Huulke/md-html-conv-api.git
    cd md-html-conv-api 
    
2. Install dependencies:

    `npm install`

3. Start the server:

    - For production:
        `npm start`

    - For development:
        `npm run dev`

## Environment Variables

To authenticate requests and configure the API, you need to create a `.env` file in the root directory of your project. Use the `.env.example` file as a reference.

### Example `.env` File

```plaintext
API_KEYS=Your_API_Key_Here
```

### Testing the API

Once the server is running, test the API using tools like **Postman** or **curl**.

The server listens on `http://localhost:12345`.

----------

## API Endpoints

| Method | Endpoint              | Description                       |
|--------|-----------------------|-----------------------------------|
| `POST` | `/api/convert/html`   | Converts Markdown to HTML         |
| `POST` | `/api/convert/markdown` | Converts HTML to Markdown       |
| `POST` | `/api/convert/markdown/pdf` | Converts Markdwon to PDF      |
| `POST` | `/api/convert/html/pdf` | Converts HTML to PDF     |
| `GET`  | `/`                   | Root path (returns a 404 error)   |
| `GET`  | `/api/`               | API welcome message               |

### 1. `POST /api/convert/html`

**Description**: Converts Markdown content to HTML.

**Request Parameters**:

- `content` (string, optional): The Markdown content to convert.
- `url` (string, optional): URL pointing to a remote Markdown file.

**Example Request**:

```json
POST /api/convert/html HTTP/1.1
Content-Type: application/json
x-api-key: 234823648723

{
  "content": "# Welcome\nThis is **bold** text."
}

```

**Example Response**:

```json
{
  "html": "<h1>Welcome</h1><p>This is <strong>bold</strong> text.</p>"
} 

```

**Example Request**:

```json
POST /api/convert/html HTTP/1.1
Content-Type: application/json
x-api-key: 234823648723

{
  "content": "# Heading 1\n## Heading 2\n**Bold text** and *italic text*.\n This is a blockquote.\n---\n```bash echo```'Hello, world!'"
}

```

**Example Response**:

```json
{
  "html": "<h1>Heading 1</h1><h2>Heading 2</h2><strong>Bold text</strong> and <em>italic text</em>.\n<p> This is a blockquote.</p><p><hr></p><p><pre><code>bash echo</code></pre>'Hello, world!'</p>"
} 

```

**Error Responses**:

- `400 Bad Request`: Missing or invalid parameters.
- `401 Unauthorized`: Invalid API key.

----------

### 2. `POST /api/convert/markdown`

**Description**: Converts HTML content to Markdown.

**Request Parameters**:

- `content` (string, optional): The HTML content to convert.
- `url` (string, optional): URL pointing to a remote HTML file.
- `selector` (string, optional): CSS selector to extract specific HTML elements when using a URL.

**Example Request**:

```json
POST /api/convert/markdown HTTP/1.1
Content-Type: application/json
x-api-key: 234823648723

{
  "content": "<h1>Welcome</h1><p>This is <strong>bold</strong> text.</p>"
} 

```

**Example Response**:

```json
{
  "markdown": "# Welcome\n\nThis is **bold** text."
}
```

**Example Request**:

```json
POST /api/convert/markdown HTTP/1.1
Content-Type: application/json
x-api-key: 234823648723

{
  "content": "<h1>Heading 1</h1><h2>Heading 2</h2><p><strong>Bold text</strong> and <em>italic text</em>.</p> <blockquote>This is a blockquote.</blockquote><pre><code> 'Hello, world!'</code></pre>"
} 

```

**Example Response**:

```json
{
  "markdown": "# Heading 1\n\n## Heading 2\n\n**Bold text** and *italic text*. > This is a blockquote.```\n 'Hello, world!'\n```"
}
```

**Error Responses**:

- `400 Bad Request`: Missing or invalid parameters.

- `401 Unauthorized`: Invalid API key.

----------

### 3. `GET /`

**Description**: Root path.

**Example Response**:

`{
  "error": "Not Found"
}`

----------

### 4. `GET /api/`

**Description**: API home directory or welcome message.

**Example Response**:

`{
  "message": "Welcome to md-html-conv-api!"
}`

----------

## Error Handling

All errors are returned in JSON format with appropriate HTTP status codes.

**Examples**:

1.**Invalid Input**:

- **Response**
        `{
          "error": "Invalid URL format."
      }`

2.**Unauthorized**:

- **Response**
        `{
          "error": "Unauthorized: API key is missing."
        }`

3.**Internal Server Error**:

- **Response**:
        `{
          "error": "Internal server error: [error details]"
        }`

----------

## Security

The API includes:

1.**Helmet**: Adds HTTP headers for enhanced security.

2.**Sanitization**: Inputs are sanitized to prevent XSS attacks using `sanitize-html`.

3.**Rate Limiting**: Limits repeated requests to prevent abuse.

4.**CORS**: Restricts unauthorized access from external domains.

----------
