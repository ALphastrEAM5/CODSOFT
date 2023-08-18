const display = document.getElementById('display');
let currentInput = '';
let currentOperator = '';
let previousInput = '';


function updateDisplay() {
  display.innerText = currentInput;
}

let string= "";


const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const buttonText = button.innerText;

    

    if (buttonText >= '0' && buttonText <= '9') {
        if (currentInput === '0' || currentInput === 'Error') {
          currentInput = buttonText;
        } else {
          currentInput += buttonText;
        }
        updateDisplay();
      } else if (buttonText === 'AC') {
        currentInput = '0';
        currentOperator = '';
        previousInput = '';
        updateDisplay();
      } else if (buttonText === 'DEL') {
        if (currentInput.length > 1) {
          currentInput = currentInput.slice(0, -1);
        } else {
          currentInput = '0';
        }
        updateDisplay();
      } else if (buttonText === '%') {
      currentInput = (parseFloat(currentInput) / 100).toString();
      updateDisplay();
    } else if (button.classList.contains('operator')) {
      if (currentInput !== '') {
        if (previousInput !== '') {
          currentInput = evaluate();
          previousInput = currentInput;
          currentOperator = buttonText;
        } else {
          previousInput = currentInput;
          currentInput = '';
          currentOperator = buttonText;
        }
      }
    } else if (buttonText === '=') {
      if (currentInput !== '' && previousInput !== '') {
        currentInput = evaluate();
        previousInput = '';
        currentOperator = '';
        updateDisplay();
      }
    }
  });
});


function evaluate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  switch (currentOperator) {
    case '+':
      return (num1 + num2).toString();
    case '-':
      return (num1 - num2).toString();
    case '*':
      return (num1 * num2).toString();
    case '/':
      return (num1 / num2).toString();
    case '%':
    return (num1 % num2).toString();  
    default:
      return currentInput;
  }
}
