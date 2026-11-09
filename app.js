/* ==========================================================================
   Smart Expense Tracker - Application Logic (app.js)
   Feature: Same-Browser Expense Persistence
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. Storage Keys & Configuration
// --------------------------------------------------------------------------
// Distinct storage keys for expense records and theme preference
const expenseStorageKey = "smart-expense-tracker-expenses";
const themePreferenceKey = "smart-expense-tracker-theme";

// Valid categories supported by the application
const validCategories = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Utilities",
  "Other"
];

// --------------------------------------------------------------------------
// 2. DOM Element Selectors
// --------------------------------------------------------------------------
// References to HTML elements using their unique IDs from index.html
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategorySelect = document.getElementById("expense-category");
const errorMessageContainer = document.getElementById("error-message");
const expenseList = document.getElementById("expense-list");
const totalAmountDisplay = document.getElementById("total-amount");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = document.getElementById("theme-toggle-label");
const sortSelect = document.getElementById("sort-select");

// --------------------------------------------------------------------------
// 3. Helper Functions: Error Display & Clearing
// --------------------------------------------------------------------------
// Displays a helpful error message in the error container
function showError(message) {
  errorMessageContainer.textContent = message;
}

// Clears any existing error message
function clearError() {
  errorMessageContainer.textContent = "";
}

// --------------------------------------------------------------------------
// 4. Persistence Helpers & Application State
// --------------------------------------------------------------------------
// Validates an individual restored expense record against strict integrity rules:
// - Unique positive safe-integer ID
// - Nonblank trimmed name
// - Finite positive numeric amount
// - Category matching approved application categories
function isValidExpenseRecord(record, seenIds) {
  if (!record || typeof record !== "object") {
    return false;
  }
  if (
    typeof record.id !== "number" ||
    !Number.isSafeInteger(record.id) ||
    record.id <= 0 ||
    seenIds.has(record.id)
  ) {
    return false;
  }
  if (typeof record.name !== "string" || record.name.trim() === "") {
    return false;
  }
  if (
    typeof record.amount !== "number" ||
    !Number.isFinite(record.amount) ||
    record.amount <= 0
  ) {
    return false;
  }
  if (
    typeof record.category !== "string" ||
    !validCategories.includes(record.category)
  ) {
    return false;
  }
  seenIds.add(record.id);
  return true;
}

// Loads and validates saved expenses from localStorage on startup.
// Leaves stored value untouched if corrupt or unavailable, and keeps the app usable in memory.
function loadExpenses() {
  let raw;
  try {
    raw = window.localStorage.getItem(expenseStorageKey);
  } catch (error) {
    console.warn("Could not access localStorage to load expenses:", error);
    showError("Could not access local storage. Starting with an empty session.");
    return [];
  }

  // Missing storage is a normal empty start
  if (raw === null || raw === undefined) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn("Saved expense data is not an array. Starting with an empty list.");
      showError("Saved expense data is invalid. Starting with an empty session.");
      return [];
    }

    const seenIds = new Set();
    for (let i = 0; i < parsed.length; i++) {
      if (!isValidExpenseRecord(parsed[i], seenIds)) {
        console.warn("Saved expense record failed validation:", parsed[i]);
        showError("Saved expense records contain invalid data. Starting with an empty session.");
        return [];
      }
    }

    return parsed;
  } catch (error) {
    console.warn("Failed to parse saved expenses JSON:", error);
    showError("Saved expense data could not be parsed. Starting with an empty session.");
    return [];
  }
}

// Saves current expenses array to localStorage after an add or delete.
// Warns the user if storage fails so they know changes may be lost on reload.
function saveExpenses() {
  try {
    window.localStorage.setItem(expenseStorageKey, JSON.stringify(expenses));
  } catch (error) {
    console.warn("Could not save expenses to localStorage:", error);
    showError("Storage is full or unavailable. Your latest changes may be lost on reload.");
  }
}

// Initialize application state from persistent storage
let expenses = loadExpenses();

// Calculate next unique ID starting after the highest restored ID
let maxRestoredId = 0;
for (let i = 0; i < expenses.length; i++) {
  if (expenses[i].id > maxRestoredId) {
    maxRestoredId = expenses[i].id;
  }
}
let nextExpenseId = maxRestoredId + 1;

// --------------------------------------------------------------------------
// 5. Theme Preference
// --------------------------------------------------------------------------
function applyTheme(theme) {
  const isDarkTheme = theme === "dark";
  const activeTheme = isDarkTheme ? "dark" : "light";

  document.documentElement.dataset.theme = activeTheme;
  themeToggle.setAttribute("aria-checked", String(isDarkTheme));
  themeToggleLabel.textContent = isDarkTheme ? "Dark" : "Light";
}

applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", function () {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    window.localStorage.setItem(themePreferenceKey, nextTheme);
  } catch (error) {
    console.warn("Could not save the theme preference.", error);
  }
});

// --------------------------------------------------------------------------
// 6. Helper Functions: Total Calculation & Display Update
// --------------------------------------------------------------------------
// Sums the amounts of all expense objects currently stored in the expenses array.
// Uses integer cent arithmetic to avoid floating-point inaccuracies.
function calculateTotal() {
  let totalCents = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalCents += Math.round(expenses[i].amount * 100);
  }
  return totalCents / 100;
}

// Formats a numeric amount as a standard USD currency string ($XX.XX)
function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

// Updates the total spending display in the UI formatted as USD ($0.00)
function updateTotalDisplay() {
  const total = calculateTotal();
  totalAmountDisplay.textContent = formatCurrency(total);
}

// --------------------------------------------------------------------------
// 7. Helper Function: Dynamic List Rendering
// --------------------------------------------------------------------------
// Returns a sorted shallow copy of the expenses array based on the active sort dropdown.
// Does NOT sort or mutate the underlying expenses array in place.
// Preserves original entry order within each category in both A-Z and Z-A directions.
function getSortedExpenses() {
  const sortMode = sortSelect ? sortSelect.value : "original";

  if (sortMode === "original" || expenses.length <= 1) {
    return [...expenses];
  }

  return expenses
    .map(function (item, index) {
      return { item: item, index: index };
    })
    .sort(function (a, b) {
      const catA = a.item.category;
      const catB = b.item.category;

      if (catA !== catB) {
        return sortMode === "category-asc"
          ? catA.localeCompare(catB)
          : catB.localeCompare(catA);
      }

      // Preserve original entry order within the same category
      return a.index - b.index;
    })
    .map(function (wrapper) {
      return wrapper.item;
    });
}

// Re-renders the entire <ul> list based on the current contents of the expenses array.
function renderExpenses() {
  // Clear the existing list contents to prevent duplicate entries
  expenseList.innerHTML = "";

  // If there are no expenses in state, display friendly empty-state message
  if (expenses.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-list-message";
    emptyItem.textContent = "No expenses added yet";
    expenseList.appendChild(emptyItem);
    return;
  }

  // Get a separate display copy without mutating the underlying expenses array
  const displayExpenses = getSortedExpenses();

  // Iterate over each expense object in the sorted copy and construct its HTML elements
  for (let i = 0; i < displayExpenses.length; i++) {
    const expense = displayExpenses[i];

    // Create the outer <li> row
    const li = document.createElement("li");
    li.className = "expense-item";

    // Left column: Expense Name and Category Tag
    const infoDiv = document.createElement("div");
    infoDiv.className = "expense-info";

    const nameSpan = document.createElement("span");
    nameSpan.className = "expense-name-text";
    nameSpan.textContent = expense.name; // Safely set as text to prevent HTML injection

    const categorySpan = document.createElement("span");
    categorySpan.className = "expense-category-tag";
    categorySpan.textContent = expense.category;

    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(categorySpan);

    // Right column: Formatted Amount and Delete Button
    const metaDiv = document.createElement("div");
    metaDiv.className = "expense-meta";

    const amountSpan = document.createElement("span");
    amountSpan.className = "expense-amount-text";
    amountSpan.textContent = formatCurrency(expense.amount);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-id", expense.id);

    metaDiv.appendChild(amountSpan);
    metaDiv.appendChild(deleteBtn);

    // Assemble the complete row
    li.appendChild(infoDiv);
    li.appendChild(metaDiv);

    // Append the row to our list container
    expenseList.appendChild(li);
  }
}

// --------------------------------------------------------------------------
// 8. Helper Function: Delete an Expense
// --------------------------------------------------------------------------
// Removes an expense from the array by its unique ID, saves state, and updates the screen
function deleteExpense(id) {
  // Filter out the expense with the matching ID, keeping all others
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });

  // Save the updated array to storage (including when it becomes empty)
  saveExpenses();

  // Re-render the visual list to remove the deleted row
  renderExpenses();

  // Recalculate and update the total spent display
  updateTotalDisplay();

  console.log("Deleted expense ID:", id);
  console.log("Remaining expenses:", expenses);
}

// --------------------------------------------------------------------------
// 9. Event Listeners
// --------------------------------------------------------------------------

// Listener A: Form Submission & Input Validation
expenseForm.addEventListener("submit", function (event) {
  // Prevent the default browser behavior (which would reload the page)
  event.preventDefault();

  // Read input values and trim whitespace
  const name = expenseNameInput.value.trim();
  const amountStr = expenseAmountInput.value.trim();
  const amount = parseFloat(amountStr);
  const category = expenseCategorySelect.value;

  // Rule 1: Expense name cannot be empty or whitespace-only
  if (name === "") {
    showError("Please enter an expense name.");
    return; // Stop execution here
  }

  // Rule 2: Amount cannot be empty, non-numeric, zero, or negative
  if (amountStr === "" || isNaN(amount) || amount <= 0) {
    showError("Amount must be greater than zero.");
    return; // Stop execution here
  }

  // If both inputs are valid, clear any previously displayed error
  clearError();

  // Create an expense object representing this single expense record
  const newExpense = {
    id: nextExpenseId++,
    name: name,
    amount: amount,
    category: category
  };

  // Add the new expense object to our state array
  expenses.push(newExpense);

  // Save the updated array to storage
  saveExpenses();

  // Recalculate and update the total display in the UI
  updateTotalDisplay();

  // Re-render the visual expense list to include the newly added item
  renderExpenses();

  // Reset the form fields so the user can easily enter the next expense
  expenseForm.reset();

  // Console logs to help verify state in Developer Tools
  console.log("Added expense:", newExpense);
  console.log("Current expenses array:", expenses);
});

// Listener B: Click Handling for Delete Buttons (Event Delegation)
// Instead of attaching separate click listeners to every single delete button,
// we listen on the parent <ul> container and detect when a .delete-btn is clicked.
expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    // Read the unique ID from the clicked button's data-id attribute
    const idToDelete = parseInt(event.target.getAttribute("data-id"), 10);
    deleteExpense(idToDelete);
  }
});

// Listener C: Sort Dropdown Selection Change
// Re-renders the display list in the selected sort order without touching underlying state or localStorage
if (sortSelect) {
  sortSelect.addEventListener("change", function () {
    renderExpenses();
  });
}

// --------------------------------------------------------------------------
// 10. Initialization
// --------------------------------------------------------------------------
// Initial render to show restored items or the empty placeholder on first load
renderExpenses();

// Initial update to display restored total or default $0.00
updateTotalDisplay();

// Confirmation log that the script loaded and ran without errors
console.log("App initialized");

