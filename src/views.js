import moment from 'moment'
import { getFilters } from './filters'
import { getIngredients, removeIngredient, toggleIngredient, ingredientMessage } from './ingredients'
import { sortRecipes, getRecipes, removeRecipe, toggleRecipe } from './recipe'

// generate the dom structure for a note
const generateRecipeDOM = (recipe) => {
    const noteElement = document.createElement('a')
    const textElement = document.createElement('h3')
    const statusElement = document.createElement('p')
    

    if (recipe.title.legth > 0) {
        textElement.textContent = recipe.title
    } else {
        textElement.textContent = `${recipe.title}`
    }

    textElement.classList.add('list-item__title')
    noteElement.appendChild(textElement)

    //set up the link
    noteElement.setAttribute('href', `/edit.html#${recipe.id}`)
    noteElement.classList.add('list-item')

    // set up the status message
    statusElement.textContent = genterateLastEdited(recipe.updatedAt)
    statusElement.classList.add('list-item__subtitle')
    noteElement.appendChild(statusElement)

    return noteElement
}

// render application notes
const renderRecipe = () => {
    const notesElement = document.querySelector('#recipeList')
    const filters = getFilters()
    const recipes = sortRecipes(filters.sortBy)
    const filterNotes = recipes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesElement.innerHTML = ''

    if (filterNotes.length > 0) {
        filterNotes.forEach((note) => {
            const noteElement = generateRecipeDOM(note)
            document.querySelector('#recipeList').appendChild(noteElement)
    })
    } else {
        const emptyMessage = document.createElement('h2')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        notesElement.appendChild(emptyMessage)
    }
}

const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#recipe-title')
    const bodyElement = document.querySelector('#recipe-body')
    const ingredientElement = document.querySelector('#ingredientsContainer')
    const dateElement = document.querySelector('#last-edited')
    const recipes = getRecipes()
    const ingredients = getIngredients()

    const recipeCard = recipes.find((recipe) => recipe.id === recipeId)
    const ingredientCard = ingredients.find((ingredient) => ingredient.id === recipeId)

    if (!recipeCard) {
        location.assign('/index.html')
    }

    titleElement.value = recipeCard.title
    bodyElement.value = recipeCard.body
    dateElement.textContent = genterateLastEdited(recipeCard.updatedAt)
}

const renderIngredients = () => {
    const ingredientElement = document.querySelector('#ingredientsContainer')
    const { searchText, hideCompleted } = getFilters()

    const filterIngredients = getIngredients().filter((ingredient) => {
        const searchTextMatch = ingredient.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatched = !hideCompleted || !ingredient.completed

        return searchTextMatch && hideCompletedMatched
    })

    ingredientElement.innerHTML = ''

    if (filterIngredients.length > 0) {
        filterIngredients.forEach((ingredient) =>  {
            const ingredientsElement = (generateIngredientDOM(ingredient))
            document.querySelector('#ingredientsContainer').appendChild(ingredientsElement)
        })
    } else {
        const messageElement = document.createElement('p')
        messageElement.classList.add('empty-message')
        messageElement.textContent = `have not added any ingredients`
        ingredientElement.appendChild(messageElement)
    }
}

const generateIngredientDOM = (ingredient) => {
    const ingredientElement = document.createElement('lable')
    const containerElement = document.createElement('div')
    const checkbox = document.createElement('input')
    const textElement = document.createElement('span')
    const removeButton = document.createElement('button')

    // setting up the ingredients checkboxes
    checkbox.setAttribute('type', 'checkbox')
    checkbox.classList.add('ingredient-checkbox')
    checkbox.checked = ingredient.completed
    containerElement.appendChild(checkbox)

    //add event listent to checkboxes
    checkbox.addEventListener('change', (event) => {
        toggleIngredient(ingredient.id)
        renderIngredients(ingredient.id)
    })

    //set up the ingredient text
    textElement.textContent = ingredient.text
    containerElement.appendChild(textElement)

    //set up container
    ingredientElement.classList.add('ingredient-item')
    containerElement.classList.add('ingredient-item__container')
    ingredientElement.appendChild(containerElement)

    // setting up the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    ingredientElement.appendChild(removeButton)
    removeButton.addEventListener('click', (event) => {
        removeIngredient(ingredient.id)
        renderIngredients(ingredient.id)
    })
    return ingredientElement
}

//generate the last edited message
const genterateLastEdited = (timestamp) => {
    return `last edited ${moment(timestamp).fromNow()}`
}

export { generateRecipeDOM, renderRecipe, genterateLastEdited, initializeEditPage, renderIngredients, generateIngredientDOM }