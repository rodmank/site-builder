# ConvertX Coding Standards

## File & Naming Conventions

**Files**: camelCase with descriptive names (`EnhancedDropzone.tsx`, `fileValidation.ts`)
**Directories**: lowercase, plural for collections (`components/`, `helpers/`)
**Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`, `WEBROOT`)
**Interfaces**: PascalCase with descriptive names (`FileMetadata`, `ValidationResult`)

## TypeScript Standards

**Strict Configuration**: Always use strict TypeScript with `exactOptionalPropertyTypes`
**Type Safety**: No `any` types, use proper interfaces and type assertions
**Null Safety**: Use optional chaining (`?.`) and nullish coalescing (`??`)
**Enums**: For constants that need type safety (`FileStatus`, `BulkOperation`)

```typescript
// ✅ Good
interface ComponentProps {
  required: string;
  optional?: number;
}

// ❌ Avoid
function handler(data: any) { ... }
```

## Component Patterns (KitaJS/HTML)

**Structure**: Component + Script pattern for interactive elements
**Props**: Destructure with defaults, include `className = ''` when needed
**JSX Import**: Use `@kitajs/html` consistently

```typescript
// Component pattern
export function ComponentName({
  prop = defaultValue,
  className = ''
}: Props) {
  return <div class={`base-classes ${className}`}>...</div>;
}

// Script companion
export function ComponentNameScript() {
  return <script>{`...`}</script>;
}
```

## Import Organization

1. Node.js built-ins (`node:fs`, `node:path`)
2. External packages (`elysia`, `@kitajs/html`)
3. Internal modules (relative paths)
4. Type-only imports last

```typescript
import { readFile } from "node:fs/promises";
import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import type { FileMetadata } from "../db/types";
```

## Database Patterns

**Queries**: Always use parameterized queries with type safety
**Transactions**: Wrap related operations in transactions
**Error Handling**: Catch and log database errors appropriately

```typescript
// ✅ Type-safe query
const file = db.query("SELECT * FROM files WHERE id = ?").as(FileEntity).get(fileId);

// ✅ Safe transaction
db.transaction(() => {
  db.query("INSERT...").run(data);
  db.query("UPDATE...").run(updateData);
})();
```

## Error Handling

**API Routes**: Return structured error responses
**Validation**: Use server-side validation with clear messages
**Logging**: Use descriptive error messages with context

```typescript
// API error pattern
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  console.error("Operation failed:", error);
  set.status = 500;
  return { error: "User-friendly message" };
}
```

## Security Standards

**Input Validation**: Always validate and sanitize user inputs
**SQL Injection**: Use parameterized queries only
**XSS Prevention**: Sanitize all user content before rendering
**CSRF**: Include CSRF tokens for state-changing operations

## Testing Requirements

**Unit Tests**: Test individual functions and components
**Integration Tests**: Test API endpoints with mocked dependencies  
**Security Tests**: Validate input sanitization and authentication
**UI Tests**: Use Puppeteer for critical user flows

```typescript
// Test pattern
describe("FeatureName", () => {
  test("should handle expected scenario", () => {
    // Arrange
    const input = createTestData();

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toEqual(expectedOutput);
  });
});
```

## Documentation

**JSDoc**: Document all public APIs and complex functions
**README**: Keep CLAUDE.md updated with architecture changes
**Comments**: Explain why, not what; focus on business logic

## Performance Guidelines

**Lazy Loading**: Load heavy components only when needed
**Validation**: Validate on both client and server
**Database**: Use appropriate indexes and limit query results
**Assets**: Optimize images and use appropriate formats

## Code Review Checklist

- [ ] TypeScript compiles without errors
- [ ] Tests pass and cover new functionality
- [ ] Security validation implemented
- [ ] Error handling covers edge cases
- [ ] Performance impact considered
- [ ] Documentation updated if needed
