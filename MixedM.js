// Read and parse the JSON files
console.error()
async function getRandomMessage() {
    try {
        // Fetch all JSON files
        const [data1, data2, data3] = await Promise.all([
            fetch("Bank1.json").then(res => res.json()),
            fetch("Bank2.json").then(res => res.json()),
            fetch("Bank3.json").then(res => res.json())
        ]);

        // Pick a random index
        const randomIndex = Math.floor(Math.random() * data1.questions.length);

        // Create a flashcard
        return {
            questions: [
                data1.questions[randomIndex],
                data2.questions[randomIndex],
                data3.questions[randomIndex]
            ],
            answers: [
                data1.answers[randomIndex],
                data2.answers[randomIndex],
                data3.answers[randomIndex]
            ]
        };
    } catch (error) {
        console.error("Error loading JSON:", error);
        return { questions: [], answers: [] };
    }
}

// Function to create and display the flashcard
function createFlashcardElement(card) {
    let flashcardContainer = document.querySelector(".flashcardContainer");
    
    let flashcard = document.createElement("div");
    flashcard.classList.add("flashcard");

    let questionList = document.createElement("ul");
    card.questions.forEach(question => {
        let li = document.createElement("li");
        li.textContent = question;
        questionList.appendChild(li);
    });

    let answerList = document.createElement("ul");
    card.answers.forEach(answer => {
        let li = document.createElement("li");
        li.textContent = answer;
        answerList.appendChild(li);
    });

    let toggleButton = document.createElement("button");
    toggleButton.textContent = "Show/Hide Answers";
    toggleButton.addEventListener("click", function () {
        answerList.classList.toggle("hidden");
    });

    flashcard.appendChild(questionList);
    flashcard.appendChild(toggleButton);
    flashcard.appendChild(answerList);
    flashcardContainer.appendChild(flashcard);
}

// Ensure the DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showFlashcardButton").addEventListener("click", async function() {
        let newCard = await getRandomMessage();
        createFlashcardElement(newCard);
    });
});
console.error()