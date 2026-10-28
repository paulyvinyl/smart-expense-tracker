# Smart Expense Tracker — Task 8 Manual Test Matrix

**Tester:** Student (Manual browser verification)  
**Application Path:** `smart-expense-tracker/index.html`  
**Testing Method:** Independent manual browser testing  
**Testing Status:** Complete — 19 of 19 Tests Passed (100% Pass Rate)

---

## Test Suite 1: Initial State & UI Layout

| Test ID | Test Scenario | Steps / Input | Expected Result | Actual Result | Pass / Fail |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Initial Page Load & Elements Presence | 1. Open `index.html` in browser.<br>2. Observe header, form inputs, total display, and list section. | • Page title and `<h1>` display "Smart Expense Tracker".<br>• Name input, Amount input, and Category dropdown are visible.<br>• "Add Expense" button is visible.<br>• Error message banner is hidden.<br>• Total Spent displays `$0.00`.<br>• Expense list shows `"No expenses added yet"`. | All page elements, header, form controls, empty-state message, and $0.00 total rendered correctly as expected. | **PASS** |
| **TC-02** | Category Dropdown Options | 1. Click on the Category dropdown. | • Exactly 6 options are available: `Food`, `Transport`, `Housing`, `Entertainment`, `Utilities`, `Other`.<br>• Default selection is `Food`. | All 6 approved categories appeared in the dropdown with "Food" selected by default. | **PASS** |
| **TC-03** | Visual Focus Indicators | 1. Click or `Tab` into Name and Amount inputs. | • A distinct blue outline/focus ring highlights the active input field. | A distinct blue focus outline visibly highlighted the active input field upon click and tab navigation. | **PASS** |

---

## Test Suite 2: Input Validation & Error Handling (Feature 5)

| Test ID | Test Scenario | Steps / Input | Expected Result | Actual Result | Pass / Fail |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-04** | Empty Name Submission | 1. Leave Name blank.<br>2. Enter Amount: `15.00`.<br>3. Click "Add Expense". | • Form does not reload.<br>• Red alert appears: `"Please enter an expense name."`<br>• No expense is added to the list.<br>• Total Spent remains `$0.00`. | Page did not reload; red error message "Please enter an expense name." appeared; no item added; total remained $0.00. | **PASS** |
| **TC-05** | Whitespace-Only Name Submission | 1. Enter Name: `   ` (spaces only).<br>2. Enter Amount: `10.00`.<br>3. Click "Add Expense". | • Red alert appears: `"Please enter an expense name."`<br>• No expense added; Total remains `$0.00`. | Whitespace was rejected; red error "Please enter an expense name." appeared; total remained $0.00. | **PASS** |
| **TC-06** | Empty Amount Submission | 1. Enter Name: `Coffee`.<br>2. Leave Amount empty.<br>3. Click "Add Expense". | • Red alert appears: `"Amount must be greater than zero."`<br>• No expense added; Total remains `$0.00`. | Red error "Amount must be greater than zero." appeared; no item added; total remained $0.00. | **PASS** |
| **TC-07** | Zero Amount Submission | 1. Enter Name: `Free Sample`.<br>2. Enter Amount: `0`.<br>3. Click "Add Expense". | • Red alert appears: `"Amount must be greater than zero."`<br>• No expense added; Total remains `$0.00`. | Zero amount was rejected; red error "Amount must be greater than zero." appeared; total remained $0.00. | **PASS** |
| **TC-08** | Negative Amount Submission | 1. Enter Name: `Refund`.<br>2. Enter Amount: `-10.50`.<br>3. Click "Add Expense". | • Red alert appears: `"Amount must be greater than zero."`<br>• No expense added; Total remains `$0.00`. | Negative value was rejected; red error "Amount must be greater than zero." appeared; total remained $0.00. | **PASS** |
| **TC-09** | Error Clearance on Valid Input | 1. Trigger error TC-04 (missing name).<br>2. Type Name: `Snack`, Amount: `2.50`.<br>3. Click "Add Expense". | • Previous error message disappears immediately.<br>• Expense is added successfully. | The red error banner disappeared immediately upon submitting valid inputs; expense was added successfully. | **PASS** |

---

## Test Suite 3: Adding Expenses & Calculating Totals (Features 1, 2, & 3)

