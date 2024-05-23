import './Products.css';
import {AddToCartIcon} from "./Icons.jsx";

export function Products({products}) {
    return (
        <main className={'products'}>
            <ul>
                {
                    products.slice(0, 10).map((product) => {
                        return (
                            <li key={product.id}>
                                <img src={product.thumbnail} alt={`${product.title} thumbnail`}/>
                                <div>
                                    <strong>{product.title}</strong> - <span>${product.price}</span>
                                </div>
                                <div>
                                    <button>
                                        <AddToCartIcon/>
                                    </button>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </main>
    );
}
