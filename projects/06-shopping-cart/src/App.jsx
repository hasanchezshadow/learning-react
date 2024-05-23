import {Products} from './components/Products.jsx';
import {products as initialProducts} from './mocks/products.json'
import {useState} from "react";
import {Header} from "./components/Header.jsx";
import {useFilter} from "./hooks/useFilter.js";
import {Footer} from "./components/Footer.jsx";
import {IS_DEVELOPMENT} from "./config.js";

function App() {
    const [products, setProducts] = useState(initialProducts);
    const {filterProducts, setFilters, filters} = useFilter();

    const filteredProducts = filterProducts(products);

    return (
        <>
            <Header changeFilters={setFilters}/>
            <h1>Shopping cart 🛒</h1>
            <Products products={filteredProducts}></Products>
            {IS_DEVELOPMENT && <Footer filters={filters}/>}
        </>
    )
}

export default App
