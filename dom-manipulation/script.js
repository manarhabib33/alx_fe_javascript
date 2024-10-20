// Array to store quotes
const quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "You miss 100% of the shots you don't take.", category: "Inspiration" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    // Get the quoteDisplay div and update its content
    const quoteDisplay = document.getElementById('quoteDisplay');
  
    // Clear the previous quote
    quoteDisplay.innerHTML = '';
  
    // Create a new paragraph element
    const quoteParagraph = document.createElement('p');
    quoteParagraph.textContent = `"${quote.text}" - ${quote.category}`;
  
    // Append the new quote to the quoteDisplay div
    quoteDisplay.appendChild(quoteParagraph);
  }
  
  // Attach the showRandomQuote function to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Display a random quote when the page first loads
  showRandomQuote();
  
  // Function to create and add a new quote form
  function createAddQuoteForm() {
    // Get the input values
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    // Make sure both fields have input
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the quotes array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear the input fields after adding
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Show the newly added quote immediately
      showRandomQuote();
    } else {
      alert('Please enter both a quote and a category.');
    }
  }
  
  // Dynamically add the new quote to the DOM when the user adds it
  function addQuoteToDOM(quote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
  
    // Create a new paragraph element
    const newQuoteParagraph = document.createElement('p');
    newQuoteParagraph.textContent = `"${quote.text}" - ${quote.category}`;
  
    // Append the new quote to the quoteDisplay div
    quoteDisplay.appendChild(newQuoteParagraph);
  }
  