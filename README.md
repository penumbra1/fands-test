# Table of contents

This is a demo showcasing a table of contents implemented with `TreeList`, a component that displays a multilevel hierarchy of items.

## Running the demo

Use [pnpm](https://pnpm.io/installation) or any other Node package manager.

```sh
# Prepare and run the production build
pnpm demo
```

## Testing

### Unit

```sh
pnpm test:unit
```

### End-to-end

```sh
# Development build
pnpm test:e2e:dev
```

```sh
# Production build (recommended for CI)
pnpm build
pnpm test:e2e
```
