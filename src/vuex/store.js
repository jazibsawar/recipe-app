import Vue from 'vue'
import Vuex from 'vuex'
import Cosmic from 'cosmicjs';
import config from '../config/config';
import _ from 'lodash';

Vue.use(Vuex)

// the root, initial state object
const state = {
    recipes: [
    ],
    status: {
        loading: false,
        success: false,
        error: false
    },
    categories: [
        "Dessert",
        "Meal"
    ],
    recipe: {
        metadata:{
            feature_image: {
            },
            ingredients:[]
        }
    },
    editForm: false,
    editting: false
}

// define the possible getters that can be applied to our state
const getters = {
    recipes(state){
        return state.recipes;
    },
    recipe(state){
        return (keyword) => _.find(state.recipes,['_id', keyword]);
    },
    recipeModel(state){
        return state.recipe;
    },
    loading(state){
        return state.status.loading;
    },
    editForm(state){
        return state.editForm;
    },
    categories(state){
        return state.categories;
    },
    editting(state){
        return state.editting;
    }
}

// define the possible mutations that can be applied to our state
const mutations = {
    SET_RECIPES(state,payload){
        state.recipes = payload;
    },
    SET_RECIPE(state,payload){
        state.recipe = _.cloneDeep(payload);
    },
    ADD_RECIPE(state,payload){
        state.recipes.unshift(payload);
    },
    EDIT_RECIPE(state,payload){
        state.recipes = _.unionBy([payload],state.recipes,'_id');
    },
    DELETE_RECIPE(state,payload){
        _.remove(state.recipes, function (recipe) {
            return recipe._id === payload
        });
    },
    LOADING(state){
        state.status = {
            loading: true,
            success: false,
            error: false
        };
    },
    SUCCESS(state){
        state.status = {
            loading: false,
            success: true,
            error: false
        };
    },
    ERROR(state,payload){
        state.status = {
            loading: false,
            success: false,
            error: payload
        };
    },
    CLEAR_ERROR(state){
        state.status = {
            loading: false,
            success: false,
            error: false
        };
    },
    TOGGLE_EDITFORM(state,payload){
        state.editForm = payload;
    },
    ADD_INGREDIANT_RECIPE(state,payload){
        state.recipe.metadata.ingredients.push({
            ingredient: payload
        });
    },
    REMOVE_INGREDIANT_RECIPE(state,payload){
        state.recipe.metadata.ingredients.splice(payload, 1);
    },
    SET_RECIPE_IMAGE(state,payload){
        state.recipe.metadata.feature_image.url = payload;
    },
    SET_RECIPE_FILE(state,payload){
        state.recipe.metadata.feature_image.file = payload;
    },
    TOGGLE_EDITTING(state){
        state.editting = !state.editting;
    },
    SET_RECIPE_DEFAULT(state){
        state.recipe = {
            metadata:{
                feature_image: {
                },
                ingredients:[]
            }
        };
    }
}


// define the possible actions that can be applied to our state
const actions = {
    getRecipes(context){
        context.commit('LOADING');
        Cosmic.getObjectsByType(config, { type_slug: config.object_type }, (err, res) => {
            if(!err){
                context.commit('SET_RECIPES',res.objects.all);
                context.commit('SUCCESS');
            }
            else
            {
                context.commit('ERROR',err);
            }
        });
    },
    setRecipe(context,payload){
        context.commit('SET_RECIPE',payload);
    },
    setRecipeDefault(context){
        context.commit('SET_RECIPE_DEFAULT');
    },
    addRecipe(context,payload){
        context.commit('LOADING');
        context.commit('ADD_RECIPE',payload);
        context.commit('SET_RECIPE_DEFAULT');
        context.commit('TOGGLE_EDITFORM',false);
        context.commit('SUCCESS');
    },
    editRecipe(context,payload){
        context.commit('LOADING');
        context.commit('EDIT_RECIPE',payload);
        context.commit('SET_RECIPE_DEFAULT');
        context.commit('TOGGLE_EDITTING');
        context.commit('TOGGLE_EDITFORM',false);
        context.commit('SUCCESS');
    },
    deleteRecipe(context,payload){
        context.commit('LOADING');
        context.commit('DELETE_RECIPE',payload);
        context.commit('SUCCESS');
    },
    clearError(context){
        context.commit('CLEAR_ERROR');
    },
    setEditForm(context,payload){
        context.commit('TOGGLE_EDITFORM',payload);
    },
    addIngrediantInRecipe(context,payload){
        context.commit('ADD_INGREDIANT_RECIPE',payload);
    },
    removeIngrediantInRecipe(context,payload){
        context.commit('REMOVE_INGREDIANT_RECIPE',payload);
    },
    setRecipeImage(context,payload){
        context.commit('SET_RECIPE_IMAGE',payload);
    },
    setRecipeFile(context,payload){
        context.commit('SET_RECIPE_FILE',payload);
    },
    toggleEditting(context){
        context.commit('TOGGLE_EDITTING');
    }
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})