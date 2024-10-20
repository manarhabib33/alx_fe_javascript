// Load quotes from Local Storage or use default quotes if none exist
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "You miss 100% of the shots you don't take.", category: "Inspiration" }
  ];
  
  // Function to save quotes to Local Storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
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
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the quotes array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Save the updated quotes array to Local Storage
      saveQuotes();
  
      // Display the new quote
      showRandomQuote();
    } else {
      alert('Please enter both a quote and a category.');
    }
  }
  
  // Function to export quotes as a JSON file
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);  // Clean up the URL
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);  // Add imported quotes to the existing array
      saveQuotes();  // Save updated quotes to Local Storage
      alert('Quotes imported successfully!');
      showRandomQuote();  // Display a quote from the updated list
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Optional: Function to save the last viewed quote in Session Storage
  function saveLastViewedQuote(quote) {
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  }
  
  // Optional: Function to load the last viewed quote from Session Storage
  function loadLastViewedQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastQuote) {
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = `"${lastQuote.text}" - ${lastQuote.category}`;
    } else {
      showRandomQuote();  // Load a random quote if no session quote is saved
    }
  }
  
  // Call this function to load the last viewed quote when the page loads
  loadLastViewedQuote();
  