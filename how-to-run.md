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
1. Clone the repository

```bash
git clone https://github.com/dahyorr/memory-link-shortener.git
```

2. Build the docker image

```bash
cd memory-link-shortener
docker build -t memory-link-shortener .
```

2. Run the docker image

```bash
docker run -p 5000:5000 memory-link-shortener
```