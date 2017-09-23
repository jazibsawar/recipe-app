<template>
    <div>
        <div>
            <pulse-loader :loading="loading" v-if="!editForm" color="#FFC107"></pulse-loader>
        </div>
        <v-container fill-height class="noRecipes" v-if="recipes.length == 0 && !loading">
            <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                    <h4>There is no recipe please add one!</h4>
                    <v-btn light large class="amber darken-2" @click="openAddForm" :disabled="loading">Add Recipe</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg text-xs-center>
            <v-layout row wrap v-if="recipes.length > 0">
                <v-flex md4 sm6 xs12 v-for="(recipe, index) in recipes" :key="index">
                    <v-card>
                        <router-link :to="{name:'recipe', params:{id:recipe._id}}">
                            <v-card-media :src="recipe.metadata.feature_image.url" height="200px">
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
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn icon :disabled="loading" @click="deleteRecipe(recipe)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-btn fixed light fab bottom right class="amber darken-2" @click="openAddForm" :disabled="loading" >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-layout>
            <recipe-form></recipe-form>
        </v-container>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    import RecipeForm from './RecipeForm.vue';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    export default {
        components:{
            'recipe-form': RecipeForm,
            'pulse-loader': PulseLoader
        },
        computed: {
            ...mapGetters([
                'recipes','loading','editForm','editorOption'
            ])
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
</style>