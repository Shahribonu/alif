import http from "../../../axios.config";

export async function fetchAllQuotes() {
  return await http.get("quotes");
}
export async function addNewQuote(newQuote) {
  return await http.post("quotes", newQuote);
}

export async function deleteQuote(quoteId) {
  return await http.delete(`quotes/${quoteId}`);
}

export async function editQuote(updatedQuote) {
  return await http.put(`quotes/${updatedQuote.id}`, updatedQuote);
}
