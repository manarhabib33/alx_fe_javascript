let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
];

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = quotes[randomIndex].text;
}

// Add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        populateCategories();
        filterQuotes();
    }
}

// Populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes by selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length > 0) {
        quoteDisplay.textContent = filteredQuotes[0].text;
    } else {
        quoteDisplay.textContent = 'No quotes available for this category.';
    }
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Export quotes to a JSON file
function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
}

// Sync Quotes to Server (for manual sync)
function syncToServer() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quotes),  // Send local quotes array to the server
    })
    .then(response => response.json())
    .then(data => {
        console.log('Quotes synced to server:', data);
    })
    .catch(error => {
        console.error('Error syncing to server:', error);
    });
}

// Fetch Quotes from Server (Simulating updates)
function fetchQuotesFromServer() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(serverQuotes => {
            quotes = mergeQuotes(quotes, serverQuotes);
            saveQuotes();
            populateCategories();
            filterQuotes();
        })
        .catch(error => {
            console.error('Error fetching from server:', error);
        });
}

// Merge Local and Server Quotes (handling conflicts)
function mergeQuotes(localQuotes, serverQuotes) {
    const merged = [...localQuotes];

    serverQuotes.forEach(serverQuote => {
        const existingQuote = localQuotes.find(localQuote => localQuote.text === serverQuote.text);

        if (!existingQuote) {
            merged.push(serverQuote);
        } else {
            existingQuote.text = serverQuote.text;
        }
    });

    return merged;
}

// Periodic server check (e.g., every 60 seconds)
setInterval(fetchQuotesFromServer, 60000);  // Updated to fetchQuotesFromServer

// Initialize
populateCategories();
filterQuotes();

