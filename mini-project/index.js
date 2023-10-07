const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search");
const resultList = document.querySelector("#results");

searchForm.addEventListener("click", (e) =>{
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=cb6d6827&app_key=82da366fe7b1f0a9cf334ec5a117103b`);
    const data = await response.json();
    displayRecipes(data.hits);
}
// 72497efbe39eef20de55b10033cbdfd3&from=0&to=10
// a4b30d0a
function displayRecipes(recipes){
    let html = '';
    recipes.forEach((recipe) =>{
        html += `
        <div class="card">
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `
    })
    resultList.innerHTML = html;
}
