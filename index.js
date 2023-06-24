const accessKey = "ST5g8LomXr1qmgiSHbaagtD_zYN9B-XCffFbmXrzmxA";

const formEl =document.querySelector("form");
const inputEl =document.getElementById("Search-input");
const SearchResults = document.querySelector(".Search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url =`http://api.unsplash.com/search/photos?pages=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results

    if(page === 1){
        SearchResults.innerHTML = "";
    }
    results.map((result) => {
        const imgeWrapper = document.createElement("div")
        imgeWrapper.classList.add("Search-result");
        const image =document.createElement("img");
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description

        imgeWrapper.appendChild(image);
        imgeWrapper.appendChild(imageLink);
        SearchResults.appendChild(imgeWrapper);
       


    });

    page++;
    if(page > 1){
        showMore.style.display ="block"
    }
}


formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener("click", ()=>{
    
    searchImages();
})