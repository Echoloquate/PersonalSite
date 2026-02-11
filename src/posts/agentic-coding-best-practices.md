---
title: 'Agentic Coding: Lessons From Building Software With AI'
date: '2026-02-10'
description: Practical advice for working effectively with AI coding agents — from prompt structure to review discipline.
tags:
  - ai
  - workflow
  - best practices
readingTime: 8 min read
published: true
---

# Agentic Coding: Lessons From Building Software With AI

I built this entire portfolio site collaboratively with an AI coding agent. Not "AI generated the boilerplate and I took over" — I mean the full loop: planning, scaffolding, implementation, debugging, and deployment. Here's what I've learned about making that workflow actually productive.

## What Agentic Coding Actually Is

Agentic coding is a workflow where an AI agent operates as an active collaborator in your development process. Unlike autocomplete or one-off code generation, the agent has context about your project, can read and modify files, run commands, and iterate on its own work.

The key distinction: **the agent takes multi-step actions toward a goal**, not just single predictions. It reads your codebase, forms a plan, writes code, checks for errors, and fixes what's broken — in a loop.

## Start With a Spec, Not a Prompt

The single biggest factor in output quality is the clarity of your starting point. A vague prompt like "build me a portfolio site" produces vague results. A spec that defines pages, tech stack, design language, and conventions produces something you can actually ship.

For this site, the process was:

1. **Brainstorm** — Conversational back-and-forth to define scope
2. **Spec** — A concrete document with pages, features, and technical decisions
3. **CLAUDE.md** — Project context the agent references in every session
4. **Plan mode** — Agent reads the spec, explores the repo, and proposes an implementation plan before writing any code
5. **Execute** — Implementation against the approved plan

That sequence matters. Each step builds context that makes the next step more precise.

## Use Plan Mode Religiously

The most effective pattern I've found is **plan → approve → execute**:

```
You: "Add page transitions and responsive polish"

Agent: [Enters plan mode]
  - Reads all existing files
  - Identifies what needs to change
  - Proposes a step-by-step plan with specific files and changes
  - Flags what it WON'T do and why

You: [Review plan, request adjustments]

Agent: [Executes approved plan]
```

Why this works: it catches misunderstandings *before* code is written. Rewriting a plan is cheap. Rewriting an implementation is expensive. Plan mode also forces the agent to think through the full scope, which surfaces edge cases and ordering dependencies early.

## Write Context Files That Work

A `CLAUDE.md` (or equivalent project context file) is the highest-leverage artifact in an agentic workflow. Mine includes:

- **Project overview** — What this is and who it's for
- **Tech stack** — Specific versions and frameworks
- **Key context** — "The user is learning Svelte for the first time" changes how the agent writes code
- **Coding conventions** — Runes over stores, TypeScript everywhere, component size preferences
- **Project structure** — Where things live and why
- **Commands** — How to build, test, and check

The agent reads this file at the start of every session. Good context files make the difference between "technically correct but weird" code and code that fits your project naturally.

## Review Everything, Trust Nothing

This is non-negotiable. AI agents produce plausible-looking code that can be subtly wrong. Effective review habits:

**Read diffs, not just results.** The agent might "fix" something by removing functionality. Diffs show you what was removed.

**Run the build.** If `npm run check` and `npm run build` pass, you've eliminated a whole class of issues. Make the agent run these before declaring success.

**Check for over-engineering.** Agents love abstractions. Left unchecked, they'll create utility functions for one-time operations, add error handling for impossible scenarios, and build configuration systems for things with one value. Push back on unnecessary complexity.

**Watch for hallucinated APIs.** The agent might use a function signature that doesn't exist in the version of the library you're using. Type checking catches most of these, but not all.

## Keep Sessions Focused

Long, sprawling sessions produce worse results than focused ones. Each session should have a clear goal:

- **Session 1:** Write the spec
- **Session 2:** Scaffold the project
- **Session 3:** Design refinements (transitions, responsive, SEO)

When sessions get too long, the agent's context window fills up with stale information. Starting a fresh session with good context files (`CLAUDE.md`, process logs) is more effective than continuing a degraded one.

## Use Hooks and Guardrails

Most agentic coding tools support hooks — scripts that run automatically before or after the agent takes actions. Use them:

```javascript
// Example: Block git commits that don't include README updates
const isGitCommit = /(^|&&\s*|;\s*)git\s+commit\b/.test(command);
if (isGitCommit) {
  const staged = execSync('git diff --cached --name-only');
  if (!staged.includes('README.md')) {
    // Deny the commit with instructions to update docs first
  }
}
```

Hooks encode your process requirements as automated checks. The agent can't forget to update docs if a hook blocks commits without doc changes.

## The Human's Job Changes, Not Disappears

Working with an AI coding agent doesn't make you a passenger. Your job shifts from writing code to:

- **Defining requirements** clearly enough to act on
- **Making architectural decisions** the agent can't make alone
- **Reviewing output** with enough depth to catch issues
- **Steering direction** when the approach isn't working
- **Maintaining quality standards** the agent doesn't inherently have

The developers who get the most out of agentic coding are the ones who bring strong opinions about what good code looks like. The agent is a force multiplier — it multiplies whatever direction you point it in.

## The Bottom Line

Agentic coding is a genuinely new way to build software, but it's not magic. It works best when you bring structure (specs, context files, plans), discipline (review everything, keep sessions focused), and guardrails (hooks, type checking, build verification).

The goal isn't to remove yourself from the process. It's to spend your time on the parts that matter most — design, architecture, and quality — while the agent handles the mechanical work of turning decisions into code.
