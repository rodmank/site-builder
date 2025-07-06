# GitHub Issue Creation Workflow

This command helps create well-structured GitHub issues for ConvertX following the project's established format and conventions.

## Usage

```bash
# Create a new issue (will prompt for details)
./create-issue.md

# Create a specific type of issue
./create-issue.md feature    # Feature request/enhancement
./create-issue.md bug        # Bug report
./create-issue.md docs       # Documentation improvement
./create-issue.md question   # Support/question
./create-issue.md external   # External dependency issue
```

---

## Issue Creation Process

### Step 1: Determine Issue Type

**Arguments provided**: Use the specified type ($ARGUMENTS)

**No arguments**: Ask user to select:

- **feature** - New functionality or enhancement
- **bug** - Something isn't working correctly
- **docs** - Documentation improvements
- **question** - Support request or clarification needed
- **external** - Issue depends on external tools/libraries

### Step 2: Gather Information

Based on the issue type, collect the following details:

#### For Feature/Enhancement Issues:

1. **Feature Name**: What should this feature be called?
2. **Problem Statement**: What problem does this solve?
3. **User Impact**: Who benefits and how?
4. **Priority Level**: Low/Medium/High
5. **Sprint/Phase**: Which sprint/phase should this target?
6. **Dependencies**: Are there any blocking issues or requirements?
7. **Acceptance Criteria**: How do we know it's complete?

#### For Bug Issues:

1. **Bug Summary**: Brief description of the problem
2. **Steps to Reproduce**: How to recreate the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, version details
6. **Reproducibility**: Always/Sometimes/Random
7. **Severity**: Critical/High/Medium/Low
8. **Error Messages**: Any specific error messages or logs

#### For Documentation Issues:

1. **Documentation Area**: Which docs need improvement?
2. **Issue Type**: Missing/Incorrect/Unclear/Outdated
3. **Target Audience**: Users/Developers/Contributors
4. **Specific Changes**: What exactly needs to be changed?

#### For Question Issues:

1. **Question Type**: How-to/Why/What/When
2. **Context**: What are you trying to accomplish?
3. **Research Done**: What have you already tried?
4. **Urgency**: How soon do you need an answer?

#### For External Issues:

1. **External Dependency**: Which tool/library is involved?
2. **Issue Description**: What's the problem with the external tool?
3. **Impact on ConvertX**: How does this affect our functionality?
4. **Upstream Status**: Has this been reported upstream?
5. **Workaround**: Is there a temporary solution?

### Step 3: Generate Issue Content

Create the issue using the appropriate template:

#### Feature/Enhancement Template:

```markdown
# [EMOJI] [FEATURE_NAME]

## Overview

[Brief description of the feature and its purpose]

## Problem Statement

[What problem does this solve? Why is this needed?]

## Solution Architecture

[High-level approach to implementing this feature]

## Technical Implementation Details

[More detailed technical specifications]

## Files to Create/Modify

[List of files that will need changes]

## Acceptance Criteria

- [ ] [Specific testable requirement 1]
- [ ] [Specific testable requirement 2]
- [ ] [Specific testable requirement 3]

## Definition of Done

- [ ] [Implementation complete]
- [ ] [Tests written and passing]
- [ ] [Documentation updated]
- [ ] [Code reviewed and approved]

## Estimated Effort

**Size**: [Small/Medium/Large] (~X lines of code)
**Complexity**: [Low/Medium/High] (reason)
**Time**: [X days/weeks]
**Risk**: [Low/Medium/High] (risk factors)

## Dependencies

[List any blocking issues or requirements]

## Related Issues

[Link to related issues, PRs, or discussions]

---

**Sprint**: [Sprint number]
**Milestone**: [Phase/Milestone]
**Priority**: [Low/Medium/High]
```

#### Bug Template:

```markdown
# 🐛 [BUG_SUMMARY]

## Bug Description

[Clear, concise description of the bug]

## Steps to Reproduce

1. [First step]
2. [Second step]
3. [Third step]

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## Environment

- **OS**: [Operating System]
- **Browser**: [Browser name and version]
- **ConvertX Version**: [Version or commit]
- **Node/Bun Version**: [Runtime version]

## Reproducibility

- [ ] Always reproduces
- [ ] Sometimes reproduces
- [ ] Random/Hard to reproduce

## Severity

- [ ] Critical - System unusable
- [ ] High - Major functionality broken
- [ ] Medium - Minor functionality affected
- [ ] Low - Cosmetic or minor issue

## Error Messages/Logs
```

