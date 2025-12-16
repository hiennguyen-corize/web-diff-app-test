This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

Point to folder:

```bash
cd web-diff-app
```

Install packages:

```bash
bun install --frozen-lockfile
```

Add a package:

```bash
bun add <package-name>
#or just for development
bun add <package-name> -d
```

Run the development server:

```bash
bun dev
```

Run build:

```bash
bun run build
```

Run start:

```bash
bun start
```

Run dev:

```bash
bun run dev
```

Run lint:

```bash
bun lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Get Static files for production (./dist)

Point to folder:

```bash
cd web-diff-app
```

Add permission:

```bash
chmod +x buildProd.sh
```

Run script:

```bash
bun run build:prod
#or
npm run build:prod
```
