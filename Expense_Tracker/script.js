const incomeSourceInput = document.getElementById("income-source-input");
const incomeAmountInput = document.getElementById("income-amount");
const incomeDate = document.getElementById("income-date");

const expenseCategoryInput = document.getElementById("expense-category-input");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseDate = document.getElementById("expense-date");

let incomes = [];
let incomeAmount = 0;

let expenses = [];
let expenseAmount = 0;

function result() {
  if (incomes == [] || !incomeAmount) {
    return alert("Please Add Your Income");
  }
  if (expenses == [] || !expenseAmount) {
    return alert("Please Add Your Expense");
  }
  const resultContainer = document.querySelector(".result-container");
  const resultTableBody = document.getElementById("result-table-body");
  resultContainer.style.display = "block"
  resultTableBody.innerHTML = `
    <tr>
        <td>${incomeAmount}</td>
        <td>${expenseAmount}</td>
        <td>${incomeAmount - expenseAmount}</td>
    </tr>`;
}

function incomeCalculator() {
  const incomeTableBody = document.getElementById("income-table-body");
  const incomeContainer = document.querySelector(".income-container");

  const source = incomeSourceInput.value;
  const amount = Number(incomeAmountInput.value);
  const date = incomeDate.value;


  if (source === "") {
    alert("Please select a income source");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  if (date === "") {
    alert("Please select a date");
    return;
  }
  incomeContainer.style.display = "block"
  incomes.push({ source, amount, date });
  incomeAmount += amount;

  const newRow = incomeTableBody.insertRow();
  const sourceCell = newRow.insertCell();
  const amountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");

  const income = incomes[incomes.length - 1];
  deleteBtn.addEventListener("click", function () {
    incomes.splice(incomes.indexOf(income), 1);
    incomeAmount -= income.amount;

    incomeTableBody.removeChild(newRow);
  });
  sourceCell.innerText = "From " + income.source;
  amountCell.innerText = income.amount;
  dateCell.innerText = income.date;
  deleteCell.appendChild(deleteBtn);

  incomeSourceInput.value = "";
  incomeAmountInput.value = "";
  incomeDate.value = "";
}

function expenseCalculator() {
  const expensesTableBody = document.getElementById("expense-table-body");
  const expenseContainer = document.querySelector(".expense-container");


  const category = expenseCategoryInput.value;
  const amount = Number(expenseAmountInput.value);
  const date = expenseDate.value;

  if (category === "") {
    alert("Please select a category");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  if (date === "") {
    alert("Please select a date");
    return;
  }
  expenseContainer.style.display = "block";
  expenses.push({ category, amount, date });

  expenseAmount += amount;

  const newRow = expensesTableBody.insertRow();

  const categoryCell = newRow.insertCell();
  const amountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");

  const expense = expenses[expenses.length - 1];
  deleteBtn.addEventListener("click", function () {
    expenses.splice(expenses.indexOf(expense), 1);
    expenseAmount -= expense.amount;

    expensesTableBody.removeChild(newRow);
  });

  categoryCell.innerText = expense.category;
  amountCell.innerText = expense.amount;
  dateCell.innerText = expense.date;
  deleteCell.appendChild(deleteBtn);

  expenseCategoryInput.value = "";
  expenseAmountInput.value = "";
  expenseDate.value = "";
}