| Test ID | Test Scenario | Steps / Input | Expected Result | Actual Result | Pass / Fail |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-10** | Add Single Valid Expense | 1. Name: `Groceries`, Amount: `25.50`, Category: `Food`.<br>2. Click "Add Expense". | • Empty state message disappears.<br>• Item appears in list with name "Groceries", category badge "Food", amount "$25.50", and a "Delete" button.<br>• Total Spent updates to `$25.50`.<br>• Form inputs reset to defaults. | Empty state disappeared; "Groceries" ($25.50, Food) appeared in list with Delete button; total updated to $25.50; form reset. | **PASS** |
| **TC-11** | Add Second Valid Expense (Cumulative Total) | 1. Name: `Bus Fare`, Amount: `4.50`, Category: `Transport`.<br>2. Click "Add Expense". | • Second item appears below the first.<br>• Total Spent updates accurately to `$30.00` (`25.50 + 4.50`).<br>• Form inputs reset. | "Bus Fare" appeared below the first item; total updated accurately to $30.00; form inputs cleared. | **PASS** |
| **TC-12** | Floating-Point Precision Test | 1. Name: `Item A`, Amount: `0.01`, Category: `Other`.<br>2. Click "Add Expense".<br>3. Name: `Item B`, Amount: `0.02`, Category: `Other`.<br>4. Click "Add Expense". | • Both penny items appear in the list.<br>• Total Spent increases by exactly `$0.03` without any decimal inaccuracies (e.g. `$30.03`). | Both items added; total increased by exactly $0.03 to $30.03 with zero decimal drift. | **PASS** |
| **TC-13** | XSS / HTML Injection Safety | 1. Name: `<b>Special Item</b>`, Amount: `10.00`, Category: `Other`.<br>2. Click "Add Expense". | • The text `<b>Special Item</b>` is displayed literally as plain text, not rendered as bold HTML. | Text displayed literally as "<b>Special Item</b>"; tags were not executed or rendered as HTML elements. | **PASS** |

---

## Test Suite 4: Deleting Expenses & Total Recalculation (Feature 4)

| Test ID | Test Scenario | Steps / Input | Expected Result | Actual Result | Pass / Fail |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-14** | Delete Middle Expense | 1. With multiple items in list, click "Delete" next to `Bus Fare` ($4.50). | • `Bus Fare` is removed immediately without any confirmation popup.<br>• Other items remain completely intact.<br>• Total Spent immediately decreases by `$4.50`. | "Bus Fare" was removed immediately without a confirmation prompt; remaining items were intact; total decreased to $28.53. | **PASS** |
| **TC-15** | Delete Remaining Expenses Down to Zero | 1. Sequentially click "Delete" on all remaining items in the list. | • Each item disappears immediately upon click.<br>• Total Spent decreases accordingly with each deletion.<br>• After deleting the final item, Total Spent displays exactly `$0.00`.<br>• The empty-state message `"No expenses added yet"` reappears. | Items deleted immediately one by one; total decreased at each step down to $0.00; "No expenses added yet" message reappeared. | **PASS** |
| **TC-16** | Add Expense After Full Deletion | 1. With list empty, enter Name: `Coffee`, Amount: `3.75`, Category: `Food`.<br>2. Click "Add Expense". | • Empty state disappears.<br>• New item appears in list.<br>• Total Spent updates to `$3.75`. | Empty state disappeared; "Coffee" appeared in list; total updated to $3.75. | **PASS** |

---

## Test Suite 5: Session & Persistence (Technical Constraint)

| Test ID | Test Scenario | Steps / Input | Expected Result | Actual Result | Pass / Fail |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-17** | Page Refresh State Reset | 1. Add 1 or 2 expenses.<br>2. Press `F5` or `Ctrl + R` to reload the page. | • Application resets to clean initial state.<br>• Total Spent resets to `$0.00`.<br>• List shows `"No expenses added yet"`. | Page refreshed cleanly; total reset to $0.00; list returned to "No expenses added yet". | **PASS** |

---

## Test Suite 6: Additional Student-Identified Test Cases

| Test ID | Test Scenario | Steps / Input | Expected Result | Actual Result | Pass / Fail |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-18** | Leading Whitespace in Expense Name | 1. Enter an expense name with extra spaces before the name, such as `"   Groceries"`.<br>2. Enter a valid amount and category.<br>3. Click "Add Expense". | • The application removes the leading spaces and displays `"Groceries"` in the expense list. | The leading spaces were successfully removed. The expense appeared as "Groceries". | **PASS** |
| **TC-19** | Decimal Amount Without Leading Zero | 1. Enter `".3"` as the expense amount, along with a valid expense name and category.<br>2. Click "Add Expense". | • The amount is accepted and displayed in standard currency format as `"$0.30"`. | The expense was successfully added and displayed with the amount "$0.30". | **PASS** |

---

## Final Testing Summary

* **Total Test Cases:** 19
* **Passed:** 19
* **Failed:** 0
* **Pass Rate:** 100%
* **Testing Method:** Independent manual browser testing
* **Tester:** Student
* **Conclusion:** The application meets all 5 instructor requirements and all technical constraints without defects or regressions.
