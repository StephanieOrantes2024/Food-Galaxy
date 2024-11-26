import React, { useState, useEffect } from "react";
import { Carousel } from "./Carousel";
import { RecipeCard } from "./RecipeCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export function Recipes() {
    const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
    const [allDishes, setAllDishes] = useState([]); // Todos los platillos
    const [filteredDishes, setFilteredDishes] = useState([]); // Platillos filtrados
    const [searchHistory, setSearchHistory] = useState([]); // Historial de búsqueda

    // Cargar todos los platillos al cargar la aplicación
    useEffect(() => {
        const fetchAllDishes = async () => {
            try {
                const response = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/search.php?s="
                );
                const data = await response.json();
                if (data.meals) {
                    setAllDishes(data.meals); // Guardar todos los platillos
                    setFilteredDishes(data.meals); // Mostrar todos inicialmente
                }
            } catch (error) {
                console.error("Error al cargar los platillos:", error);
            }
        };

        fetchAllDishes();
    }, []);

    // Manejar búsqueda y filtrado
    const handleSearch = (e) => {
        e.preventDefault();

        // Si el campo de búsqueda está vacío, mostrar todos los platillos
        if (searchTerm.trim() === "") {
            setFilteredDishes(allDishes);
        } else {
            const results = allDishes.filter((dish) =>
                dish.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDishes(results); // Mostrar resultados filtrados

            // Agregar al historial si coincide un platillo
            if (results.length > 0) {
                setSearchHistory((prevHistory) => [
                    ...prevHistory,
                    ...results.filter(
                        (dish) => !prevHistory.some((item) => item.idMeal === dish.idMeal)
                    ),
                ]);
            }
        }

        // Limpiar el campo de búsqueda
        setSearchTerm("");
    };

    // Mostrar todos los platillos al hacer clic en la barra de búsqueda
    const handleFocus = () => {
        setFilteredDishes(allDishes); // Mostrar todos los platillos
    };

    // Actualizar los resultados al escribir en tiempo real
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Mostrar todos los platillos si el campo está vacío
        if (value.trim() === "") {
            setFilteredDishes(allDishes);
        }
    };

    return (
        <div className="app-container">
            {/* Barra de búsqueda */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Buscar platillo..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleFocus} // Mostrar todos los platillos al hacer clic
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Buscar
                </button>
            </form>

            {/* Resultados */}
            <div className="search-results">
                {filteredDishes.length > 0 ? (
                    filteredDishes.map((dish) => (
                        <RecipeCard key={dish.idMeal} recipe={dish} />
                    ))
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </div>

            {/* Carrusel del historial */}
            <Carousel searchHistory={searchHistory} />
        </div>
    );
};