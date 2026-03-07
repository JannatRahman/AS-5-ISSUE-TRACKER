// MAIN SECTION CODES
const cardContainer = document.getElementById("card-container");



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
    card.className = "card bg-white";
    card.innerHTML = `
 <div class="flex justify-between p-5 ">

   <i class="fa-solid fa-spinner rounded-full bg-green-200 py-2 cursor-pointer"></i>
   <h2 class="text-red-700 bg-red-200 text-lg rounded-lg px-6 cursor-pointer">HIGH</h2>
  </div>

  <div class="">
     <h2>Fix navigation menu on mobile devices</h2>
     <p class="line-clamp-2">The navigation menu doesn't collapse properly on mobile devices...</p>
     
  </div>
  <div class="flex gap-5 ">
    <h2 class="text-red-700 bg-red-200 text-lg rounded-full px-3 font-medium cursor-pointer"><i class="fa-solid fa-bug"></i>BUG</h2>
    <h2 class="text-orange-700 bg-orange-200 text-lg rounded-lg px-3 font-medium cursor-pointer"><i class="fa-regular fa-circle-user"></i>HELP WANTED</h2>
  </div>
  <br class="">
  <div class="divider w-full"></div>
  <div class="" >
    <p>#1
     by john_doe
    </p>
    <p>1/15/2024</p>
  </div>

 </div>`;
    cardContainer.appendChild(cardDiv);
  });

}
loadCard();