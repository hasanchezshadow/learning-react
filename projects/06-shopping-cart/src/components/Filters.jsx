import './Filters.css';
import {useId} from "react";
import {useFilter} from "../hooks/useFilter.js";

export function Filters() {
    // 3. Using the context
    const {filters, setFilters} = useFilter();

    const minPriceFilterId = useId();
    const categoryFilterId = useId();


    const handleChangeMinPrice = (event) => {
        const newMinPrice = event.target.value;
        setFilters((prevState) => ({
            ...prevState,
            minPrice: newMinPrice
        }));
    }
    const handleChangeCategory = (event) => {
        const newCategory = event.target.value;
        setFilters((prevState) => ({
            ...prevState,
            category: newCategory
        }));
    }

    return (
        <section className={'filters'}>
            <div>
                <label htmlFor={minPriceFilterId}>Price from:</label>
                <input
                    type="range"
                    id={minPriceFilterId}
                    min={0}
                    max={1000}
                    value={filters.minPrice}
                    onChange={handleChangeMinPrice}
                />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Category:</label>
                <select name="category" id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">All</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Smartphones</option>
                </select>
            </div>
        </section>
    )
}
