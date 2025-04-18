// On form submission (index.html)
if (document.getElementById("nutritionForm")) {
  document
    .getElementById("nutritionForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        activity: document.getElementById("activity").value,
      };

      // Store data in localStorage
      localStorage.setItem("userProfile", JSON.stringify(data));

      // Create URL search parameters for passing to results page
      const params = new URLSearchParams(data);
      window.location.href = `results.html?${params.toString()}`; // Redirect to results page with query string
    });
}

// On results.html (when the user lands on the result page)
if (window.location.pathname.includes("results.html")) {
  const params = new URLSearchParams(window.location.search);

  // Retrieve data from the URL query string
  const name = params.get("name");
  const age = parseInt(params.get("age"));
  const gender = params.get("gender");
  const height = parseFloat(params.get("height"));
  const weight = parseFloat(params.get("weight"));
  const activity = parseFloat(params.get("activity"));

  // Check if all parameters are available
  if (name && age && gender && height && weight && activity) {
    // BMR calculation using the Harris-Benedict equation
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    // Calorie requirement based on activity level
    const calories = bmr * activity;

    // Macronutrient calculation
    const protein = (weight * 1.6).toFixed(1); // Recommended protein intake in grams
    const fats = ((calories * 0.25) / 9).toFixed(1); // Fats as 25% of total calories, converted to grams
    const carbs = ((calories - (protein * 4 + fats * 9)) / 4).toFixed(1); // Remaining calories from carbs, converted to grams

    // Show the result section
    document.getElementById("results").classList.remove("hidden");

    // Update the displayed values
    document.getElementById("displayName").textContent = name;
    document.getElementById("bmr").textContent = bmr.toFixed(2); // Display BMR value
    document.getElementById("calories").textContent = calories.toFixed(2); // Display calories needed
    document.getElementById("protein").textContent = protein; // Display protein
    document.getElementById("fats").textContent = fats; // Display fats
    document.getElementById("carbs").textContent = carbs; // Display carbs

    // Suggested food items
    const foodItems = [
      "Chicken breast (for protein)",
      "Broccoli (for fiber and vitamins)",
      "Sweet potatoes (for carbs)",
      "Avocados (for healthy fats)",
      "Almonds (for healthy fats and protein)",
    ];

    // Generate the list of food suggestions
    const foodList = document.getElementById("foodList");
    foodList.innerHTML = ""; // Clear any previous content
    foodItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      foodList.appendChild(li);
    });
  } else {
    alert(
      "Invalid data passed to the results page. Please go back and try again."
    );
  }

  // Back button functionality
  document.getElementById("backButton").addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to the home page (index.html)
  });
}
