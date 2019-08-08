const form = document.querySelector('#tasa-de-interes');
const inputAmount = form.querySelector('#monto');
const inputRate = form.querySelector('#tna');
const inputDays = form.querySelector('#dias');
const inputResult = form.querySelector('#result');

const calculate = () => {
  const amount = parseFloat(inputAmount.value);
  const rate = parseFloat(inputRate.value);
  const days = parseFloat(inputDays.value);

  if (!amount || !rate || !days) {
    inputResult.value = '';
    return;
  }

  inputResult.value = (amount * (1 + (rate / 100) * (days / 365))).toFixed(2);
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
