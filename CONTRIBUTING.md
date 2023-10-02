# Contributing

## Table of Contents

- [Guidelines](#guidelines)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Testing](#testing)

## Guidelines

See [GUIDELINES.md](GUIDELINES.md) for more information.

## Getting started

### Prerequisites

1. [Install Node.js](https://nodejs.org/en/download/)

### Installation

1. Clone the repository:

```shell script
git clone https://github.com/MrSquaare/i-have-todo-this.git
```

2. Install dependencies:

```shell script
npm install
```

## Developing

Start the development server and the development web app:

```shell script
npm run dev
```

By default, the development server is running on [http://localhost:3000](http://localhost:3000) and the development web app on [http://localhost:5173](http://localhost:5173).

## Testing

Lint the code:

```shell script
npm run lint
```

Format the code:

```shell script
npm run format
```

Run the tests:

```shell script
npm run test
```

Run the End-to-End tests:

```shell script
npm run test:e2e
```
