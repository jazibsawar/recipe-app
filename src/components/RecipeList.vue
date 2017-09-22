<template>
    <div>
        <div>
            <pulse-loader :loading="loading" v-if="!editForm" color="#FFC107"></pulse-loader>
        </div>
        <v-container grid-list-lg text-xs-center>
            <v-layout row wrap>
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
                            <v-btn icon :disabled="loading" @click="deleteRecipe(recipe._id)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-btn fixed light fab bottom right class="amber darken-2" @click="openAddForm" :disabled="loading" v-if="recipes.length > 0" >
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
            deleteRecipe(id){
                this.$store.dispatch('deleteRecipe',id);
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
</style>