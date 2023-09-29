import { defineStore } from 'pinia'
import {fetchAllQuotes} from './quotes.api'
import { addNewQuote } from './quotes.api';
import { deleteQuote } from './quotes.api';
import { editQuote } from './quotes.api';


export const useQuoteStore = defineStore('quote', {
  state: () => ({
    quotes:[],
    openAddQuote:false,
  }),
  
  getters: {
    GET_QUOTES: (s)=>s.quotes,
    OPEN_ADD_QUOTE: (s)=>s.openAddQuote
  },

  actions: {
   async FETCH_QUOTES(){
      this.quotes = await fetchAllQuotes()
      
    },
   
   async ADD_QUOTE(newQuote) {
      await addNewQuote(newQuote);
      this.quotes = await fetchAllQuotes();
    },

    async DELETE_QUOTE(quoteId) {
          await deleteQuote(quoteId); 
          this.quotes.data = this.quotes?.data?.filter(quote => quote.id !== Number(quoteId));
      },

      async EDIT_QUOTE(updatedQuote) {
          await editQuote(updatedQuote);
          this.quotes = await fetchAllQuotes()
      },

      CHANGE_ADD_QUOTE(){
        return this.openAddQuote = !this.openAddQuote
      },
    
  },
})

