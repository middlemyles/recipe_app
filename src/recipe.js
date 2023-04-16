import uuidv4 from 'uuid/v4'
import moment from 'moment'

let recipeList = []

//read existing notes from local storage
const loadRecipes = () => {
    // check for existing saved data
    const recipeJSON = localStorage.getItem('recipeList')

    try {
        return recipeJSON ? JSON.parse(recipeJSON) : []
    } catch (e) {
        return []
    }
}
// save the notes to local storage
const savedRecipe = () => {
    localStorage.setItem('recipeList', JSON.stringify(recipeList))
}


// expose notes from module
const getRecipes = () => recipeList

const createRecipe = (text) => {
    const id = uuidv4()
    const timeStamp = moment().format('dddd, MMMM Do YYYY, h:mm:ss a')

    recipeList.push({
        id: id,
        title: '',
        body: '',
        text: text,
        completed: false,
        createdAt: timeStamp,
        updatedAt: timeStamp,
    })
    savedRecipe()
    console.log('created new recipe')

    return id
}



// remove a note from the list
const removeRecipe = (id) => {
    const recipeIndex = recipeList.findIndex((recipe) => recipe.id === id)
        
    if (recipeIndex > -1) {
        recipeList.splice(recipeIndex, 1)
        savedRecipe()
    }
}

// sort your notes by ones of 3 ways
const sortRecipes = (sortBy) => {
    if (sortBy === 'byEditied') {
        return recipeList.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return recipeList.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byAlphabetacal') {
        return recipeList.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    
    }  else {
        return recipeList
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleRecipe = (id) => {
    const recipe = recipeList.find((recipe) => recipe.id === id)
    if (recipe) {
        recipe.completed = !recipe.completed
        savedRecipe()
    }
}

const updateRecipe = (id, updates) => {
    const recipeUpdate = recipeList.find((recipe) => recipe.id === id)

    if (!recipeUpdate) {
        return
    }
    if (typeof updates.title === 'string') {
        recipeUpdate.title = updates.title
        recipeUpdate.updatedAt = moment().valueOf()
    }
    if (typeof updates.body === 'string') {
        recipeUpdate.body = updates.body
        recipeUpdate.updatedAt = moment().valueOf()
    }
    savedRecipe()
    return recipeUpdate
}

recipeList = loadRecipes()

export { getRecipes, createRecipe, removeRecipe, sortRecipes, updateRecipe, toggleRecipe, savedRecipe, loadRecipes }