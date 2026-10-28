/* ==========================================================================
   Smart Expense Tracker - Application Logic (app.js)
   Task 7: Deleting Individual Expenses
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. Application State
// --------------------------------------------------------------------------
// An in-memory array that will store all our expense objects.
// Initially, the user has not added any expenses, so it starts empty.
let expenses = [];

// A simple incrementing counter to give each expense a unique ID (1, 2, 3...)
let nextExpenseId = 1;

// --------------------------------------------------------------------------
// 2. DOM Element Selectors
// --------------------------------------------------------------------------
// We "grab" references to the HTML elements using their unique IDs from index.html.
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategorySelect = document.getElementById("expense-category");
const errorMessageContainer = document.getElementById("error-message");
const expenseList = document.getElementById("expense-list");
const totalAmountDisplay = document.getElementById("total-amount");

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
// 4. Helper Functions: Total Calculation & Display Update
// --------------------------------------------------------------------------
// Sums the amounts of all expense objects currently stored in the expenses array.
// To avoid JavaScript floating-point inaccuracies (e.g. 0.01 + 0.02 = 0.030000000000000004),
// we convert each amount to integer cents, sum them, and convert back to dollars.
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
// 5. Helper Function: Dynamic List Rendering
// --------------------------------------------------------------------------
// Re-renders the entire <ul> list based on the current contents of the expenses array.
function renderExpenses() {
  // Clear the existing list contents to prevent duplicate entries
  expenseList.innerHTML = "";

  // If there are no expenses in state, display a friendly empty-state message
  if (expenses.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-list-message";
    emptyItem.textContent = "No expenses added yet";
    expenseList.appendChild(emptyItem);
    return;
  }

  // Iterate over each expense object in the array and construct its HTML elements
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

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
// 6. Helper Function: Delete an Expense
// --------------------------------------------------------------------------
// Removes an expense from the array by its unique ID and updates the screen
function deleteExpense(id) {
  // Filter out the expense with the matching ID, keeping all others
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });

  // Re-render the visual list to remove the deleted row
  renderExpenses();

  // Recalculate and update the total spent display
  updateTotalDisplay();

  console.log("Deleted expense ID:", id);
  console.log("Remaining expenses:", expenses);
}

// --------------------------------------------------------------------------
// 7. Event Listeners
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

// --------------------------------------------------------------------------
// 8. Initialization
// --------------------------------------------------------------------------
// Initial render to show the "No expenses added yet" placeholder on first load
renderExpenses();

// Confirmation log that the script loaded and ran without errors
console.log("App initialized");