[Paste any error messages or relevant logs here]

```

## Screenshots/Videos
[If applicable, add screenshots or videos]

## Additional Context
[Any other relevant information]

## Potential Fix
[If you have ideas about how to fix this]
```

#### Documentation Template:

```markdown
# 📚 [DOCUMENTATION_AREA] Documentation Update

## Issue Type

- [ ] Missing documentation
- [ ] Incorrect information
- [ ] Unclear explanations
- [ ] Outdated content

## Current State

[What exists now or what's missing]

## Proposed Changes

[What should be changed/added]

## Target Audience

- [ ] End users
- [ ] Developers
- [ ] Contributors
- [ ] System administrators

## Acceptance Criteria

- [ ] [Specific documentation requirement 1]
- [ ] [Specific documentation requirement 2]
- [ ] [Specific documentation requirement 3]

## Files to Update

[List of documentation files to modify]
```

### Step 4: Assign Labels and Metadata

Based on the issue type and content, assign appropriate labels:

#### Feature/Enhancement:

- `enhancement` (primary)
- `good first issue` (if suitable for newcomers)
- `help wanted` (if community help is desired)

#### Bug:

- `bug` (primary)
- `can reproduce` or `can't reproduce` (once investigated)
- `good first issue` (if simple bug fix)

#### Documentation:

- `documentation` (primary)
- `good first issue` (if straightforward docs update)
- `help wanted` (if community help is desired)

#### Question:

- `question` (primary)
- `help wanted` (if community input is needed)

#### External:

- `external issue` (primary)
- `help wanted` (if community help is needed)

### Step 5: Create GitHub Issue

Use the GitHub CLI to create the issue:

```bash
gh issue create \
  --title "[EMOJI] [ISSUE_TITLE]" \
  --body "$(cat <<'EOF'
[GENERATED_ISSUE_CONTENT]
EOF
)" \
  --label "[LABEL1,LABEL2,LABEL3]" \
  --assignee "[ASSIGNEE_IF_SPECIFIED]"
```

### Step 6: Confirmation and Next Steps

After creating the issue:

1. Display the issue URL
2. Ask if user wants to:
   - Create a related PRD (using `create-prd.md`)
   - Start implementing immediately (using `issue.md`)
   - Create additional related issues

## Helper Functions

### Emoji Selection:

- 🚀 - New major features
- ✨ - Enhancements/improvements
- 🔧 - Configuration/setup features
- 📋 - Data/content management
- 🎨 - UI/UX improvements
- 🔒 - Security features
- 📊 - Analytics/reporting
- 🔌 - API/integration features
- 🐛 - Bug fixes
- 📚 - Documentation
- ❓ - Questions
- 🔗 - External dependencies

### Priority Assessment:

- **High**: Critical for current sprint, blocks other work
- **Medium**: Important but not blocking, can wait 1-2 sprints
- **Low**: Nice to have, can be scheduled flexibly

### Effort Estimation:

- **Small**: <200 lines of code, 1-3 days
- **Medium**: 200-500 lines of code, 4-7 days
- **Large**: >500 lines of code, 1-2 weeks

## Quality Checklist

Before creating the issue, verify:

- [ ] Title is clear and descriptive
- [ ] Problem statement is well-defined
- [ ] Solution approach is outlined (for features)
- [ ] Acceptance criteria are specific and testable
- [ ] Appropriate labels are assigned
- [ ] Related issues are referenced
- [ ] Effort estimation is reasonable
- [ ] Dependencies are identified

## Advanced Features

### Batch Issue Creation:

If user provides multiple related issues, offer to create them all with proper cross-references.

### Template Customization:

Allow users to modify templates for specific use cases or project phases.

### Integration Points:

- Link to existing sprint planning
- Reference PRD creation workflow
- Connect to implementation workflow

---

**End of Workflow**
