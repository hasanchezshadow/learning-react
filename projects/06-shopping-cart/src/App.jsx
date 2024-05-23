import {Products} from './components/Products.jsx';
import {products as initialProducts} from './mocks/products.json';
import {Header} from "./components/Header.jsx";
import {useFilter} from "./hooks/useFilter.js";
import {Footer} from "./components/Footer.jsx";
import {IS_DEVELOPMENT} from "./config.js";

function App() {
    const {filterProducts} = useFilter();
    const filteredProducts = filterProducts(initialProducts);

    return (
        <>
            <Header/>
            <h1>Shopping cart 🛒</h1>
            <Products products={filteredProducts}></Products>
            {IS_DEVELOPMENT && <Footer/>}
        </>
    )
}

export default App
