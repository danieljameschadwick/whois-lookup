# whois-lookup

![Landing page](docs/images/landing.png)

A simple Whois API lookup service leveraging APILayer.

## Stack

T3 Stack project, bootstrapped with create-t3-app. Using:
- NextJS: with API routes,
- TailwindCSS.

### API Routes

Within NextJS, we can support serverless functions to build APIs within the framework. In this project we have two versions written in Typescript, and Golang:

- src: `src/pages/api/whois.ts` -> URL: `/api/whois`
- src: `api/v2/whois.go` -> URL: `/api/v2/whois`

This allows us to leverage different runtimes within the same project, and using the right tools for the job.

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
yarn vercel:dev
```

> // NOTE: Need to replace this dependency with a non-vendor locked runtime.
