<p align="center">
  <img src="./assets/typea11y.png" alt="TypeA11y Logo" width="400"/>
</p>
# TypeA11y - Accessibility Compiler Plugin

A powerful TypeScript/Babel compiler plugin that enforces accessibility (a11y) best practices at compile time. This plugin helps catch accessibility issues early in the development process by validating React/JSX code against WAI-ARIA specifications.



## Vision
A library or tool that runs compile-time validations against your JSX/TSX/HTML code to catch common accessibility mistakes—missing alt attributes, incorrect ARIA roles, or lack of proper headings structure.

## What problem it solves 
Accessibility issues often slip through until runtime or manual testing. A compile-time solution would guide developers to fix these problems early. Combined with a typed approach, it could offer suggestions for compliant ARIA attributes and highlight required accessibility properties.

## Features

### 🔍 Static Analysis
- Validates ARIA roles and attributes at compile time
- Ensures proper heading structure (h1-h6)
- Enforces alt text on images
- Type-safe with TypeScript integration

### ⚡ Performance
- Zero runtime overhead
- Catches issues during build process
- Works with existing build pipelines

### 🛠 Framework Support
- Works with React
- Supports both TypeScript and Babel
- Compatible with modern build tools

## Installation

```bash
# Using npm
npm install @a11y/compiler-plugin --save-dev

# Using yarn
yarn add -D @a11y/compiler-plugin
```

## Configuration

### TypeScript Setup

Add the transformer to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "@a11y/compiler-plugin/typescript" }
    ]
  }
}
```

### Babel Setup

Add the plugin to your `.babelrc` or `babel.config.js`:

```javascript
module.exports = {
  plugins: ['@a11y/compiler-plugin/babel']
};
```

## Usage Examples

### ✅ Valid Code Examples

```tsx
// Proper heading structure
const GoodHeadings = () => (
  <div>
    <h1>Main Title</h1>
    <h2>Subtitle</h2>
    <h3>Section</h3>
  </div>
);

// Valid ARIA usage
const GoodButton = () => (
  <button 
    role="button"
    aria-pressed="true"
    aria-label="Toggle Menu"
  >
    Menu
  </button>
);

// Proper image accessibility
const GoodImage = () => (
  <img src="photo.jpg" alt="A beautiful landscape" />
);
```

### ❌ Invalid Code Examples

```tsx
// These will fail compilation
const BadExamples = () => (
  <div>
    {/* Missing alt attribute */}
    <img src="photo.jpg" />

    {/* Invalid ARIA role */}
    <button role="invalid-role">Click me</button>

    {/* Skipped heading level */}
    <h1>Title</h1>
    <h3>Subtitle</h3>

    {/* Invalid ARIA attribute */}
    <button role="button" aria-invalid-attr="true">
      Click me
    </button>
  </div>
);
```

## Validation Rules

### 1. ARIA Roles
- Validates against WAI-ARIA specification
- Ensures roles are valid and properly used
- Checks role-specific attribute requirements

### 2. ARIA Attributes
- Validates attributes against allowed list for each role
- Ensures proper attribute values
- Prevents invalid attribute combinations

### 3. Heading Structure
- Enforces logical heading hierarchy
- Prevents skipping heading levels
- Maintains semantic document structure

### 4. Image Accessibility
- Requires alt text for images
- Enforces accessibility best practices
- Helps maintain WCAG compliance

## Requirements

- React >=16.8.0
- TypeScript >=4.0.0 (for TypeScript usage)
- Babel >=7.0.0 (for Babel usage)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support()

- 📚 [Documentation](docs/README.md)
- 🐛 [Issue Tracker](https://github.com/tanzil7890/TypeA11y/issues)
- 💬 [Discussions](https://github.com/tanzil7890/TypeA11y/discussions)

## Credits

Developed with ❤️ by [Mohammad Tanzil Idrisi / tanzil7890.github.io]

---

**Note**: This plugin is designed to help catch common accessibility issues but should not be considered a complete solution for web accessibility. Always test your applications with screen readers and other accessibility tools. 