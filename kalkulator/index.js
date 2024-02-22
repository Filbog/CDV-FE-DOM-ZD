//////////////// Main logic //////////////

// Retrieve history from local storage or create empty array
let calculations_history = retrieve_existing_history() || [];
display_calculations_history();
let calculate = document.getElementById("calc-form");
calculate.addEventListener("submit", function (event) {
  display_calculations_history();
  // Prevent the form from submitting
  event.preventDefault();
  // Catch input values and necessary HTML elements
  let num1 = parseInt(document.getElementById("num1").value);
  let num2 = parseInt(document.getElementById("num2").value);
  let operation = document.querySelector(
    'input[name="operation"]:checked'
  ).value;
  let result_container = document.getElementById("result");
  // Calculate and display the result
  let result = perform_calculation(num1, num2, operation);
  result_container.innerHTML = result;

  save_result(result);
});

//////////////// Helper functions //////////////

function retrieve_existing_history() {
  let stored_history = localStorage.getItem("calculations_history");
  return stored_history ? JSON.parse(stored_history) : null;
}

function perform_calculation(num1, num2, operation) {
  let result;
  let whole_operation;
  switch (operation) {
    case "add":
      result = num1 + num2;
      whole_operation = `${num1} + ${num2} = ${result}`;
      break;
    case "subtract":
      result = num1 - num2;
      whole_operation = `${num1} - ${num2} = ${result}`;
      break;
    case "multiply":
      result = num1 * num2;
      whole_operation = `${num1} * ${num2} = ${result}`;
      break;
    case "divide":
      result = (num1 / num2).toFixed(2);
      whole_operation = `${num1} / ${num2} = ${result}`;
      break;
    default:
      return "Invalid operation";
  }

  return whole_operation;
}

function save_result(result) {
  calculations_history.unshift(result);
  // Save calculations_history to localStorage every time a new calculation is added
  localStorage.setItem(
    "calculations_history",
    JSON.stringify(calculations_history)
  );
}

function display_calculations_history() {
  let previous_calculations = document.getElementById("previous-calculations");
  previous_calculations.innerHTML = "";
  for (let calc of calculations_history) {
    let calc_p = document.createElement("p");
    calc_p.textContent = calc;
    previous_calculations.appendChild(calc_p);
  }
}
