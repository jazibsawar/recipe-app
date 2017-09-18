<template>
  <v-app toolbar id="keep">
    <v-toolbar class="amber" fixed>
      <span class="title">Recipe <span class="text">App</span></span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container fluid class="grey lighten-4">
        <!--v-router-->
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>

</template>


<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>

<style lang="stylus">
  #keep
    .text
      font-weight: 400
</style>
