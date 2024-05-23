import './Filters.css';
import {useState, useId} from "react";

export function Filters({onChange}) {
    const [minPrice, setMinPrice] = useState(0);
    const minPriceFilterId = useId();
    const categoryFilterId = useId();


    const handleChangeMinPrice = (event) => {
        const newMinPrice = event.target.value;
        setMinPrice(newMinPrice);
        onChange((prevState) => ({
            ...prevState,
            minPrice: newMinPrice
        }));
    }
    const handleChangeCategory = (event) => {
        const newCategory = event.target.value;
        onChange((prevState) => ({
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
                    onChange={handleChangeMinPrice}
                />
                <span>${minPrice}</span>
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
