/* ===============================
SAFE TOUR MAIN SCRIPT
Tourist Safety Platform
================================ */


/* ===============================
CONFIG
================================ */

const API_BASE = "http://localhost:5000/api";


/* ===============================
UTILITY FUNCTIONS
================================ */

function showMessage(id, message, color="black"){

const el = document.getElementById(id);

if(!el) return;

el.innerText = message;
el.style.color = color;

}


function smoothScroll(section){

const el = document.querySelector(section);

if(el){
el.scrollIntoView({
behavior:"smooth"
});
}

}



/* ===============================
NAVIGATION BUTTONS
================================ */

function openHome(){
window.location.href = "index.html";
}

function openPriceChecker(){
window.location.href = "pages/price-checker.html";
}

function openTaxiEstimator(){
window.location.href = "pages/taxi-estimator.html";
}

function openScamMap(){
window.location.href = "pages/scam-alert-map.html";
}

function openTrustedShops(){
window.location.href = "pages/trusted-shops.html";
}



/* ===============================
PRICE CHECKER
================================ */

async function checkPrice(){

const item = document.getElementById("item").value;
const price = document.getElementById("price").value;

if(item === "" || price === ""){
showMessage("result","Enter item and price","red");
return;
}

try{

const response = await fetch(`${API_BASE}/prices/check`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
item,
price
})

});

const data = await response.json();

if(data.status === "overpriced"){

showMessage(
"result",
`⚠️ Overpriced! Actual Price ₹${data.actual}`,
"red"
);

}else if(data.status === "fair"){

showMessage(
"result",
`✅ Fair Price (₹${data.actual})`,
"green"
);

}else{

showMessage("result","Price data unavailable");

}

}catch(err){

showMessage("result","Server error","red");

}

}



/* ===============================
TAXI ESTIMATOR
================================ */

async function calculateTaxi(){

const distance = document.getElementById("distance").value;

if(distance === ""){
showMessage("taxiResult","Enter distance","red");
return;
}

try{

const res = await fetch(`${API_BASE}/taxi/estimate`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
distance
})

});

const data = await res.json();

showMessage(
"taxiResult",
`Estimated Fare: ₹${data.fare}`,
"green"
);

}catch(err){

showMessage("taxiResult","Server error","red");

}

}



/* ===============================
SCAM REPORT
================================ */

async function reportScam(){

const text = document.getElementById("scamText").value;

if(text === ""){
alert("Describe the scam first");
return;
}

try{

await fetch(`${API_BASE}/scams`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
description:text
})

});

showMessage(
"scamResult",
"✅ Scam report submitted",
"green"
);

}catch(err){

showMessage("scamResult","Error submitting report","red");

}

}



/* ===============================
LOAD TRUSTED VENDORS
================================ */

async function loadVendors(){

const container = document.getElementById("vendorList");

if(!container) return;

container.innerHTML = "Loading vendors...";

try{

const res = await fetch(`${API_BASE}/vendors`);

const vendors = await res.json();

container.innerHTML = "";

vendors.forEach(v=>{

const card = document.createElement("div");

card.className = "vendor-card";

card.innerHTML = `
<h3>${v.name}</h3>
<p>⭐ Rating: ${v.rating}</p>
`;

container.appendChild(card);

});

}catch(err){

container.innerHTML = "Failed to load vendors";

}

}



/* ===============================
SCAM MAP SIMULATION
================================ */

function generateScamMarkers(){

const map = document.getElementById("scamMap");

if(!map) return;

for(let i=0;i<10;i++){

const marker = document.createElement("div");

marker.className = "scam-marker";

marker.style.top = Math.random()*300+"px";
marker.style.left = Math.random()*500+"px";

marker.title = "Reported Scam";

map.appendChild(marker);

}

}



/* ===============================
CURRENCY CONVERTER
================================ */

function convertCurrency(){

const amount = document.getElementById("amount").value;

const rate = 83;

const result = amount * rate;

showMessage(
"currencyResult",
`₹ ${result}`
);

}



/* ===============================
NEWSLETTER
================================ */

function subscribeNewsletter(){

const email = document.getElementById("email").value;

if(email === ""){
alert("Enter email");
return;
}

showMessage(
"newsletterMsg",
"🎉 Subscribed successfully",
"green"
);

}



/* ===============================
CONTACT FORM
================================ */

function sendContact(){

const name = document.getElementById("name").value;
const msg = document.getElementById("message").value;

if(name === "" || msg === ""){
alert("Fill all fields");
return;
}

showMessage(
"contactMsg",
"Message sent successfully",
"green"
);

}



/* ===============================
SEARCH VENDORS
================================ */

function searchVendor(){

const input = document
.getElementById("vendorSearch")
.value
.toLowerCase();

const cards = document
.querySelectorAll(".vendor-card");

cards.forEach(card=>{

const text = card.innerText.toLowerCase();

card.style.display =
text.includes(input)
? "block"
: "none";

});

}



/* ===============================
DARK MODE
================================ */

function toggleDarkMode(){

document.body.classList.toggle("dark");

}



/* ===============================
FAQ TOGGLE
================================ */

function toggleFAQ(el){

const p = el.nextElementSibling;

p.style.display =
p.style.display === "block"
? "none"
: "block";

}



/* ===============================
STATS COUNTER
================================ */

function animateCounter(id,target){

let count = 0;

const el = document.getElementById(id);

const interval = setInterval(()=>{

count++;

el.innerText = count;

if(count >= target){
clearInterval(interval);
}

},10);

}



/* ===============================
INIT
================================ */

window.onload = ()=>{

loadVendors();

generateScamMarkers();

animateCounter("userCount",10000);

animateCounter("reportCount",600);

};