<template>
    <div id="recipe_single">
        <div v-if="recipe">
            <v-breadcrumbs icons divider="chevron_right">
                <v-breadcrumbs-item replace :to="{name: 'recipes'}">
                    Home
                </v-breadcrumbs-item>
                <v-breadcrumbs-item disabled>
                    {{ recipe.title }}
                </v-breadcrumbs-item>
                <v-spacer></v-spacer>
                <v-btn primary light class="amber" replace :to="{name: 'recipes'}">Back</v-btn>
            </v-breadcrumbs>
        </div>
        <v-container fluid grid-list-lg>
            <v-layout row wrap>
                <v-flex md10 xs12 offset-md1 v-if="recipe">
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md4>
                            <v-card>
                                <v-card-media :src="recipe.metadata.feature_image.url.replace(/ /g,'%20')" height="300px">
                                </v-card-media>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md8 class="recipe_info">
                            <h1 class="headline mb-0">
                                {{recipe.title}}
                            </h1>
                            <ul class="recipe_meta">
                                <li><p><strong>PUBLISHED BY</strong>{{recipe.metadata.author}}</p></li>
                                <li><p><strong>PREPARATION</strong>{{recipe.metadata.preparation_time}} {{ recipe.metadata.preparation_time > 1 ? 'minutes' : 'minute' }}</p></li>
                                <li><p><strong>COOK TIME</strong>{{recipe.metadata.cook_time}} {{ recipe.metadata.cook_time > 1 ? 'minutes' : 'minute' }}</p></li>
                                <li><p><strong>SERVINGS</strong>{{recipe.metadata.servings}} {{ recipe.metadata.servings > 1 ? 'persons' : 'person' }}</p></li>
                                <li><p><strong>Category</strong><v-chip class="amber dark--text">{{recipe.metadata.category}}</v-chip></p></li>
                            </ul>
                        </v-flex>
                    </v-layout>
                    <p class="mt-3"></p>
                    <v-layout row wrap class="recipe_content_wrap">
                        <v-flex xs12 md8 offset-md2>
                            <div class="video-responsive">
                                <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+recipe.metadata.youtube_id" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </v-flex>
                    </v-layout>
                    <p class="mt-5"></p>
                    <v-card class="white">
                        <v-layout row wrap class="recipe_content_wrap">
                            <v-flex xs12 md6 order-md2>
                                <h1 class="headline mb-0">
                                    Ingredients:
                                </h1>
                                <v-list avatar>
                                    <v-list-tile v-for="(item, index) in recipe.metadata.ingredients" :key="index">
                                        <v-list-tile-avatar>
                                            <v-icon class="amber--text text--darken-2">fa-circle</v-icon>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{item.ingredient}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-flex>
                            <v-flex xs12 md6>
                                <h1 class="headline mb-0">
                                    Preparation:
                                </h1>
                                <p v-html="recipe.content" class="recipe_content"></p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    export default {
        computed: {
            recipe(){
                return this.$store.getters.recipe(this.$route.params.id)
            }
        },
        methods:{

        }
    }
</script>

<style lang="stylus">
  #recipe_single
    .headline
        font-size: 32px !important
        padding-top: 15px
    .recipe_meta
        padding-top: 30px
        padding-left: 15px
        list-style: none
        strong
            margin-right: 10px
    .recipe_content_wrap
        padding: 10px 20px
    .recipe_content
        padding-top: 15px
        padding-left: 10px
    .list
        > li
            height: 30px
    .icon
        font-size: 16px
    .video-responsive
        overflow:hidden
        padding-bottom:56.25%
        position:relative
        height:0
    .video-responsive iframe
        left:0
        top:0
        height:100%
        width:100%
        position:absolute
    .breadcrumbs
        li:first-child
            a
                color: #FFC107
        li:nth-child(2):after
            content: ''

</style>