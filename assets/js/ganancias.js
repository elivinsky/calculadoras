const form = document.querySelector('#ganancias');
const inputGross = form.querySelector('#gross');
const inputChildren = form.querySelector('#children');
const inputRent = form.querySelector('#rent');
const inputMortgage = form.querySelector('#mortgage');
const inputMarried = form.querySelector('#married');
const inputRetired = form.querySelector('#retired');
const inputPatagonia = form.querySelector('#patagonia');

const inputNet = form.querySelector('#net');

const calculate = () => {
  const gross = parseFloat(inputGross.value);
  const children = parseInt(inputChildren.value);
  const rent = parseFloat(inputRent.value);
  const mortgage = parseFloat(inputMortgage.value);
  const married = inputMarried.checked;
  const retired = inputRetired.checked;
  const patagonia = inputPatagonia.checked;

  if (!gross) {
    inputNet.value = '';
    return;
  }

  const calculator = new calcGanancias({
    topesEscalas: [33040, 66080, 99119, 132159, 198239, 264318, 396478, 528637, 99999999],
    porcentajesEscales: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
    minimoNoImponible: 85848.99,
    adicional4taCategoria: 412075.14,
    coyuje: 80033.97,
    hijo: 40361.43,
    topeAportes: 16598.31,
    topeJubilado: 670255.2,
    topeAlquiler: 85848.99,
    topeHipotecario: 20000,
    porcentajeAlquiler: 0.4,
    porcentajePatagonico: 1.22,
    aportesJubilados: 0.06,
    aportesNoJubilados: 0.17,
  });
  const result = calculator.calculate({
    sueldoBruto: gross,
    alquiler: rent,
    creditoHipotecario: mortgage,
    cantHijos: children,
    isConyuje: married,
    isJubilado: retired,
    isPatagonico: patagonia,
  });

  /*
  result = {
    anualTax: '2880.85',
    monthlyTax: '240.07',
    taxRate: '0.60%',
    marginalTaxRate: '9,00%',
    netBaseSalary: '32960.00',
  }
  */

  inputNet.value = result.netBaseSalary;
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

const scriptTag = document.createElement('script');
const firstScriptTag = document.getElementsByTagName('script')[0];
scriptTag.src = 'https://cdn.jsdelivr.net/gh/juanmanuelromeraferrio/calc-impuesto-ganancias@0.1.5/dist/calc-ganancias.browserify.js';
firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
