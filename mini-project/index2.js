document.getElementById("calculate-button").addEventListener("click", calculateNutrition);

async function calculateNutrition() {
    const ingredientList = document.getElementById("ingredient-list").value.split('\n');
    const apiKey = 'ZEsZTFQM1mlPc7xaCXlKItGAj4hR9tkDsLg3yDvw'; // Replace with your USDA API key

    if (!apiKey) {
        alert('Please provide your USDA API key.');
        return;
    }

    const nutritionInfo = document.getElementById("nutrition-info");
    nutritionInfo.innerHTML = ""; // Clear previous results

    for (const ingredient of ingredientList) {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&api_key=${apiKey}`);
        const data = await response.json();

        if (data.foods && data.foods.length > 0) {
            const food = data.foods[0];
            const foodName = food.description;
            const calories = food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value;
            const protein = food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein').value;
            const fat = food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)').value;
            const carbs = food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference').value;

            // Display the nutritional data for the ingredient
            nutritionInfo.innerHTML += `
                <h3>${foodName}</h3>
                <p>Calories: ${calories} kcal</p>
                <p>Protein: ${protein} g</p>
                <p>Fat: ${fat} g</p>
                <p>Carbohydrates: ${carbs} g</p>
                <hr>
            `;
        } else {
            nutritionInfo.innerHTML += `<p>Nutritional information not found for ${ingredient}</p>`;
        }
    }
}
