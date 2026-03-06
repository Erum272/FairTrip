function checkPrice(){

let product=document.getElementById("product").value.toLowerCase();

let prices={

"water":"₹20 - ₹30",
"coconut":"₹40 - ₹60",
"souvenir":"₹150 - ₹300",
"tshirt":"₹300 - ₹500",
"coffee":"₹100 - ₹200"

};

if(prices[product]){

document.getElementById("result").innerHTML=
"Average Local Price: "+prices[product];

}

else{

document.getElementById("result").innerHTML=
"Price data not available.";

}

}



function estimateFare(){

let distance=document.getElementById("distance").value;

let baseFare=50;
let perKm=15;

let total=baseFare+(distance*perKm);

document.getElementById("fare").innerHTML=
"Estimated Fare: ₹"+total;

}