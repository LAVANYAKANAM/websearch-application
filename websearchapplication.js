document.addEventListener("DOMContentLoaded", function() {
let searchResultsEl = document.getElementById("searchResults");
let searchInputEl = document.getElementById("searchInput");

function showResults(item) {
    let { title, link, description } = item;

    let divContainer = document.createElement("div");
    divContainer.classList.add("result-item");
    searchResultsEl.appendChild(divContainer);

    let titleEl = document.createElement("a");
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.classList.add("result-title");
    divContainer.appendChild(titleEl);

    let titleBrEl = document.createElement("br");
    divContainer.appendChild(titleBrEl);

    let linkEl = document.createElement("a");
    linkEl.textContent = link;
    linkEl.href = link;
    divContainer.appendChild(linkEl);

    let linkBrEl = document.createElement("br");
    divContainer.appendChild(linkBrEl);

    let paraEl = document.createElement("p");
    paraEl.textContent = description;
    divContainer.appendChild(paraEl);
}

function takeResults(search_results) {
    searchResultsEl.innerHTML = ""; // Clear previous search results
    search_results.forEach(showResults);
}

function getResults(event) {
    if (event.key === "Enter") {
        let searchInputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + encodeURIComponent(searchInputValue);
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let { search_results } = jsonData;
                takeResults(search_results);
            })
            .catch(function(error) {
                console.error("Error fetching search results:", error);
            });
    }
}



searchInputEl.addEventListener("keydown", getResults);
});




