# Memory link shortener

This is a simple in-memory link shortener. It allows you to shorten URLs and store them in memory for quick access.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm

### Running the project locally

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository

```bash
git clone https://github.com/dahyorr/memory-link-shortener.git
```

2. Install dependencies

```bash
cd memory-link-shortener
npm install
```

3. build the project

```bash
npm run build
```

4. Start the server

```bash
npm start
```

### Running with docker

1. Build the docker image

```bash
docker build -t memory-link-shortener .
```

2. Run the docker image

```bash
docker run -p 5000:5000 memory-link-shortener
```