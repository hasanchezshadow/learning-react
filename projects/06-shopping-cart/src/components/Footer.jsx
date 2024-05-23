import './Footer.css';
import {useFilter} from "../hooks/useFilter.js";
export function Footer() {
    const {filters} = useFilter();
    return (
        <footer className='footer'>
            {
                JSON.stringify(filters, null, 2)
            }
            <h4>Prueba técnica de React ⚛️ － <span> Siguiendo tutorial de @midudev</span></h4>
            <h5>Shopping Cart con useContext & useReducer</h5>
        </footer>
    )
}
