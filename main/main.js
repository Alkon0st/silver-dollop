const readline = require("readline");

const flavorMap = {
  "garlic,tomato,basil": "classic Italian pasta sauce 🍝",
  "chicken,curry,yogurt": "Indian-style chicken curry 🍛",
  "beef,onion,pepper": "Stir-fry with a kick 🥡",
  "potato,butter,cream": "mashed potatoes heaven 🥔",
  "garlic,butter,shrimp": "garlic butter shrimp 🍤",
};

function askQuestion(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
    return new Promise(resolve => rl.question(prompt, answer => {
        rl.close();
        resolve(answer);
    }));
}



console.log("Welcome to the Ingredient Combiner! 🍽️\n");

async function askForIngredients() {
    while (true) {
        console.log("\x1b[0m","")
        const input = await askQuestion("What ingredients are you using?\n");

        if (input.toLowerCase() ==="exit"){
            console.log("Goodbye! 👋");
            process.exit(0);
        }

        const cleaned = input
            .split(',') // Split the string into an array of ingredients
            .map(i => i.trim().toLowerCase()) // Trim whitespace and convert to lowercase
            .sort() // sort the array to ensure consistent order
        
        // Object.entries() static method returns an awway of a given object's own
        // enumerable string-keyed property key-value pairs.
        const matches = Object.entries(flavorMap).filter(([key, description]) => {
            const keyIngredients = key.split(','); // split flavorMap key into an array of ingredients
            return cleaned.every(f => keyIngredients.includes(f))
        })
        // console.log(matches);

        // If there are matches, return the first match description
        // Otherwise, return a default message
        const dish = matches.length > 0
        ? matches[0][1] 
        :  "Hmm... that's an interesting combo. Maybe you're inventing something new? 🍳";
        console.log("\x1b[33m%s\x1b[0", "\n> " + dish);
    };
}

askForIngredients(); // Call the function to start the program


