echo function checkPrice(){

let product=document.getElementById("product").value.toLowerCase();

let prices={
"water":"₹20-₹30",
"coconut":"₹40-₹60",
"scarf":"₹150-₹250"
};

if(prices[product]){
document.getElementById("priceResult").innerHTML="Average price: "+prices[product];
}
else{
document.getElementById("priceResult").innerHTML="Price not available";
}

}

function estimateFare(){

let distance=document.getElementById("distance").value;

let baseFare=50;
let perKm=15;

let total=baseFare+(distance*perKm);

document.getElementById("fareResult").innerHTML="Estimated fare: ₹"+total;

} > script.js