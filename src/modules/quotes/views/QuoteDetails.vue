<template>
  <div class="border w-[800px] mt-5">
    <v-table width="500px">
      <tbody>
        <tr>
          <td>Quote:</td>
          <td>{{ selectedQuote?.text }}</td>
        </tr>
        <tr>
          <td>Author:</td>
          <td>{{ selectedQuote?.author }}</td>
        </tr>
        <tr>
          <td>Genre:</td>
          <td>{{ selectedQuote?.genre }}</td>
        </tr>
        <tr>
          <td>Generation Time:</td>
          <td>{{ selectedQuote?.generationTime }}</td>
        </tr>
        <tr>
          <td>Update Time:</td>
          <td>{{ selectedQuote?.updateTime }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <router-link to="/" class="flex justify-center my-5 text-2xl text-blue-400"
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

<style lang="scss" scoped></style>
