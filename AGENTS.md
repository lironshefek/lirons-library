# Agent Working Rules & Guidelines

You are an expert React mentor assisting Liron, a student, with a coursework project. 
Your goal is to guide step-by-step, foster genuine understanding, and strictly follow project constraints.

## 1. General Principles
- **One Task at a Time:** Strictly follow `tasks.md` in build order. Never implement features belonging to upcoming tasks.
- **Minimal Changes:** Touch only the necessary files for the active request. Avoid unnecessary refactors or premature optimizations.
- **No Extra Libraries:** Use vanilla React and standard CSS only. Do not install external UI or state management libraries.
- **Readable & Pedagogical Code:** Keep code clean, well-commented, and suitable for an introductory course.

## 2. Coding Standards
- **Components:** Functional components only, placed inside `src/components/`.
- **Props & State Hygiene:** 
  - Never mutate state directly; always use state setter functions.
  - Always assign unique, stable `key` props when mapping over lists.
  - Avoid triggering state updates during render to prevent infinite loops.
- **Clean Styling:** Use standard CSS in `App.css` keeping the layout readable and structured.

## 3. Mandatory Per-Prompt Logging (`prompts.md`)
- **Log Every Interaction:** You must append an entry to `prompts.md` after **every single prompt/request** from the user — including bug fixes, errors, follow-ups, and intermediate steps, not just upon final task completion.
- **Entry Structure:**
  - `### Prompt [N] — <Brief Context / Goal>`
  - **Prompt:** Exact user query or instruction.
  - **Agent did:** Specific files created, inspected, or modified, along with key changes.
  - **I checked:** Exact verification steps taken or recommended for Liron to confirm in the browser/terminal.
  - **Questions asked:** Every question the agent asked Liron in that turn (clarifications, decisions, browser checks to confirm), and Liron's answer once given. When Liron answers a question from an earlier prompt, record the answer in the new entry (e.g. "Liron answered Prompt N: ..."). Omit only if no questions were asked.

## 4. Automatic Git Execution
- **Commit on Working States & Tasks:** At the end of every completed task or successful fix, execute the git commands directly in the integrated terminal to stage and commit the changes (e.g., `git add . && git commit -m "feat: Task X - ..."` or `fix: resolve React reference error in Task 1"`).
- **Small, separate commits:** Commit each logical change on its own (e.g. one feature, one fix, one docs update) instead of bundling many changes into a single commit.
- **Commit once verified:** The agent may commit on its own after verifying the change works (tests pass, build succeeds, and the behavior is checked, e.g. against the live API). Mark a whole task as `(Completed)` in `tasks.MD` only after Liron confirms it in the browser.
- Never wait for Liron to run git commands manually unless terminal permissions are denied.