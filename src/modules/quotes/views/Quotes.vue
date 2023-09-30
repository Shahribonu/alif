<template>
  <div class="d-flex justify-between align-center px-5">
    <input
      class="quote-input p-2 shadow-sm text-xl h-[50px] w-[250px] rounded-md"
      type="text"
      placeholder="Search... "
      v-model="searchText"
    />
    <!-- Add quote btn -->
    <v-btn
      class="openAddQuote"
      v-if="!openAddQuote"
      @click="openAddQuote = true"
    >
      Add Quote</v-btn
    >
    <!-- Add quote Form -->
    <AddQuote
      v-else
      @close="openAddQuote = false"
      @quoteCreated="handleQuoteAdded"
    />
    <!-- Edit quote form -->
    <EditQuote
      :openEditQuote="openEditQuote?.value"
      v-if="openEditQuote"
      @close="openEditQuote = false"
      @quoteEdited="handleQuoteEdited"
    />
  </div>

  <!-- All quotes render -->
  <div class="allQuotes">
    <blockquote
      v-for="quote in filteredQuotes"
      key="quote.id"
      class="otro-blockquote"
    >
      <p>{{ quote.text }}</p>

      <div class="d-flex justify-between align-center">
        <div class="bottom">
          <v-btn class="mr-3" @click="openEditQuote = quote.id">
            <i class="fa-solid fa-pen-to-square mr-4"></i
          ></v-btn>

          <v-btn class="mr-3" @click="deleteDialog = quote.id">
            <i class="fa-solid fa-trash"></i>
          </v-btn>
          <v-btn @click="moveToDetails(quote)"> More </v-btn>
        </div>

        <span>{{ quote.author }}</span>
      </div>
    </blockquote>
  </div>
  <!-- Delete dialog form -->
  <v-dialog v-model="deleteDialog" class="d-flex justify-center">
    <div class="dialog p-5 w-[500px] d-flex justify-center flex-col mx-auto">
      <h2 class="text-xl font-semibold text-center mb-3">Are you sure?</h2>

      <div class="btns justify-center">
        <v-btn class="btn mr-3" @click="deleteQuote(deleteDialog)"
          >Delete</v-btn
        >
        <v-btn class="btn" @click="deleteDialog = null">Cancel</v-btn>
      </div>
    </div></v-dialog
  >
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useQuoteStore } from "../quotes.store";
import { useRouter } from "vue-router";
import AddQuote from "../components/AddQuote.vue";
import EditQuote from "../components/EditQuote.vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const quoteStore = useQuoteStore();
const searchText = ref("");
let deleteDialog = ref(null);
const toast = useToast();
let openAddQuote = ref(quoteStore.OPEN_ADD_QUOTE);
let openEditQuote = ref();
const quotes = ref([]);

onMounted(async () => {
  await quoteStore.FETCH_QUOTES();
  quotes.value = quoteStore.GET_QUOTES.data;

  function myFunction() {
    console.log("Value changed:", openEditQuote.value);
  }
  watch(openEditQuote, myFunction);
});

const filteredQuotes = computed(() => {
  const searchLowerCase = searchText.value.toLowerCase();
  return quotes.value.filter(
    (quote) =>
      quote.text.toLowerCase().includes(searchLowerCase) ||
      quote.author.toLowerCase().includes(searchLowerCase)
  );
});

async function handleQuoteAdded(newQuote) {
  try {
    await quoteStore.ADD_QUOTE(newQuote);
    quotes.value = quoteStore.GET_QUOTES.data;
  } catch (error) {
    console.error(error);
  }
}
async function handleQuoteEdited(updatedQuote) {
  try {
    await quoteStore.EDIT_QUOTE(updatedQuote);
    quotes.value = quoteStore.GET_QUOTES.data;
  } catch (error) {
    console.error(error);
  }
}

const moveToDetails = (item) => {
  router.push(`/details/${item.id}`);
};

async function deleteQuote(id) {
  if (id) {
    await quoteStore.DELETE_QUOTE(id);
    toast.success("Quote has been deleted!");
    deleteDialog.value = false;
    quotes.value = quoteStore.GET_QUOTES.data;
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Open Sans";
  src: url(https://fonts.googleapis.com/css?family=Open+Sans:400italic);
  font-weight: normal;
  font-style: normal;
}
.allQuotes {
  display: flex;
  flex-wrap: wrap;
  margin: 50px auto;
  position: relative;
}
.otro-blockquote {
  font-size: 20px;
  width: 45%;
  font-family: Open Sans;
  font-style: italic;
  color: #555555;
  padding: 1.2em 30px 1.2em 75px;
  border-left: 8px solid #78c0a8;
  line-height: 1.6;
  position: relative;
  background: #ededed;
  margin: 20px;
  min-width: 360px;
}

.otro-blockquote::before {
  font-family: Arial;
  content: "\201C";
  color: #78c0a8;
  font-size: 4em;
  position: absolute;
  left: 10px;
  top: -10px;
}

.otro-blockquote::after {
  content: "";
}
.otro-blockquote p {
  margin-bottom: 55px;
}
.otro-blockquote .bottom {
  font-size: 18px;
  position: absolute;
  left: 30px;
  bottom: 20px;

  color: #333333;
  font-style: normal;
  font-weight: bold;
  margin-top: 20px;
}
.otro-blockquote span {
  font-size: 15px;
  position: absolute;
  right: 30px;
  bottom: 20px;

  color: #333333;
  font-style: normal;
  font-weight: bold;
  margin-top: 20px;
}
.quote-input {
  border: 1px solid rgba(63, 59, 59, 0.5);
  /* width: 100%; */
}
.dialog {
  background: #78c0a8;
  color: white;
}
.btns {
  display: flex;
}

@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
    align-items: center;
  }

  .quote-input {
    width: 100%;
    margin-bottom: 20px;
  }

  .openAddQuote {
    margin-top: 20px;
  }

  .otro-blockquote {
    width: 100%;
    min-width: 360px;
  }

  .otro-blockquote p {
    margin-bottom: 60px;
  }

  .otro-blockquote .bottom {
    font-size: 15px;
    margin-top: 10px;
  }

  .otro-blockquote span {
    font-size: 15px;
  }

  .dialog {
    width: 100%;
    display: flex !important;
    .btn {
      margin: 0;
    }
  }
}
</style>
