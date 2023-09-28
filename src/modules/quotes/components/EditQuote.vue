<template>
  <div class="addQuote bg-white p-5 shadow-md">
    <v-form @submit.prevent="editQuote">
      <v-row>
        <v-col cols="12">
          <!-- <v-textarea v-model="quote.text" label="Quote..."></v-textarea>

          <v-text-field v-model="quote.author" label="Author"></v-text-field>

          <v-text-field v-model="quote.genre" label="Genre"></v-text-field> -->
        </v-col>

        <v-col cols="12">
          <v-btn type="submit" color="#78c0a8" class="mr-3">Edit Quote</v-btn>
          <v-btn type="submit" color="red" @click="$emit('close')">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { useQuoteStore } from "../quotes.store";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
const quoteStore = useQuoteStore();
const quotes = ref([]);
const toast = useToast();
const emit = defineEmits();
const selectedQuote = ref(null);
const routes = useRoute();
const id = routes.params.id;

selectedQuote.value = quotes.value.find((item) => item.id === id);
// selectedQuote.value = quotes.value.filter((item) => item.id === id)[0];
console.log(selectedQuote, "edittt");
const quote = { ...selectedQuote };

onMounted(async () => {
  await quoteStore.FETCH_QUOTES();
  quotes.value = quoteStore.GET_QUOTES.data;
});

async function editQuote() {
  if (!quote.value.text || !quote.value.author || !quote.value.genre) {
    toast.error("Fill all the fields");
    return;
  }

  toast.success("Quote edited successfully");
  emit("quote-edited", quote.value);
  emit("close");
}
</script>

<style scoped>
.addQuote {
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  width: 500px !important;
  z-index: 1000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
v-text-field {
  margin: 0;
}
</style>
