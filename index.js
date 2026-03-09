// MAIN SECTION CODES
let currentTab ="all";
const tabActive = ["bg-blue-500", "border-blue-600", "text-white"];
const tabInactive = ["bg-transparent", "text-slate-700", "border-slate-200", "text-black"]

// SWITCHING-TAB
function switchTab(tab) {
  console.log(tab);
  const tabs = ["all", "open", "closed"];

  for(const t of tabs){
     const tabName =  document.getElementById("tab-" +t );

     if(t === tab) {
      tabName.classList.remove(...tabInactive);
      tabName.classList.add(...tabActive);
     }else{
      tabName.classList.remove(...tabActive);
      tabName.classList.add(...tabInactive);
     }
     
  } 
}
switchTab(currentTab);



// const searchIssues = document.getElementById("issue-btn");
const cardContainer = document.getElementById("card-container");
const cardModalContainer = document.getElementById("card-modal-container");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalAuthor = document.getElementById("modal-author");
const modalCreatedAt = document.getElementById("modal-created-at");
const modalDescription = document.getElementById("modal-description");
const modalAssignee = document.getElementById("modal-assignee");
const modalPriority = document.getElementById("modal-priority");
const loadingSpinner 
= document.getElementById("loading-spinner");




function showLoading() {
  loadingSpinner.classList.remove("hidden");
  cardContainer.innerHTML = "";
};

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

async function SearchCard() { 
const res = await fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}");
console.log(res);

}
async function loadCard() {
showLoading();
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  hideLoading();
 displayCard(data.data);
};

const levelColors = {
  high: "bg-red-200 text-red-700",
  medium: "bg-orange-200 text-orange-700",
  low: "bg-gray-200 text-gray-700",
};

const status

const tagsStyling = {
  documentation: { icon: "fa fa-facebook", style: "bg-purple-100 text-purple-700" },
  "good first issue": { icon: "fa-star", style: "bg-green-100 text-green-700" },
  bug: { icon: " fa-bug", style: "bg-red-100 text-red-700"},
};

function displayCard(cards){
  cardContainer.innerHTML = "";
  console.log(cards);

  cards.forEach((card) => {
   
    const cardDiv = document.createElement("div");

    cardDiv.className = "m-10 flex flex-wrap gap-10";

    const cardImage = card.status === "open" ? "/assets/Open-Status.png" : "/assets/Closed-Status.png";

    // priority badge
    const priorityBadge = card.priority ? `
     <p class="px-3 py-1 rounded-full text-sm font-semibold
    ${levelColors[card.priority.toLowerCase()] ||  'bg-gray-200 text-gray-700'}">
    ${card.priority.toUpperCase()}
    </p>` : "";

const tagsHtml = card.tags && card.tags.length
? `<div class="flex gap-2 mt-3"> 
${card.tags.map(tag => {
if (!tagsStyling[tag]) return "";
return `
<button class="flex items-center gap-1 py-1 px-2 rounded-full text-xs font-medium ${tagsStyling[tag].style}">
<i class="${tagsStyling[tag].icon}"></i> ${tag.toUpperCase()}
</button>`;
}).join("")}
 </div>`
: "";


    cardDiv.innerHTML = `
<div class="card bg-white p-5 shadow-md w-80 space-y-3 border-t-4 border-purple-500">

 <div class="flex justify-between ">
   <img src="${cardImage}" alt="status">
   ${priorityBadge}
  
  </div>

  <div class="">
     <h2 class="text-lg font-bold" onclick="openCardModal(${card.id})"> ${card.title}</h2>
     <p class="line-clamp-2">${card.description}</p> 
     ${tagsHtml}
  </div>


  <div class="flex gap-5 mt-3">

     <h2 class="text-red-700 bg-red-200 text-sm rounded-lg px-3 font-medium cursor-pointer">
    <i class="fa-solid fa-bug"></i>
    BUG
  </h2>

   <h2 class="text-orange-700 bg-orange-200 text-sm rounded-lg px-3 font-medium cursor-pointer"><i class="fa-regular fa-circle-user"></i>HELP WANTED</h2>
   </div>

  <div class="divider"></div>

  <div>
    <p>${card.author}</p>
    <p>${card.createdAt ? card.createdAt.split("T")[0] : "No Date"}</p>
  </div>
</div>`;
    cardContainer.appendChild(cardDiv);
  });

};

async function openCardModal(cardId){
console.log(cardId, "cardId");

const res =await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`,);


const data =await res.json();
const cardDetails = data.data
// console.log(cardDetails, "data");

const createdDate = cardDetails.createdAt ? cardDetails.createdAt.split ("T")[0] : "No Date";


cardModalContainer.showModal();

modalTitle.textContent = cardDetails.title;
modalStatus.textContent = cardDetails.status;
modalAuthor.textContent = cardDetails.author;
modalAssignee.textContent = cardDetails.assignee;
modalPriority.textContent = cardDetails.priority;
modalDescription.textContent = cardDetails.description
modalCreatedAt.textContent = cardDetails.createdAt;
modalCreatedAt.textContent = createdDate;

}

// SEARCH 
document.getElementById("issue-btn")
.addEventListener("click", async () => {

  const input = document.getElementById("input-search");
  const searchText = input.value.trim();

   if(!searchText) {
    alert("Please enter something to search");
    return;
   }
showLoading();
cardContainer.innerHTML = "";
  const res = await fetch(
  `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`
  );

  const data = await res.json();
hideLoading();
  displayCard(data.data);

});

loadCard();