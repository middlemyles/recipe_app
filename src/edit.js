//todo: MAKE SURE TO USE NODE VERSION v16.20.0

import { initializeEditPage, genterateLastEdited, renderIngredients } from './views'
import { updateRecipe, removeRecipe, } from './recipe'
import { createIngredients } from './ingredients'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const ingredientElement = document.querySelector('#ingredientsContainer')
const remove = document.querySelector('#remove-recipe')
const dateElement = document.querySelector('#last-edited')
let recipeId = location.hash.substring(1)
let ingredientId = location.hash.substring(1)


initializeEditPage(recipeId)
renderIngredients(ingredientId)

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



// Set up form submission handler
document.querySelector('#new-ingredients').addEventListener('submit', (event) => {
    const text = event.target.elements.addedIngredient.value.trim()
    event.preventDefault()

    if (text.length > 0) {
        createIngredients(text)
        renderIngredients(text)
        event.target.elements.addedIngredient.value = ''
        console.log('from add ingredient event')
    }
})

remove.addEventListener('click', (event) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (event) => {
    if (event.key === 'recipeList'){
        initializeEditPage(recipeId)
        renderIngredients(ingredientId)
    }
})
