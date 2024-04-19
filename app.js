let dropdown = document.querySelectorAll(".dropdown select");
let submitButton = document.querySelector(".get-exchange-rate");
let msg = document.querySelector(".msg");
let amount = document.querySelector(".amount input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let finalamount;
const setflag = (event) => {
//   console.log(event);
let currCode = event.value;
// console.log(currCode);
let countryCode = countryList[currCode];
console.log(countryCode);
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
let img = event.parentElement.querySelector("img");
img.src = newSrc;
}


for(let select of dropdown){
   for(let currCode in countryList){
    // if(currCode == "PKR" || currCode == "USD"){
    //     continue;
    // }
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.id === "from" && currCode =="USD"){
        newOption.selected = "selected";
    }
    else if(select.id === "to" && currCode =="PKR"){
        newOption.selected = "selected";
    }

    select.append(newOption);
    
    
} 
select.addEventListener("change",(event) => {
  setflag(event.target);
}
)
}
let amountValue;
submitButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  amountValue = amount.value;
  if(amountValue == "" || amountValue <1)
  {
    amountValue = 1;
    amount.value = "1";
  }
//   console.log(amount.value);
console.log(fromCurr.value," ",toCurr.value);
updateExchangeValue();

} 
)
const updateExchangeValue = async() => {
let URL = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
console.log(rate);
finalamount = amountValue*rate;
finalamount = finalamount.toFixed(2);
msg.style.display = "flex";
msg.innerText = `${amountValue} ${fromCurr.value} = ${finalamount} ${toCurr.value} `;
}





// fetch(`https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD`)
//   .then(resp => resp.json())
//   .then((data) => {
//     console.log(`10 GBP = ${data.rates.USD} USD`);
//   });