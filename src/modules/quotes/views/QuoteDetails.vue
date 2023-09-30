<template>
  <div class="responsive-table border w-[800px] mt-5">
    <v-table class="" width="500px">
      <tbody>
        <tr>
          <td class="font-bold">Quote:</td>
          <td>{{ selectedQuote?.text }}</td>
        </tr>
        <tr>
          <td class="font-bold">Author:</td>
          <td>{{ selectedQuote?.author }}</td>
        </tr>
        <tr>
          <td class="font-bold">Genre:</td>
          <td>{{ selectedQuote?.genre }}</td>
        </tr>
        <tr>
          <td class="font-bold">Generation Time:</td>
          <td>{{ selectedQuote?.generationTime }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <router-link to="/" class="flex my-5 text-xl text-blue-400"
    >Go Back Home</router-link
  >
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuoteStore } from "../quotes.store";

const quoteStore = useQuoteStore();
const routes = useRoute();
const quotes = ref([]);
let selectedQuote = ref(null);
const id = parseInt(routes.params.id);

onMounted(async () => {
  await quoteStore.FETCH_QUOTES();
  quotes.value = quoteStore.GET_QUOTES.data;
  selectedQuote.value = quotes.value.find((item) => item.id == id);
});
</script>

<style scoped>
.responsive-table {
  width: 100%;
}
@media (max-width: 640px) {
  .responsive-table {
    max-width: auto;
  }
}
</style>
