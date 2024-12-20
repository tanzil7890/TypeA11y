# TypeA11y Tests

## Test Structure
```
tests/
├── unit/
│   ├── validators/
│   │   ├── aria.test.ts
│   │   ├── heading.test.ts
│   │   └── img.test.ts
│   └── transformers/
│       ├── typescript.test.ts
│       └── babel.test.ts
├── integration/
│   ├── react-components.test.tsx
│   └── build-process.test.ts
└── fixtures/
    ├── valid-components/
    └── invalid-components/
```

## Running Tests
```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --testPathPattern=aria

# Run with coverage
npm test -- --coverage
```

## Writing Tests

### Unit Test Example
```typescript
import { AriaValidator } from '../src/babel/aria-validator';

describe('AriaValidator', () => {
  let validator: AriaValidator;

  beforeEach(() => {
    validator = new AriaValidator();
  });

  test('validates correct ARIA roles', () => {
    // Test implementation
  });
});
```

### Integration Test Example
```typescript
import { createTransformer } from '../src/typescript/transformer';

describe('TypeScript Transformer', () => {
  test('transforms JSX with accessibility attributes', () => {
    // Test implementation
  });
});
```
