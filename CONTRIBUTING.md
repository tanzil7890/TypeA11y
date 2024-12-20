# Contributing to TypeA11y

First off, thank you for considering contributing to TypeA11y! It's people like you who make TypeA11y a great tool for ensuring web accessibility.

## Project Overview

TypeA11y is a compiler plugin that enforces accessibility (a11y) best practices at compile time. The project consists of several key components:

### Core Components

1. **Babel Plugin** (`src/babel/`)
   - `plugin.ts` - Main Babel plugin entry point
   - `aria-validator.ts` - ARIA validation logic for Babel

2. **TypeScript Transformer** (`src/typescript/`)
   - `transformer.ts` - TypeScript transformation and validation logic

3. **Type Definitions** (`src/types/`)
   - `aria.ts` - ARIA roles and attributes definitions
   - `jsx.d.ts` - React JSX type augmentations[TODO]

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/tanzil7890/TypeA11y.git
cd TypeA11y
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting patterns
- Include JSDoc comments for public APIs
- Use meaningful variable and function names
- Keep functions focused and single-purpose

### Testing

- Write unit tests for new features
- Include test cases for both valid and invalid scenarios
- Test both TypeScript and Babel implementations
- Ensure tests cover error messages and edge cases

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add or update tests as needed
5. Run the test suite
6. Update documentation if necessary
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to your branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Commit Message Guidelines

Follow the conventional commits specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code changes that neither fix bugs nor add features
- `chore:` Changes to build process or auxiliary tools

## Adding New Features

### Adding ARIA Roles

To add new ARIA roles, update `src/types/aria.ts`:

```typescript
export const validRoles = [
  // Add new role here
  "newrole",
  // ...existing roles
];

export const ariaAttributesByRole: Record<ARIARole, string[]> = {
  // Add attributes for new role
  newrole: ["aria-label", "aria-labelledby", "custom-attribute"],
  // ...existing role attributes
};
```

### Adding New Validations

1. For Babel: Add validation logic to `src/babel/aria-validator.ts`
2. For TypeScript: Add validation logic to `src/typescript/transformer.ts`

## Common Development Tasks

### Adding a New Validation Rule

1. Identify the validation target (ARIA, semantic HTML, etc.)
2. Add validation logic to both Babel and TypeScript implementations
3. Add test cases for the new validation
4. Update documentation with new rule details

### Debugging

1. Use TypeScript's compiler API debugging tools
2. For Babel transformations, use `@babel/parser` playground
3. Add console logs with `api.debug()` in Babel plugin
4. Use source maps for accurate error reporting

## Project Structure

```
TypeA11y/
├── src/
│   ├── babel/           # Babel plugin implementation
│   ├── typescript/      # TypeScript transformer
│   ├── types/          # Type definitions
│   └── index.ts        # Main entry point
├── tests/              # Test files
├── docs/              # Documentation
└── examples/          # Usage examples
```

## Getting Help

- Open an issue for bugs or feature requests
- Join project discussions
- Review existing PRs and issues
- Check documentation

## License

By contributing to TypeA11y, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## Questions?

Don't hesitate to ask questions by opening an issue or joining the discussions. 