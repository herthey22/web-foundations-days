// --- Starting Data ---
let notes = [
    { id: 1, text: "Buy groceries for dinner", category: "personal" },
    { id: 2, text: "Complete Day 3 assignment", category: "study" },
    { id: 3, text: "Schedule team meeting for project review", category: "work" },
    { id: 4, text: "Read two chapters of JavaScript book", category: "study" }
];

// 1. searchNotes(word)
function searchNotes(word) {
    const searchTerm = word.toLowerCase();
    return notes.filter(note => note.text.toLowerCase().includes(searchTerm));
}

// 2. longestNote()
function longestNote() {
    if (notes.length === 0) return null;
    return notes.reduce((longest, current) =>
        current.text.length > longest.text.length ? current : longest
    );
}

// 3. countByCategory()
function countByCategory() {
    const counts = {};
    for (const note of notes) {
        const category = note.category;
        counts[category] = (counts[category] || 0) + 1;
    }
    return counts;
}

// 4. getSummary()
function getSummary() {
    const totalNotes = notes.length;
    const noteWord = totalNotes === 1 ? "note" : "notes";
    const counts = countByCategory();
    const categoriesFormatted = Object.entries(counts)
        .map(([cat, count]) => `${count}${cat}`)
        .join(", ");

    return `${totalNotes} ${noteWord}:${categoriesFormatted}`;
}

// 5. isDuplicate(text)
function isDuplicate(text) {
    const cleanText = text.trim().toLowerCase();
    return notes.some(note => note.text.trim().toLowerCase() === cleanText);
}

// 6. addNote(text, category)
function addNote(text, category) {
    const validCategories = ["personal", "work", "study"];

    if (typeof text !== "string" || text.trim().length === 0 || text.trim().length > 200) {
        console.log("Error: Note text must be between 1 and 200 characters.");
        return false;
    }

    if (isDuplicate(text)) {
        console.log("Error: Duplicate note text detected.");
        return false;
    }

    if (!validCategories.includes(category)) {
        console.log("Error: Category must be one of 'personal', 'work', or 'study'.");
        return false;
    }

    const newNote = {
        id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
        text: text.trim(),
        category: category
    };

    notes.push(newNote);
    return true;
}

// ==========================================
// --- Tests & Expected Results ---
// ==========================================

console.log("--- 1. searchNotes ---");
console.log(searchNotes("book"));
// Expected: Array containing note 4 ("Read two chapters of JavaScript book")
console.log(searchNotes("nonexistentterm"));
// Expected: [] (Empty array)

console.log("\n--- 2. longestNote ---");
console.log(longestNote());
// Expected: Note object with id 3 ("Schedule team meeting for project review")

console.log("\n--- 3. countByCategory ---");
console.log(countByCategory());
// Expected: { personal: 1, study: 2, work: 1 }

console.log("\n--- 4. getSummary ---");
console.log(getSummary());
// Expected: "4 notes: 1 personal, 2 study, 1 work" (or order of object entries)

console.log("\n--- 5. isDuplicate ---");
console.log(isDuplicate("Buy groceries for dinner"));
// Expected: true
console.log(isDuplicate("Take a quick rest"));
// Expected: false

console.log("\n--- 6. addNote ---");
console.log(addNote("Practice coding challenges", "study"));
// Expected: true (logs addition successful)
console.log(addNote("Buy groceries for dinner", "personal"));
// Expected: false (logs duplicate error)
console.log(addNote("Invalid Category Note", "sports"));
// Expected: false (logs invalid category error)