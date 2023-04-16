//MAKE SURE TO USE NODE VERSION v16.20.0

import "core-js/stable"
import "@babel/polyfill";
import { getRecipes, removeRecipe, sortRecipes, updateRecipe, createRecipe } from "./recipe"
import { getFilters, setFilters } from "./filters"
import { renderRecipe } from "./views"

renderRecipe()

document.querySelector('#create-recipe').addEventListener('click', (event) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (event) => {
    setFilters({
        searchText: event.target.value
    })
    renderRecipe()
})


document.querySelector('#filter-by').addEventListener('change', (event) => {
    setFilters({
        sortBy: event.target.value
    })
    renderRecipe()
})

window.addEventListener('storage', (event) => {
    if (event.key === 'recipeList') {
        renderRecipe()
    }
})