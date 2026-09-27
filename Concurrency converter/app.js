let BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2026.9.27/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown Select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from Select");
const toCurr=document.querySelector(".to Select");
const msg=document.querySelector(".final-msg");
// for( code in countryList){
//  console.log(code,countryList[code]);
// }

for(let select of dropdown){
    for( code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
      
        if(select.name==="from" && code==="USD"){
            newoption.selected="selected";
        }else if(select.name==="to" && code==="INR"){
             newoption.selected="selected";
        }
        select.append(newoption);
}
select.addEventListener("change",(EventTarget)=>{
    updateFlag(EventTarget.target);
});
}
const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal==="" && amountVal<1){
        amountVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount=amountVal*rate;
    msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
const updateFlag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img= element.parentElement.querySelector("img");
   img.src=newsrc;
};
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load",()=>{
updateExchangeRate();
});

