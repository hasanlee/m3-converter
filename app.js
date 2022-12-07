const sell = document.querySelector("#sell");
const sel = document.querySelector("#sell");
const buy = document.querySelector("#buy");
const sellRadio = document.querySelectorAll('input[name="from"]');
const buyRadio = document.querySelectorAll('input[name="to"]');
const API_URL = "https://api.exchangerate.host/latest";

sel.addEventListener("keyup", convert);
buy.addEventListener("keyup", convert);
sellRadio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    console.log(e.target.value);
  });
});
buyRadio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    console.log(e.target.value);
  });
});

function getRatesFromApi(){

}


function convert() {
  let fromSymbol = "RUB";
  let toSymbol = "USD";
  buy.value = sel.value * 5;
  sellRadio.forEach((s) => {
    fromSymbol = s.checked ? s.value : "RUB";
  });
  buyRadio.forEach((s) => {
    toSymbol = s.checked ? s.value : "USD";
  });

  fetch(API_URL+`?base=${fromSymbol}&symbols=${toSymbol}`).then(res=>res.json()).then(data=>console.log(data))

  console.log(fromSymbol, sel.value, toSymbol, buy.value);
}
