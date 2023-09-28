<template>
  <div>
    <!-- <h1>Quote: {{ selectedQuote.text }}</h1>
    <h2>author: {{ selectedQuote.author }}</h2>
    <p>genre: {{ selectedQuote.genre }}</p>
    <p>generationTime: {{ selectedQuote.generationTime }}</p>
    <p>updateTime: {{ selectedQuote.updateTime }}</p> -->

    {{ selectedQuote }}

    <h1>Edit <i class="fa-solid fa-pen-to-square"></i></h1>
    <h1>Delete <i class="fa-solid fa-trash"></i></h1>

    <router-link to="/" class="flex justify-center my-5 text-2xl text-blue-400"
      >Go Back Home</router-link
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuoteStore } from "../quotes.store";
const quoteStore = useQuoteStore();
const routes = useRoute();
const quotes = ref([]);
const selectedQuote = ref(null);

const id = routes.params.id;
console.log(id, "id");

onMounted(async () => {
  await quoteStore.FETCH_QUOTES();
  quotes.value = quoteStore.GET_QUOTES.data;
  console.log(quotes.value);

  selectedQuote.value = quotes.value.find((item) => item.id === id);
  console.log(selectedQuote.value);
});
</script>

<style lang="scss" scoped></style>
