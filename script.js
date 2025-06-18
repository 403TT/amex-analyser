const judgyResponses = {
  mcdonalds: [
    "You spent $${amount} at McDonald's? Are you trying to speedrun diabetes?",
    "McDonald's again? At this point, they should name a seat after you."
  ],
  starbucks: [
    "Another $${amount} for caffeine? You could've bought a kettle.",
    "You’re not a main character just because you drink Starbucks."
  ],
  uber: [
    "You spent $${amount} on Uber? Ever heard of walking?",
    "Uber again? Might as well hire a chauffeur at this point."
  ],
  woolworths: [
    "Groceries for $${amount}? Did you buy the entire store?",
    "Woolworths? Hopefully you didn’t buy just snacks."
  ],
  generic: [
    "You really thought that was a good idea?",
    "Your wallet just cried a little.",
    "Interesting life choices you're making.",
    "I can't even process that... financially or emotionally."
  ]
};

function analyseSpending(text) {
  const amountMatch = text.match(/\$?(\d+(\.\d{1,2})?)/);
  const amount = amountMatch ? amountMatch[1] : "??";
  const lowerText = text.toLowerCase();

  for (let keyword in judgyResponses) {
    if (lowerText.includes(keyword)) {
      const responses = judgyResponses[keyword];
      return responses[Math.floor(Math.random() * responses.length)].replace("${amount}", amount);
    }
  }
  const fallback = judgyResponses.generic;
  return fallback[Math.floor(Math.random() * fallback.length)];
}

document.getElementById("analyseBtn").addEventListener("click", () => {
  const input = document.getElementById("spendingInput").value.trim();
  const response = analyseSpending(input);
  document.getElementById("response").textContent = response;
});