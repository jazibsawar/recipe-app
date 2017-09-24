<template>
  <v-app toolbar id="keep">
    <v-toolbar class="amber" fixed>
      <v-progress-linear class="app-loader" v-bind:indeterminate="loading" v-if="loading" height="5" success></v-progress-linear>
      <span class="title">
        <router-link :to="{name:'home'}">
          Recipe <span class="text">App</span>
        </router-link>
      </span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container fluid class="grey lighten-4">
        <!--v-router-->
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="amber darken-2">
      <v-spacer></v-spacer>
        <span class="dark--text">Proudly powered by <a href="http://cosmicjs.com" target="_blank">@cosmicjs</a></span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex';
  export default {
    computed: {
        ...mapGetters([
            'loading'
        ])
    }
  }
</script>

<style lang="stylus">
  #keep
    .text
      font-weight: 400
    .title
      a
        color: rgba(0,0,0,0.87)
        text-decoration: none
    footer
      a
        color: rgba(0,0,0,0.87)
        text-decoration: none 
        font-weight: 600
    .app-loader
      position: absolute
      margin: 0
      padding: 0
      top: 0
</style>
