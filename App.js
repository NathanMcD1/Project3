import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!name.trim()) {
        setData([]);
        return;
      }
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data.meals);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchMeals();
  }, [name]);
  const handleInputChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div className="App">
      <h1>Recipe Database</h1>
      <input
        type="text"
        placeholder="Search for a meal..."
        value={name}
        onChange={handleInputChange}
      />
      <div>
        {data && data.length > 0 ? (
          data.map((meal) => (
            <div key={meal.idMeal} className="meal-item">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h2>{meal.strMeal}</h2>
              <p>{meal.strInstructions}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <p class="info">
        If you wish to view or download this website's source code, please takea look at <a href="https://github.com/NathanMcD1/Project3" target="_blank">My GitHub Repository.</a>
      </p>
    </div>
  );
}
