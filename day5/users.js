// Global state
let users = [];

// DOM Elements
const loadUsersBtn = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const usersList = document.getElementById("users-list");
const statusMessage = document.getElementById("status-message");

// 1. Render Users Array
function renderUsers(list) {
    usersList.textContent = ""; // Clear existing cards

    if (list.length === 0) {
        statusMessage.textContent = "No users match your filter.";
        return;
    }

    // Clear status text when showing valid results
    statusMessage.textContent = "";

    list.forEach(user => {
        const card = document.createElement("li");
        card.className = "user-card";

        const name = document.createElement("h3");
        name.textContent = user.name;

        const username = document.createElement("p");
        username.textContent = `@${user.username}`;

        const email = document.createElement("p");
        email.textContent = `📧 ${user.email}`;

        // Added city requirement from review
        const city = document.createElement("p");
        city.textContent = `📍 City: ${user.address ? user.address.city : "N/A"}`;

        const company = document.createElement("p");
        company.textContent = `🏢 ${user.company ? user.company.name : "N/A"}`;

        card.appendChild(name);
        card.appendChild(username);
        card.appendChild(email);
        card.appendChild(city);
        card.appendChild(company);

        usersList.appendChild(card);
    });
}

// 2. Fetch Users on Button Click
async function loadUsers() {
    //const url = "https://jsonplaceholder.typicode.com/users-broken"; // Intentionally broken URL for testing error handling
    const url = "https://jsonplaceholder.typicode.com/users"; // Correct URL for actual data fetching
    // UI state: disable button & show loading state in single status paragraph
    loadUsersBtn.disabled = true;
    statusMessage.textContent = "Loading user data...";
    usersList.textContent = "";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error("Failed to load users:", error);
        statusMessage.textContent = "Failed to load user data. Please check your internet connection or try again later.";
    } finally {
        // Re-enable button regardless of outcome
        loadUsersBtn.disabled = false;
    }
}

// 3. Filter Event Listener
filterInput.addEventListener("input", () => {
    const searchTerm = filterInput.value.toLowerCase().trim();
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );
    renderUsers(filteredUsers);
});

// 4. Attach Click Event Listener (No automatic call on page load)
loadUsersBtn.addEventListener("click", loadUsers);