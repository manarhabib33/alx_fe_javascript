// Load quotes from Local Storage or use default quotes if none exist
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "You miss 100% of the shots you don't take.", category: "Inspiration" }
  ];
  
  // Load last selected filter from Local Storage
  let lastSelectedFilter = localStorage.getItem('selectedCategory') || 'all';
  
  // Function to save quotes to Local Storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to display filtered quotes
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Save selected category to Local Storage
    localStorage.setItem('selectedCategory', selectedCategory);
  
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    // Display the filtered quotes
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear the previous quotes
  
    filteredQuotes.forEach(quote => {
      const quoteParagraph = document.createElement('p');
      quoteParagraph.textContent = `"${quote.text}" - ${quote.category}`;
      quoteDisplay.appendChild(quoteParagraph);
    });
  }
  
  // Function to populate the category dropdown dynamically
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Clear previous options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Set the last selected filter as the default value
    categoryFilter.value = lastSelectedFilter;
  }
  
  // Function to add a new quote and update categories dynamically
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
  
      // Update categories and display the filtered quotes
      populateCategories();
      filterQuotes();
    } else {
      alert('Please enter both a quote and a category.');
    }
  }
  
  // Attach the filterQuotes function to the filter dropdown
  document.getElementById('categoryFilter').addEventListener('change', filterQuotes);
  
  // Populate the categories and display the initial quotes when the page loads
  populateCategories();
  filterQuotes();
  