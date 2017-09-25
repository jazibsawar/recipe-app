<template>
    <div>
        <v-container fill-height class="noRecipes" v-if="recipes.length == 0 && !loading">
            <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                    <h4>There is no recipe please add one!</h4>
                    <v-btn light large class="amber" @click="openAddForm" :disabled="loading">Add Recipe</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg text-xs-center>
            <v-layout row wrap v-if="recipes.length > 0">
                <v-flex md4 sm6 xs12 v-for="(recipe, index) in recipes" :key="index">
                    <v-card>
                        <router-link :to="{name:'recipe', params:{id:recipe._id}}">
                            <v-card-media :src="recipe.metadata.feature_image.url.replace(/ /g,'%20')" height="200px">
                            </v-card-media>
                        </router-link>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">
                                    <router-link :to="{name:'recipe', params:{id:recipe._id}}">
                                        {{recipe.title}}
                                    </router-link>
                                </h3>
                                <div>{{recipe.metadata.author}}</div>
                            </div>
                        </v-card-title>
                        <v-card-actions class="white">
                            <v-spacer></v-spacer>
                            <v-btn icon :disabled="loading" @click="openEditForm(recipe)">
                                <v-icon class="blue--text">edit</v-icon>
                            </v-btn>
                            <v-btn icon :disabled="loading" @click="deleteRecipe(recipe)">
                                <v-icon class="red--text">delete</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-btn fixed light fab bottom right class="amber darken-2" @click="openAddForm" :disabled="loading" >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-layout>
            <div class="text-xs-center recipes-pagination" v-if="recipes.length > 0">
                <v-pagination :disabled="loading" :length="pagination.total" v-model="pagination.page" :total-visible="5" circle></v-pagination>
            </div>
            <recipe-form></recipe-form>
            <v-snackbar :timeout="2000" success v-model="success">
                Request done successfully!
            </v-snackbar>
            <v-snackbar :timeout="3000" error v-model="error">
                There was an error during request!
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    import RecipeForm from './RecipeForm.vue';
    export default {
        components:{
            'recipe-form': RecipeForm
        },
        computed: {
            success: {
                get: function(){
                    return this.$store.state.status.success;
                },
                set: function(value){
                    this.$store.dispatch('clearError');
                }
            },
            error: {
                get: function(){
                    return this.$store.state.status.error;
                },
                set: function(value){
                    this.$store.dispatch('clearError');
                }
            },
            ...mapGetters([
                'recipes','pagination','loading','editForm','page'
            ])
        },
        watch: {
            page: 'getRecipes'
        },
        methods:{
            openAddForm(){
                this.$store.dispatch('setRecipeDefault');
                this.$store.dispatch('setEditForm',true);
            },
            openEditForm(recipe){
                this.$store.dispatch('setRecipe',recipe);
                this.$store.dispatch('toggleEditting');
                this.$store.dispatch('setEditForm',true);
            },
            deleteRecipe(recipe){
                this.$store.dispatch('deleteRecipe',recipe);
            },
            getRecipes(){
                this.$store.dispatch('getRecipes');
            }
        }
    }
</script>

<style lang="stylus" scoped>
  #keep
    .card__title
      display: block

    .headline
        a
            color: rgba(0,0,0,0.87)
            text-decoration: none
    .v-spinner
        text-align: center
    .noRecipes
        position: absolute
        right: 0
        left: 0
        text-align: center
        height: auto
        top: 60px
        bottom: 0
    .recipes-pagination
        margin-top: 80px
    .pagination >>> li > a.pagination__item--active
        background: #FFC107
        color: #000
        font-weight: bold
</style>
