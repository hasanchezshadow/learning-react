import {useContext} from "react";
import {FiltersContext} from "../context/filters.jsx";

export function useFilter() {
    // 3. Using the context
    const {filters, setFilters} = useContext(FiltersContext);
    const filterProducts = (products) => {
        return products.filter((product) => {
            return (
                product.price >= filters.minPrice && (
                    filters.category === 'all' ||
                    product.category === filters.category
                )
            );
        });
    }
    return {filters, setFilters, filterProducts};
}
