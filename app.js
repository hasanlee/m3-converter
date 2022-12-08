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
const error = document.querySelector(".error");
const errorMsg = document.querySelector(".message");
const API_URL = "https://api.exchangerate.host/latest";
let fromSymbol;
let toSymbol;
let fromRate = 1;
let toRate = 1;
let rates;

document.addEventListener(
  "load",
  getRatesFromApi(sellRadio.value, buyRadio.value)
);
sell.addEventListener("keyup", () => {
  convert(false);
});
buy.addEventListener("keyup", () => {
  convert(true);
});
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

  if (fromSymbol === toSymbol) {
    toRate = 1;
    infoSell.innerHTML = `1 ${fromSymbol} = 1 ${toSymbol}`;
    buy.value = sell.value * 1;
    fromRate = 1;
    infoBuy.innerHTML = `1 ${toSymbol} = 1 ${fromSymbol}`;
  } else {
    fetch(API_URL + `?base=${fromSymbol}&symbols=${toSymbol}`)
      .then((res) => res.json())
      .then((data) => {
        rates = data.rates;
        toRate = data.rates[toSymbol];
        infoSell.innerHTML = `1 ${fromSymbol} = ${rates[toSymbol]} ${toSymbol}`;
        buy.value = sell.value * rates[toSymbol];
      })
      .catch((e) => {
        error.classList.toggle("show");
        errorMsg.innerHTML = `<b>Error : </b> ${e}`;
        return;
      });
    fetch(API_URL + `?base=${toSymbol}&symbols=${fromSymbol}`)
      .then((res) => res.json())
      .then((data) => {
        fromRate = data.rates[fromSymbol];
        infoBuy.innerHTML = `1 ${toSymbol} = ${data.rates[fromSymbol]} ${fromSymbol}`;
      });
  }
}

function convert(reverseConvert) {
  if (reverseConvert) {
    sell.value = parseFloat(buy.value) * fromRate;
  } else {
    buy.value = parseFloat(sell.value) * toRate;
  }
}
