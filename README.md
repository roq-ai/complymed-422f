## Welcome to ComplyMed

ComplyMed is a B2B SaaS application that was generated using [ROQ.ai](https://roq.ai/)

- Documentation: https://docs.roq.tech
- License: MIT

## Running locally

### (0) Prerequisites

Make sure these tools are installed and up-to-date:

- Node
- NPM (or Yarn)

### (1) Clone the repository

### (2) Setup environment variables

The app relies on a `.env` file for configuration, located in the application root. 
Create the configuration by copying the contents from the "Application Detail" page in ROQ Console to your `.env` file. 
An example file can be found in `.env.example` in the application root.

### (3) Install dependencies and start the application

```bash
# With npm
npm install
npm run dev
```

or

```bash
# With Yarn
yarn
yarn dev
```

Now you can open your app at [http://localhost:3000](http://localhost:3000).

## Further documentation

To learn more about ROQ UI components and APIs, take a look at [ROQ Documentation](https://docs.roq.tech)
