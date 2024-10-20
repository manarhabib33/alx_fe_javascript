let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Fetch quotes from server simulation (JSONPlaceholder API)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();
        // Sync quotes from the server with local storage
        syncQuotesWithServer(serverQuotes);
    } catch (error) {
        console.error("Failed to fetch quotes from server:", error);
    }
}

// Sync local quotes with server quotes
function syncQuotesWithServer(serverQuotes) {
    let hasConflicts = false;

    serverQuotes.forEach(serverQuote => {
        const localQuote = quotes.find(q => q.id === serverQuote.id);
        if (!localQuote) {
            // Add new quote from the server
            quotes.push({
                id: serverQuote.id,
                text: serverQuote.body,
                category: "Server"
            });
        } else if (localQuote.text !== serverQuote.body) {
            // Conflict detected
            hasConflicts = true;
            // Server quote takes precedence in this example
            localQuote.text = serverQuote.body;
        }
    });

    // Update local storage with synced data
    saveQuotes();

    if (hasConflicts) {
        showNotification("Conflicts were found and resolved by using server data.");
    } else {
        showNotification("Quotes synced with server!");
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    displayQuotes();
}

// Add new quote and POST it to the server
async function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    const newQuote = {
        id: quotes.length + 1,  // Simulated ID
        text: newQuoteText,
        category: newQuoteCategory
    };

    // Add the new quote locally first
    quotes.push(newQuote);
    saveQuotes();

    // Clear input fields
    document.getElementById("newQuoteText").value = '';
    document.getElementById("newQuoteCategory").value = '';

    // POST the new quote to the server
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newQuote.text,
                body: newQuote.text,
                userId: 1 // Arbitrary user ID
            })
        });

        if (response.ok) {
            const postedQuote = await response.json();
            console.log("Successfully posted quote:", postedQuote);
            showNotification("New quote successfully posted to server!");
        } else {
            console.error("Failed to post quote to the server:", response.status);
        }
    } catch (error) {
        console.error("Error posting the quote to the server:", error);
    }
}

// Display quotes dynamically
function displayQuotes() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";  // Clear existing content

    quotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.textContent = `${quote.text} - [${quote.category}]`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Show notifications for data updates and conflicts
function showNotification(message) {
    const notificationElement = document.getElementById("notification");
    notificationElement.textContent = message;
    notificationElement.style.display = 'block';

    // Hide notification after 3 seconds
    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, 3000);
}

// Fetch and sync data periodically from the server
setInterval(fetchQuotesFromServer, 30000);  // Fetch every 30 seconds
