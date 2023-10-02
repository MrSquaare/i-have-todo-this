# i-have-todo-this

A simple but yet powerful todo list.

## Table of Contents

- [About](#about)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Using](#using)
- [OpenAPI](#openapi)
- [Contributing](#contributing)
- [License](#license)

## About

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), powered by [Turborepo](https://turborepo.org/).

It is composed of two main projects:

- the [Server](server), powered by [NestJS](https://nestjs.com/)
- the [Web App](web-app), powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)

The packages common to both projects can be found in [common](common)

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

3. Build the project:

```shell script
npm run build
```

## Using

Start the server and the web app:

```shell script
npm run start
```

By default, the server is running on [http://localhost:3000](http://localhost:3000) and the web app on [http://localhost:4000](http://localhost:4000).

## OpenAPI

The OpenAPI documentation is automatically generated from the code.

By default, it is available at [http://localhost:3000/api](http://localhost:3000/api) when the server is running.

## Contributing

Bug reports, feature requests, other issues and pull requests are welcome.
See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License.
See [LICENSE](LICENSE) for more information.
