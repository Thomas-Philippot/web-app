<template>
    <v-app>
        <v-flex lg3 md6 sm12>
            <v-select
                    :items="items"
                    label="Category"
                    v-model="category"
            ></v-select>
            <v-btn @click="getArticles">Search</v-btn>
        </v-flex>
        <v-layout
                row
                wrap
                align-center
                class="container">
            <v-flex v-if="noData" md12>
                <h1 class="display-2 text-lg-center">No data</h1>
            <p class="title text-sm-center">This page has made to many API calls and has been temporary blocked</p>
            </v-flex>
            <v-flex
                    v-for="(article, id) in articles"
                    :key="id"
                    md6
                    lg4
                    sm12
                    mb-3>
                <v-hover>
                    <v-card
                            slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2}`"
                            class="mx-auto"
                            width="344"
                    >
                        <v-img
                                v-if="article.urlToImage !== null"
                                :aspect-ratio="16/9"
                                :src=article.urlToImage
                        ></v-img>
                        <v-card-title>
                            <div>
                                <span class="headline">{{ article.title }}</span>
                                <div class="d-flex">
                                    <div class="ml-2 grey--text text--darken-2">
                                        <span class="subheading">{{ article.description }}</span>
                                    </div>
                                </div>
                            </div>
                        </v-card-title>
                    </v-card>
                </v-hover>
            </v-flex>
        </v-layout>
        <v-layout>
            <a href="https://newsapi.org/" target="_blank">Powered by News API</a>
        </v-layout>
    </v-app>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'news',
    data: () => {
      return {
        articles: [],
        items: ['VueJs', 'développeur freelance', 'Java', 'npm', 'Bitcoin'],
        category: 'VueJs',
        noData: false
      }
    },
    created () {
      this.getArticles()
    },
    methods: {
      getArticles () {
        axios.get('https://newsapi.org/v2/everything?q=' + this.category + '&language=fr&sortBy=popularity&apiKey=8736d01c3e3a4595a6a674ec46264943').then(response => {
          console.log(response)
          this.articles = response.data.articles
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped>

</style>