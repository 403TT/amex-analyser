const keywordGroups = {
	maccas: ["mcdonalds", "maccas"],
	groceries: ["coles", "woolworths", "woolies", "asian mart", "asian groceries"],
	coffee: ["starbucks", "cafe", "coffee"],
	travel: ["uber"],
	car: ["petrol"],
};

const judgyResponses = {
  maccas: [
    "You spent $${amount} at McDonald's? Are you trying to speedrun diabetes?",
    "McDonald's again? At this point, they should name a seat after you."
  ],
  coffee: [
    "Another $${amount} for caffeine? You could've bought a kettle.",
    "You’re not a main character just because you drink coffee."
  ],
  travel: [
    "You spent $${amount} on Uber? Ever heard of walking?",
    "Uber again? Might as well hire a chauffeur at this point."
  ],
  groceries: [
    "Groceries for $${amount}? Did you buy the entire store?",
    "Groceries? Hopefully you didn’t buy just snacks."
  ],
  car: [
    "That’s not fuel — that’s liquid regret.",
    "How much fuel do you need to avoid your responsibilities?",
	"You spent $${amount} just to be stuck in traffic?"
  ],
  generic: [
    "Look, I don't really know what that is...but BAD CHOICE!"
  ]
};

function analyseSpending(text) {
  const amountMatch = text.match(/\$?(\d+(\.\d{1,2})?)/); // Use regex to analyse and extract numbers from text
  const amount = amountMatch ? amountMatch[1] : "??"; // If a number is found, use it - Otherwise just put "??" as a placeholder
  const lowerText = text.toLowerCase(); // Make the text lowercase so it's easier to match keywords

  for (let category in keywordGroups) { // Go through each keyword listed in judgyResponses
	const keywords = keywordGroups[category];
    if (keywords.some(word => lowerText.includes(word))) { // Check if the user's input includes one of those keywords
      const responses = judgyResponses[category]; // Get the list of responses for that keyword
      return responses[Math.floor(Math.random() * responses.length)].replace("${amount}", amount); // Output a random response and replace {amount} with user amount
    }
  }
  const fallback = judgyResponses.generic; // If no keywords matched, use a generic response
  return fallback[Math.floor(Math.random() * fallback.length)]; // Output a random generic response
}

document.getElementById("analyseBtn").addEventListener("click", () => {
  const input = document.getElementById("spendingInput").value.trim();
  const response = analyseSpending(input);
  document.getElementById("response").textContent = response;
});