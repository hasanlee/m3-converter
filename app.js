const currencies = ["AZN", "TRY", "USD", "RUB"];
const selGroup = document.querySelector(".sell-group");
const buyGroup = document.querySelector(".buy-group");
const sell = document.querySelector("#sell");
const buy = document.querySelector("#buy");
const sellRadio = document.querySelector('input[name="from"]:checked');
const buyRadio = document.querySelector('input[name="to"]:checked');
const sellRadios = document.querySelectorAll('input[name="from"]');
const buyRadios = document.querySelectorAll('input[name="to"]');
const infoSell = document.querySelector(".info-sell");
const infoBuy = document.querySelector(".info-buy");
const API_URL = "https://api.exchangerate.host/latest";
let fromSymbol;
let toSymbol;
let rates;

document.addEventListener(
  "load",
  getRatesFromApi(sellRadio.value, buyRadio.value)
);
sell.addEventListener("keyup", convert);
buy.addEventListener("keyup", convert);
sellRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    getRatesFromApi(e.target.value, toSymbol);
  });
});
buyRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    getRatesFromApi(fromSymbol, e.target.value);
  });
});

function getRatesFromApi(from, to) {
  fromSymbol = from;
  toSymbol = to;

  fetch(API_URL + `?base=${fromSymbol}&symbols=${toSymbol}`)
    .then((res) => res.json())
    .then((data) => {
      rates = data.rates;
      infoSell.innerHTML = `1 ${fromSymbol} = ${rates[toSymbol]} ${toSymbol}`;
      buy.value = sell.value * rates[toSymbol];
    });
  fetch(API_URL + `?base=${toSymbol}&symbols=${fromSymbol}`)
    .then((res) => res.json())
    .then((data) => {
      infoBuy.innerHTML = `1 ${toSymbol} = ${data.rates[fromSymbol]} ${fromSymbol}`;
    });
}

function convert() {
  buy.value = parseFloat(sell.value) * rates[toSymbol];
}
