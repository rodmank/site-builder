# ConvertX Enhancement Workflow

This workflow is designed for implementing detailed feature PRs for the ConvertX enhancement project.

## Sprint 1 PRs Available:

- **#5**: 🔧 PR 1.1: Chunked File Upload System
- **#6**: 🎨 PR 1.2: Enhanced Drag & Drop Interface
- **#7**: 📋 PR 1.3: File Management Dashboard

## Usage

Run this workflow with the issue number you want to implement:

```bash
# Example: Implement chunked upload system
./issue.md 5

# Example: Implement drag & drop enhancement
./issue.md 6

# Example: Implement file management dashboard
./issue.md 7
```

---

## Workflow Steps

Please analyze and implement the GitHub issue: $ARGUMENTS.

Follow these steps:

# PLAN

1. Use `gh issue view $ARGUMENTS` to get the detailed issue specifications
2. Understand the technical requirements and architecture outlined in the issue
3. Review the acceptance criteria and definition of done
4. Understand the prior art and dependencies:
   - Search the codebase for relevant files mentioned in the issue
   - Check if there are any related PRs or issues
   - Review the current implementation that needs enhancement
5. Break down the issue into small, manageable implementation tasks
6. Create an implementation plan following the issue's technical specifications

# CREATE

- **IMPORTANT**: Always start from latest main: `git checkout main && git pull origin main`
- Create a new feature branch: `git checkout -b feature/issue-$ARGUMENTS`
- **Keep commits small and focused** - one logical change per commit
- **Rebase frequently**: Run `git rebase main` every 1-2 days during development
- Implement the solution following the detailed specifications in the issue:
  - Follow the file structure and component architecture outlined
  - Implement all required API endpoints and database changes
  - Add the specified UI/UX improvements
  - Include proper TypeScript types and interfaces
- **Before each commit**: Check if main has advanced: `git fetch origin main`
- **If main has new commits**: Rebase immediately: `git rebase origin/main`
- Commit changes after each logical step with descriptive commit messages
- Follow the coding standards and patterns established in the codebase

# TEST

- **Before testing**: Ensure branch is current: `git rebase origin/main`
- Implement the testing strategy specified in the issue:
  - Write unit tests for all new components and utilities
  - Add integration tests for API endpoints
  - Include browser compatibility tests if UI changes
  - Add performance tests if specified
- Run the existing test suite: `bun run lint && bun run lint:tsc`
- Test the implementation manually using the running dev server
- Verify all acceptance criteria are met
- Ensure no regressions in existing functionality

# DEPLOY

- **Pre-push sync**: Always rebase before pushing: `git fetch origin main && git rebase origin/main`
- Ensure all changes are committed: `git add . && git commit -m "final changes"`
- Push the feature branch: `git push origin feature/issue-$ARGUMENTS`
- Create a PR using the GitHub CLI:

  ```bash
  gh pr create --head feature/issue-$ARGUMENTS --title "🚀 Implement: [Issue Title]" \
    --body "Closes #$ARGUMENTS

  ## Summary
  [Brief description of changes]

  ## Changes Made
  - [List of major changes]

  ## Testing
  - [Testing performed]

  ## Screenshots/Demo
  [If UI changes]

  🤖 Generated with [Claude Code](https://claude.ai/code)
  " \
    --base main
  ```

- Request review and link to the original issue

Remember to use the GitHub CLI (`gh`) for all Github‑related tasks.
