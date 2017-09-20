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
    recipe: {
    },
    editForm: false
}

// define the possible getters that can be applied to our state
const getters = {
    recipes(state){
        return state.recipes;
    },
    recipe(state){
        return (keyword) => _.find(state.recipes,['_id', keyword]);
    },
    loading(state){
        return state.status.loading;
    },
    editForm(state){
        return state.editForm;
    }
}

// define the possible mutations that can be applied to our state
const mutations = {
    SET_RECIPES(state,payload){
        state.recipes = payload;
    },
    SET_RECIPE(state,payload){
        state.recipe = payload;
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
    }
}


// define the possible actions that can be applied to our state
const actions = {
    getRecipes(context){
        context.commit('LOADING');
        Cosmic.getObjectsByType(config, { type_slug: config.object_type }, (err, res) => {
            if(!err){
                context.commit('SET_RECIPES',_.map(res.objects.all, (recipe) =>{
                    recipe.metadata.youtube_id = `https://www.youtube.com/embed/${recipe.metadata.youtube_id}`;
                    return recipe;
                }));
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
    addRecipe(context){

    },
    editRecipe(context){

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