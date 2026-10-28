# Smart Expense Tracker — Assignment Requirements

> Reference for Aggi (Antigravity/Gemini). This document separates the instructor's requirements from our project-specific decisions. Use the existing project files to establish actual implementation details. Do not treat proposed or untested behavior as verified.

## 1. Instructor's application requirements

Build a **simple Expense Tracker web page** with AI assistance. The application must:

1. Add an expense with a **name, amount, and category** (examples given: Food, Travel, Shopping).
2. Display the expenses entered by the user.
3. Show the **total amount spent**.
4. Allow the user to **delete an expense**.
5. Show a simple message for invalid inputs, such as an **empty name** or an amount that is **zero or negative**.

## 2. Instructor's technical constraints

- **HTML, CSS, and JavaScript are sufficient.**
- A **backend, database, login, and deployment are not required**.
- Expense data **may reset when the page is refreshed**.
- Keep the application simple and understandable rather than adding unnecessary complexity.
- Review AI-generated code, run the application, and check that it meets the requirements.

## 3. Approved project implementation decisions

These are **our choices**, not additional instructor mandates:

- Use **HTML5, plain CSS, and vanilla JavaScript**, without frameworks or unnecessary libraries.
- Use these predefined categories: **Food, Transport, Housing, Entertainment, Utilities, Other**.
- Display monetary values in **USD ($)** with two decimal places.
- Delete an expense **immediately**, without a confirmation dialog.
- Keep expenses in an **in-memory array**; no persistence is required.
- Identify expenses using a **simple incrementing ID counter**.
- Keep code readable and beginner-friendly. Preserve existing working features when making changes.
- Use the existing project files as the authority for actual element IDs, variable names, functions, and implementation details; do not invent these.

## 4. Existing project and verification status

Project files (as described in our development workflow):

- `index.html` — page structure and controls.
- `style.css` — styling and layout.
- `app.js` — input validation, expense storage, total calculation, list rendering, and deletion.

The student reports that **development Tasks 1–7 passed manual verification**, including adding expenses, displaying them, calculating totals, deleting them, and rejecting invalid inputs. This is **student-reported testing**, not an independent code audit. **Task 8: end-to-end testing and review** remains to be carried out.

The project has been pushed successfully to a GitHub repository.

## 5. Task 8 — Testing context

When preparing the end-to-end test plan:

- Compare the **actual source files** against the five instructor requirements above.
- Include normal usage, invalid inputs, boundary cases (including `$0.01 + $0.02 = $0.03`), deletion/total recalculation, and regression checks.
- Produce a manual test matrix with **test ID, steps/input, expected result, actual result, and pass/fail**.
- Leave **actual result and pass/fail blank** until the student performs the tests.
- **Do not change project files or claim tests were run** unless explicitly requested and verified.
- Flag missing information or discrepancies instead of inventing requirements or results.

## 6. Instructor's submission requirements (for final handoff)

Submit:

1. Project HTML/CSS/JavaScript files **or a GitHub repository link**.
2. The **initial structured prompt** and a few important follow-up prompts.
3. A short note describing **one improvement** made after reviewing or testing the AI output.
4. **Screenshots** of the working application and a few test results.

> Prompt-writing evidence and classroom theory are part of the student's learning/submission process; they are intentionally **not reproduced here** because Aggi only needs the implementation requirements to test and review the application.
