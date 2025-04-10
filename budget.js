// Define all variables
let totalIncome = [];
let totalExpenses = [];

// Sum for the variables
let totalIncomeSources = 0;
let totalExpenseItems = 0;
// Messages of variables
let incomeMessage = "";
let expensesMessage = "";
// Income
let incomeInput = "";
let newIncome = "";
let newAmountIncome = "";
let newRecurringIncome = "";

// Expenses
let expenseInput = "";
let newExpense = "";
let newAmountExpense = "";
let newRecurringExpense = "";

// Variables for disposable income and savings
let disposableIncomeVar = "";
let save = "";

// Object construct all the income
function Income(income, amount, recurring) {
  this.income = income;
  this.amount = amount;
  this.recurring = recurring;
}

// Object construct all the expenses
function Expenses(expense, amount, recurring) {
  this.expense = expense;
  this.amount = amount;
  this.recurring = recurring;
}

// Determine variables for the income sources
let inc1 = new Income("Salary", 50000, true);
let inc2 = new Income("Dividends", 1000, true);
let inc3 = new Income("Property rental", 7000, true);
let inc4 = new Income("Concert", 4000, false);
let inc5 = new Income("Donation", 60000, false);

// Determine variables for the expenses
let exp1 = new Expenses("Groceries", 2000, true);
let exp2 = new Expenses("Insurance", 3000, true);
let exp3 = new Expenses("Levies", 3500, true);
let exp4 = new Expenses("Car-service", 25000, false);
let exp5 = new Expenses("Bicycle service", 5000, false);

// Function after starting session
function pushStart() {
  // If session has not started, set all the starting objects for income and expenses
  if (sessionStorage.getItem("Income") === null) {
    totalIncome.push(inc1);
    totalIncome.push(inc2);
    totalIncome.push(inc3);
    totalIncome.push(inc4);
    totalIncome.push(inc5);

    sessionStorage.setItem("Income", JSON.stringify(totalIncome));

    totalExpenses.push(exp1);
    totalExpenses.push(exp2);
    totalExpenses.push(exp3);
    totalExpenses.push(exp4);
    totalExpenses.push(exp5);

    sessionStorage.setItem("Expenses", JSON.stringify(totalExpenses));
  }
  // Else if session is already started, use information from the income and expenses session
  else {
    totalIncome = JSON.parse(sessionStorage.getItem("Income"));
    totalExpenses = JSON.parse(sessionStorage.getItem("Expenses"));
  }
}
// Income message for the paragraph and prompt
function messageIncome() {
  for (i = 0; i < totalIncome.length; i++) {
    let displayMessage =
      totalIncome[i].income +
      " income is R" +
      totalIncome[i].amount +
      " Recurring is: " +
      totalIncome[i].recurring +
      "<br/>";
    incomeMessage += displayMessage;
  }
}
// Expense message for the paragraph and prompt
function messageExpense() {
  for (i = 0; i < totalExpenses.length; i++) {
    let displayMessage =
      totalExpenses[i].expense +
      " expense is R" +
      totalExpenses[i].amount +
      " Recurring is: " +
      totalExpenses[i].recurring +
      "<br/>";
    expensesMessage += displayMessage;
  }
}
// Total for all income sources
function totalIncomeSourcesFunction() {
  // Use the information that is stored in session storage
  totalIncome = JSON.parse(sessionStorage.getItem("Income"));
  totalIncomeSources = totalIncome.reduce((Acc, Cur) => {
    return Acc + Cur.amount;
  }, 0);
}

