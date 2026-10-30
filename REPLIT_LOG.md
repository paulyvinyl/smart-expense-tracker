# Replit Learning Experiment: Dark Mode

## 1. Experiment Overview

After completing the original CICD assignment, I used Replit as an AI coding assistant to make a small enhancement to my existing GitHub Smart Expense Tracker. The experiment was performed on the separate `replit-learning` Git feature branch. It was an optional learning exercise, not an original CICD assignment requirement.

The original application had five required features. Before this experiment, the user reports that the original app passed 19 of 19 manual tests and 7 of 7 post-refactoring regression tests. Those results apply to the original application and are separate from the dark mode experiment.

## 2. Original Engineered Prompt (Verbatim)

The following is the original prompt submitted for the Replit implementation. Its seven structured sections are reproduced from the submitted prompt file.

```text

# ROLE
Act as an experienced Frontend Developer
specializing in modern UI/UX and vanilla
JavaScript applications.

# CONTEXT
I imported my completed CICD Smart Expense
Tracker project from GitHub into Replit.

The application currently runs successfully.

I created a separate Git feature branch for
experimenting with improvements.

The existing application uses:
- HTML5
- Vanilla CSS
- Vanilla JavaScript

All five original application features have
been implemented and manually verified.

This is a small experimental enhancement.
The existing application must continue working.

# TASK
Add a modern light/dark theme toggle to the
existing Smart Expense Tracker.

Requirements:

1. Add a small pill-shaped toggle switch near
   the bottom-right corner of the application.

2. Use a sun/moon icon or similarly intuitive
   visual indicator.

3. The existing light theme must remain the
   default for first-time visitors.

4. When toggled, apply a coordinated dark theme
   to the entire application.

5. Use a modern dark navy/charcoal palette,
   avoiding harsh pure-black backgrounds.

6. Preserve the existing blue primary button
   and green total summary styling, adjusting
   contrast appropriately for dark mode.

7. Add a subtle transition when switching themes.

8. Save the user's selected theme using
   browser localStorage.

9. Restore the saved theme when the page reloads.

10. Ensure the switch remains accessible and
    functional on desktop and mobile layouts.

# CONSTRAINTS
- Inspect existing HTML, CSS, and JavaScript
  before modifying anything.
- Use vanilla HTML, CSS, and JavaScript only.
- Do not introduce React, Tailwind, or libraries.
- Preserve all existing application functionality.
- Do not alter expense storage behavior.
- Do not modify calculations or validation logic.
- Do not change the existing expense data model.
- Do not redesign the application.
- Do not modify unrelated documentation.
- Avoid unnecessary dependencies.
- Use accessible labels and keyboard controls.
- Keep the implementation simple and readable.
- Do not commit, push, or merge Git changes.
- Do not change branches.
- Do not deploy the application.

# EXAMPLES
Light theme:
- Existing light background.
- Dark readable text.
- Current blue Add Expense button.
- Existing green total summary.

Dark theme:
- Dark navy/charcoal background.
- Light readable text.
- Appropriately styled input fields.
- Accessible error messages.
- Existing functionality remains unchanged.

Click toggle:
Light -> Dark -> Light.

Refresh while dark mode is selected:
Dark mode remains enabled.

# OUTPUT FORMAT
1. Identify which files require modification.
2. Explain the implementation approach briefly.
3. Implement the dark-mode feature.
4. Show a summary of changes to each file.
5. Explain how theme switching works.
6. Provide a manual verification checklist.
7. Identify any unexpected changes or limitations.

# SUCCESS CRITERIA
- Toggle appears near the bottom-right corner.
- Light mode retains the existing appearance.
- Dark mode looks cohesive and professional.
- Both themes have readable contrast.
- Theme changes without page reload.
- Selected theme persists after refresh.
- Toggle works using mouse and keyboard.
- All five original expense-tracker features
  continue working.
- No unrelated application logic is modified.
- No Git commit, push, merge, or deployment occurs.

Stop after implementation.

Wait for my manual verification and approval.
```

## 3. Implementation Summary

### Files changed

- `index.html` — Adds the theme switch markup and reads a saved theme before the stylesheet loads.
- `app.js` — Applies the selected theme, updates the switch label and `aria-checked` state, and saves the selection.
- `style.css` — Adds dark theme colors, switch layout and states, transitions, and reduced-motion handling.

### How it works

The light styles remain the default. An inline script in the page head reads the `smart-expense-tracker-theme` value from `localStorage` before the stylesheet loads; only `light` and `dark` are accepted. The switch is a button with `role="switch"` and an `aria-checked` state. Clicking it changes the root element's `data-theme`, updates its visible label and sun/moon icon, and attempts to save the new choice.

The CSS applies dark navy and charcoal colors when the root element has `data-theme="dark"`. It styles the form, error banner, expense rows, and controls while keeping the Add Expense button blue and the total summary green. The toggle is fixed near the bottom-right edge, with safe-area offsets on mobile, and the theme transition is shortened for users who prefer reduced motion.

### Design intent and actual behavior

- **Design intent:** Keep the original light appearance, use a cohesive dark palette rather than pure black, retain blue and green accents, and make the toggle accessible and usable at different screen sizes.
- **Implemented behavior:** The light theme is used when no valid saved preference is found. A saved `light` or `dark` preference is restored on reload. Theme changes happen without reloading the page. Expense state remains in memory and still resets on reload, as it did before this enhancement.

## 4. Manual Testing & Verification

The checklist below reflects the requirements and success criteria in the original prompt:

- [x] A first-time visit uses the existing light theme.
- [x] The toggle is positioned near the bottom-right and shows a sun/moon indicator.
- [x] Mouse and keyboard can operate the toggle, and switching themes does not reload the page.
- [x] Dark mode uses readable navy/charcoal surfaces and styles the form fields and error message.
- [x] The blue primary button and green total summary styling remain recognizable in both themes.
- [x] The selected theme is saved and restored after a page reload.
- [x] The toggle remains usable on desktop and mobile layouts.
- [x] The five original features—adding, displaying, totaling, deleting, and validating expenses—continue to work.
- [x] Expense storage behavior, calculations, validation logic, and the expense data model remain unchanged.

**Result:** The user reports that all manual verification conditions passed. Replit did not independently run these interactive manual tests. Its earlier checks were limited to rendering the app preview at desktop and mobile sizes and checking JavaScript syntax; those checks do not replace the user's manual verification.

## 5. Prompt Outcome

**Original prompt outcome: SUCCESS.** The expected light/dark toggle was implemented, and the user reports that all listed manual conditions passed.

**Known limitation:** If browser `localStorage` is unavailable or blocked, the selected theme cannot persist across reloads. The page falls back to light when it cannot read a saved preference; a failed write is reported in the browser console. Expense data continues to reset on reload, matching the original assignment behavior.

## 6. Learning Objectives

This experiment demonstrates:

- Working with an existing GitHub repository in Replit.
- Developing on a separate Git feature branch.
- Structuring a prompt with Role, Context, Task, Constraints, Examples, Output Format, and Success Criteria.
- Using AI assistance to modify an existing application.
- Preserving established functionality and data behavior.
- Separating user-performed manual verification from automated checks.
- Documenting an optional enhancement without changing the original assignment requirements.

## 7. Experiment Conclusion

The Replit experiment added a persistent light/dark theme option to the completed expense tracker while preserving its original features and behavior. It provided a practical learning exercise in structured prompt engineering, AI-assisted changes to an existing GitHub project, feature-branch development, manual verification, and technical documentation. The dark mode enhancement remains separate from the original CICD assignment and its reported test results.
