# TypeA11y Documentation

## Table of Contents
1. [Getting Started](#getting-started)
2. [Configuration](#configuration)
3. [Validation Rules](#validation-rules)
4. [Custom Rules](#custom-rules)
5. [API Reference](#api-reference)
6. [Troubleshooting](#troubleshooting)

## Getting Started

### Installation
```bash
npm install @a11y/compiler-plugin --save-dev
```

### Basic Setup
1. **TypeScript Setup** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "@a11y/compiler-plugin/typescript" }
    ]
  }
}
```

2. **Babel Setup** (`.babelrc`):
```json
{
  "plugins": ["@a11y/compiler-plugin/babel"]
}
```

## Validation Rules

### 1. ARIA Role Validation
- Validates against WAI-ARIA 1.2 specification
- Ensures roles are properly nested
- Example:
```jsx
// ✅ Valid
<div role="button" aria-pressed="true">Click me</div>

// ❌ Invalid
<div role="invalid-role">Error</div>
```

### 2. Image Accessibility
- Enforces alt text on images
- Validates decorative images
- Example:
```jsx
// ✅ Valid
<img src="photo.jpg" alt="Description" />
<img src="decoration.jpg" alt="" role="presentation" />

// ❌ Invalid
<img src="photo.jpg" />
```

### 3. Heading Structure
- Enforces proper heading hierarchy
- Prevents skipping levels
- Example:
```jsx
// ✅ Valid
<h1>Title</h1>
<h2>Subtitle</h2>
<h3>Section</h3>

// ❌ Invalid
<h1>Title</h1>
<h3>Skipped h2!</h3>
```

## Custom Rules

### Creating Custom Validators
```typescript
import { AriaValidator } from '@a11y/compiler-plugin';

class CustomValidator extends AriaValidator {
  validateCustomRule(element: JSXElement) {
    // Custom validation logic
  }
}
```

## API Reference

### Core Classes
- `AriaValidator`
- `TypeScriptTransformer`
- `BabelPlugin`

### Type Definitions
- `ARIARole`
- `AriaAttributes`

## Troubleshooting

### Common Issues
1. **Build Failures**
   - Check TypeScript/Babel configuration
   - Verify plugin installation

2. **False Positives**
   - Use escape hatches for edge cases
   - Configure rule exceptions
```

For more detailed documentation, see specific guides in the `/docs` directory.
