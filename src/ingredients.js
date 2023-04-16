import uuidv4 from 'uuid/v4'
import moment from 'moment'

// set up an empty ingredients array
let ingredientsList = []

//load ingreadients
// Arguments: none
// Return value: none
const loadIngredients = () => {
    //check for existing saved data
    const ingredientsListJSON = localStorage.getItem('ingredientsList')

    try {
        ingredientsList = ingredientsListJSON ? JSON.parse(ingredientsListJSON) : []
    } catch (error) {
        ingredientsList = []
    }
}

// Save the ingredients
// Arguments: none
// Return value: none
const saveIngredients = () => {
    localStorage.setItem('ingredientsList', JSON.stringify(ingredientsList))
}

// Get the ingredients array
// Arguments: none
// Return value: ingredients array
const getIngredients = () => ingredientsList

// create an ingredient
// Argument: ingredients text
// Return value: none
const createIngredients = (text) => {
    const id = uuidv4()
    const timeStamp = moment().format('dddd, MMMM Do YYYY, h:mm:ss a')

    ingredientsList.push({
        id: id,
        text:text,
        completed: false,
        title: '',
        body: '',
        ingredient:'',
        createdAt: timeStamp,
        updatedAt: timeStamp,
    })
    saveIngredients()
    console.log('added ingredient')
}

// Remove the addded ingredient
// Arguments: id of the ingredient to remove
// Return value: none
const removeIngredient = (id) => {
    const ingredientsIndex = ingredientsList.findIndex((ingredient) => ingredient.id === id)

    if (ingredientsIndex > -1) {
        ingredientsList.splice(ingredientsIndex, 1)
        saveIngredients()
    }
}

// toggle your added ingredients
// Arguments: id of ingredient to toggle
// Return value: none
const toggleIngredient = (id) => {
    const ingredient = ingredientsList.find((ingredient) => ingredient.id === id)
    if (ingredient) {
        ingredient.completed = !ingredient.completed
        saveIngredients()
    }
}


loadIngredients()


export { loadIngredients, saveIngredients, getIngredients, createIngredients, removeIngredient, toggleIngredient }