// variable declarations
const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const remove = document.querySelector(".delete");
const equal = document.querySelector(".equal");
const previous = document.querySelector(".previous");
const current = document.querySelector(".current");

// initial assumptions
let currentOperation = "";
let previousOperation = "";
let operation;

//MATH OPERATIONS - FUNCTION
const calculate = () => {
  let mathOperation;
  // In the absence of data
  if (!previousOperation || !currentOperation) {
    return;
  }
  const previous = parseFloat(previousOperation);
  const current = parseFloat(currentOperation);
  // In the absence of type number
  if (isNaN(previous) || isNaN(current)) {
    return;
  }
  // Math options
  switch (operation) {
    case "+":
      mathOperation = previous + current;
      break;
    case "-":
      mathOperation = previous - current;
      break;
    case "x":
      mathOperation = previous * current;
      break;
    case "÷":
      if (current === 0) {
        clearResult();
        alert("You can't divide by 0");
        return;
      }
      mathOperation = previous / current;
      break;
    case "√":
      mathOperation = Math.sqrt(previous, 1 / current);
      break;
    case "%":
      mathOperation = (previous / 100) * current;
      break;
    case "^":
      mathOperation = Math.pow(previous, current);
      break;
    case "log":
      mathOperation = Math.log(previous) / Math.log(current);
      break;
    default:
      return;
  }
  currentOperation = mathOperation;
  operation = undefined;
  previousOperation = "";
};

// Function - selecting operator
const selectOperation = (operator) => {
  if (currentOperation === "") {
    return;
  }
  if (previousOperation !== "") {
    const previous = previous.innerHTML;
    if (
      currentOperation.toString() === "0" &&
      previous[previous.length - 1] === "%"
    ) {
      clearResult;
      return;
    }
    calculate();
  }
  operation = operator;
  previousOperation = currentOperation;
  currentOperation = "";
};

// Updating result
const updateResult = () => {
  current.innerHTML = currentOperation;
  if (operation != null) {
    previous.innerHTML = previousOperation + operation;
  } else {
    previous.innerHTML = "";
  }
};
// Only one dot in the number, creating numbers
const addNumber = (number) => {
  if (number === "•") {
    if (currentOperation.includes(".")) {
      return;
    }
    number = ".";
  }
  currentOperation = currentOperation.toString() + number.toString();
};
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    addNumber(number.innerHTML);
    updateResult();
  });
});

// Delete the last digit
const deleteNumber = () => {
  currentOperation = currentOperation.toString().slice(0, -1);
};
remove.addEventListener("click", () => {
  deleteNumber();
  updateResult();
});

// Selecting operator
operator.forEach((operator) => {
  operator.addEventListener("click", () => {
    selectOperation(operator.innerHTML);
    updateResult();
  });
});

// Result display
equal.addEventListener("click", () => {
  calculate();
  updateResult();
});

// Delete everything
const clearResult = () => {
  currentOperation = "";
  previousOperation = "";
  operation = undefined;
};
clear.addEventListener("click", () => {
  clearResult();
  updateResult();
});
