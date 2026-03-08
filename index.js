// MAIN SECTION CODES

// const searchIssues = document.getElementById("issue-btn");
const cardContainer = document.getElementById("card-container");
const cardModalContainer = document.getElementById("card-modal-container");

// document.getElementById("issue-btn").addEventListener("click", () => {
//   const input = document.getElementById("input-search");
//   const searchValue = input.value.trim().toLowerCase();
//   console.log(searchValue);
// });


async function SearchCard() {
const res = await fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}");
console.log(res);
  
}



async function loadCard() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
 displayCard(data.data);
};

function displayCard(cards){
  console.log(cards);

  cards.forEach((card) => {
    console.log(card);
    const cardDiv = document.createElement("div");
    cardDiv.className = "m-10 flex flex-wrap gap-10";
    cardDiv.innerHTML = `
    
<div class="card bg-white p-5 shadow-md w-80 space-y-3">
 <div class="flex justify-between ">
   <img src="${card.status}">
   <h2 class="text-red-700 bg-red-200 text-lg rounded-lg px-6 cursor-pointer">${card.priority}</h2>
  </div>

  <div class="">
     <h2 class="text-lg font-bold" onclick="openCardModal(${card.id})"> ${card.title}</h2>
     <p class="line-clamp-2">${card.description}</p> 
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
    <p>1/15/2024</p>
  </div>

 </div>
</div>`;
    cardContainer.appendChild(cardDiv);
  });

};

async function openCardModal(cardId){
console.log(cardId, "cardId");
const res =await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications");


// id: 1, title: 'Fix navigation menu on mobile devices', description: "The navigation menu doesn't collapse properly on m…ile devices. Need to fix the responsive behavior.", status: 'open', labels: Array(2), …}

const data =await res.json();
const cardDetails = data.data
console.log(cardDetails, "data");
  cardModalContainer.showModal();

}

// const date = new Date(issue.createdAt);  date.getDay(), date.getMonth()+1, date.getFullYear() 
loadCard();