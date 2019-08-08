const form = document.querySelector('#tope-de-descuento');
const inputPercentage = form.querySelector('#percentage');
const inputLimit = form.querySelector('#limit');
const inputTotal = form.querySelector('#total');

const calculate = () => {
  const percentage = parseFloat(inputPercentage.value);
  const limit = parseFloat(inputLimit.value);

  if (!limit || !percentage) {
    inputTotal.value = '';
    return;
  }

  inputTotal.value = (limit * 100 / percentage).toFixed(2);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();

  calculate();
});

const inputs = form.querySelectorAll('input');
[].forEach.call(inputs, (input) => {
  input.addEventListener('keyup', () => {
    calculate();
  });
});
