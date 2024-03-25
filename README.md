# Memory link shortener

This is a simple in-memory link shortener. It allows you to shorten URLs and store them in memory for quick access.

## Getting Started

These instructions will help you get the project up and running on your local machine.

### Prerequisites

- Node.js
- NPM

### How to run

Instructions on how to run the project locally aree available [here](how-to-run.md).

### How to use

- To shorten a URL, make a POST request to `/endcode` with the `url` in the request body as JSON.
- To get the original URL, make a GET request to `/decode` with the shortened `url` in the request body as JSON.
- to get statistice on a rule, make a GET request to `/statistic/:id`.
- to redirect to the original URL, make a GET request to `/:id`.

### Running tests

1. Install Dependencies

```bash
npm install
```

2. Run tests

```bash
npm test
```
