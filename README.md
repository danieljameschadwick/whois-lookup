# whois-lookup

![Landing page](docs/images/landing.png)

A simple Whois API lookup service leveraging APILayer.

## Stack

T3 Stack project, bootstrapped with create-t3-app. Using:
- NextJS: with API routes,
- TailwindCSS.

## Setup

To run locally you need to follow the steps below.

To install dependencies, run:

```bash
yarn 
```

Then, copy `.env.dist` to a `.env` file, with your API Layer key.

Then, to run the application:

```bash
yarn dev
```

### V2 API

To run the v2 API:

```bash
yarn vercel
```

> // NOTE: Need to replace this dependency with a non-vendor locked runtime.
