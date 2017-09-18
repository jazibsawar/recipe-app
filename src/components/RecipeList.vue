<template>
    <v-container grid-list-lg text-xs-center>
        <v-layout row wrap>
            <v-flex md4 sm6 xs12 v-for="recipe in recipes" :key="i">
                <v-card>
                    <v-card-media class="white--text" height="200px"
                        src="http://www.trbimg.com/img-5824e9be/turbine/ct-thanksgiving-restaurants-open-dinner-take-out-chicago-2016">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline">{{recipe.name}}</span>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-title>
                        <div>
                            <span>{{recipe.name}}</span>
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
                        <v-btn icon>
                            <v-icon>share</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-btn fixed dark fab bottom right class="pink">
                <v-icon>add</v-icon>
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            recipes(){
                return this.$store.state.recipes;
            }
        }
    }
</script>