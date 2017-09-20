<template>
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
                        <v-btn icon>
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-btn fixed light fab bottom right class="amber darken-2">
                <v-icon>add</v-icon>
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'recipes'
            ])
        },
        methods:{

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
</style>