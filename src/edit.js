import { initializeEditPage, genterateLastEdited } from './views'
import { updateRecipe,removeRecipe } from './recipe'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const remove = document.querySelector('#remove-recipe')
const dateElement = document.querySelector('#last-edited')
let recipeId = location.hash.substring(1)

initializeEditPage(recipeId)


titleElement.addEventListener('input', (event) => {
    const recipe = updateRecipe(recipeId, {
        title: event.target.value
    })
    dateElement.textContent = genterateLastEdited(recipe.updatedAt)
})

bodyElement.addEventListener('input',(event) => {
    const recipe = updateRecipe(recipeId, {
        body: event.target.value
    })
    dateElement.textContent = genterateLastEdited(recipe.updatedAt)
})

remove.addEventListener('click', (event) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (event) => {
    if (event.key === 'recipeList'){
        initializeEditPage(recipeId)
    }
})
