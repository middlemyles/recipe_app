import moment from 'moment'
import { getFilters } from './filters'
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
    const dateElement = document.querySelector('#last-edited')
    const recipes = getRecipes()

    const recipeCard = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipeCard) {
        location.assign('/index.html')
    }

    titleElement.value = recipeCard.title
    bodyElement.value = recipeCard.body
    dateElement.textContent = genterateLastEdited(recipeCard.updatedAt)
}

//generate the last edited message
const genterateLastEdited = (timestamp) => {
    return `last edited ${moment(timestamp).fromNow()}`
}

export { generateRecipeDOM, renderRecipe, genterateLastEdited, initializeEditPage }