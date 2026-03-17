---
name: Astro inline code blocks
description: Backtick template literals with curly braces inside JSX props in .astro files break the parser — define code strings in frontmatter instead.
type: feedback
---

Never use inline backtick template literals for CodeBlock `code` props in .astro files. The Astro parser treats `}` at the start of a line inside `code={\`...\`}` as closing the JSX expression, causing build errors.

**Why:** Astro's parser does not fully support template literals in JSX expressions the way TSX does. The `}` character inside the template literal is misinterpreted as closing the JSX expression.

**How to apply:** Always define multiline code strings as `const` variables in the frontmatter `---` block, then reference them as `code={variableName}` in the template.