// Total for all expenses
function totalExpenseItemsFunction() {
  // Use the information that is stored in session storage
  totalExpenses = JSON.parse(sessionStorage.getItem("Expenses"));
  totalExpenseItems = totalExpenses.reduce((Acc, Cur) => {
    return Acc + Cur.amount;
  }, 0);
}
// Show income by clicking the button
function incomeParagraph() {
  //run function to calculate total income
  totalIncomeSourcesFunction();
  //write the incomesources in paragraph and display total income
  let incomeParagraphs = document.getElementById("income_items");
  incomeParagraphs.innerHTML =
    incomeMessage + "The total of all the items are R" + totalIncomeSources;
  //Make the add income button visible
  let incomeAddHide = document.getElementById("addIncomeId");
  incomeAddHide.style.visibility = "visible";
}
// Show expenses by clicking the button
function expenseParagraph() {
  //run function to calculate total expense
  totalExpenseItemsFunction();
  //write the expense items in paragraph and display total expenses
  let incomeParagraphs = document.getElementById("expense_items");
  incomeParagraphs.innerHTML =
    expensesMessage + "The total of all the items are R" + totalExpenseItems;
  let expensesAddHide = document.getElementById("addExpenseId");
  //Make the add income button visible
  //Make the disposable income div visible
  let disposable = document.getElementById("disposable_hide");
  expensesAddHide.style.visibility = "visible";
  disposable.style.visibility = "visible";
}
// Ask user if they would like to add other incomes
function addIncomePrompt() {
  //display income message and prompt if user wants to add an income
  newIncome = prompt(incomeMessage + "\n \n Add another income type:");
  //Prompt to ask the amount - convert to number for calculation
  newAmountIncome = Number(prompt("How many Rand is this income? (Number)"));
  //Ask user if income is recurring
  newRecurringIncome = "Is this income recurring? \n Y - Yes \n N - No";

  while (!(newRecurringIncome === "Y" || newRecurringIncome === "N")) {
    newRecurringIncome = prompt(
      "Is this income recurring? \n Y - Yes \n N - No"
    );
  }
  //Show the user available information, then ask if they would like to continue or make changes
  incomeInput = prompt(
    "Income: " +
      newIncome +
      "\n Amount: " +
      newAmountIncome +
      "\n Recurring: " +
      newRecurringIncome +
      " \n Are you happy with the input? \n Y- Yes \n N - No"
  );

  while (!(incomeInput === "Y" || incomeInput === "N")) {
    incomeInput = prompt(
      "Income: " +
        newIncome +
        "\n Amount: " +
        newAmountIncome +
        "\n Recurring: " +
        newRecurringIncome +
        " \n Are you happy with the input? \n Y- Yes \n N - No"
    );
  }
}
// Run function on click of income
function addIncome() {
  //Run the add Income questions function
  addIncomePrompt();
  //Run a while loop if the items is captured incorrect - N is selected - the addIncomePrompt function will run again until the user selects Y - Yes they are do not re-run loop.
  while (incomeInput === "N") {
    addIncomePrompt();
  }
  // Change string to Boolean using the switch function
  // Change Y to true and N to false if the income is recurring or not
  switch (newRecurringIncome) {
    case "Y":
      newRecurringIncome = true;
      break;
    case "N":
      newRecurringIncome = false;
      break;
  }
  // Object construct all the new income
  let newIncomeObject = new Income(
    newIncome,
    newAmountIncome,
    newRecurringIncome
  );
  //Add the new object to the array
  totalIncome.push(newIncomeObject);
  sessionStorage.setItem("Income", JSON.stringify(totalIncome));
  //Reload the page to activate the pushStart() function again to update values
  document.location.reload();
}
// Ask user if they would like to add other expenses
function addExpensePrompt() {
  //Display expenses message and prompt use for new expense item
  newExpense = prompt(expensesMessage + "\n \n Add another expense type:");
  //Convert input into a number
  newAmountExpense = Number(prompt("How many Rand is this expense? (Number)"));
  //Ask if cost is recurring
  newRecurringExpense = "Is this expense recurring? \n Y - Yes \n N - No";
  // use loop for answer Y or N
  while (!(newRecurringExpense === "Y" || newRecurringExpense === "N")) {
    newRecurringExpense = prompt(
      "Is this income recurring? \n Y - Yes \n N - No"
    );
  }
  //Show the user available information, then ask if they would like to continue or make changes
  expenseInput = prompt(
    "Expense: " +
      newExpense +
      "\n Amount: " +
      newAmountExpense +
      "\n Recurring: " +
      newRecurringExpense +
      " \n Are you happy with the input? \n Y- Yes \n N - No"
  );
  while (!(expenseInput === "Y" || expenseInput === "N")) {
    expenseInput = prompt(
      "Expense: " +
        newExpense +
        "\n Amount: " +
        newAmountExpense +
        "\n Recurring: " +
        newRecurringExpense +
        " \n Are you happy with the input? \n Y- Yes \n N - No"
    );
  }
}
// Run function on click of expenses
function addExpense() {
  //Run the function which prompts the use questions
  addExpensePrompt();
  //Run a while loop - if the user is not happy with the information captured - N result - run the addExpensePrompt function again until user is happy with information
  while (expenseInput === "N") {
    addExpensePrompt();
  }
  // Change string to Boolean using the switch function
  // Change Y to true and N to false if the income is recurring or not
  switch (newRecurringExpense) {
    case "Y":
      newRecurringExpense = true;
      break;
    case "N":
      newRecurringExpense = false;
      break;
  }
  //Object construction of the new expense

  let newExpenseObject = new Expenses(
    newExpense,
    newAmountExpense,
    newRecurringExpense
  );
  //Add the new expense to the array

  totalExpenses.push(newExpenseObject);
  //Add the new object to the array
  sessionStorage.setItem("Expenses", JSON.stringify(totalExpenses));
  //Reload the page to activate the pushStart() function again to update values
  document.location.reload();
}
//Show disposable income on click
function disposableIncome() {
  // Update the totalIncomeSources
  totalIncomeSourcesFunction();
  //Run the function to update the totalExpenseItems
  totalExpenseItemsFunction();
  //calculate the disposable income
  disposableIncomeVar = totalIncomeSources - totalExpenseItems;

  //Display in the paragraph the disposable income
  let disposeParagraph = document.getElementById("disposableParagraph");
  disposeParagraph.innerHTML =
    "My disposable income for this month is R" + disposableIncomeVar;
}

// Ask user how much money they want to save
function saveAmount() {
  // Run the disposable income function to update the data
  disposableIncome();
  // Ask user to get the amount they want to save out of the total available disposable income
  // convert string to a number
  save = Number(
    prompt(
      "How much money would you like to save out of the R" +
        disposableIncomeVar +
        "?"
    )
  );

  // Run a while loop - if the amount is more than the disposable income - ask prompt again.
  while (save > disposableIncomeVar) {
    save = Number(
      prompt(
        "How much money would you like to save out of the R" +
          disposableIncomeVar +
          "?"
      )
    );
  }
  //Save the saving amount
  sessionStorage.setItem("Savings", JSON.stringify(save));
  //Calculate the amount that is left after savings are subtracted
  const incomeLeftAfterSaving = disposableIncomeVar - save;
  //Alert the amount that is left
  alert(
    "My money that is left after savings deductions are R" +
      incomeLeftAfterSaving
  );
  //Save in session storage the amount that is left
  sessionStorage.setItem(
    "Disposable Income Left",
    JSON.stringify(incomeLeftAfterSaving)
  );
}
