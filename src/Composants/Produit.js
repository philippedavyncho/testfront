import "./Produit.css"
import {useCart} from "react-use-cart";
import { toast } from 'react-toastify';
import {Link} from "react-router-dom"

function formatAmountWithSeparators(amount) {
  return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}



export default function Produit({name, price, image, item, id}){
    
    const {addItem} = useCart()
    
    return(
        <div className="card">
            <div className="livraison">
                <p>{name}</p>
            </div>
            <div className="cardImage">
                <Link to={`/${id}`}>
                    <img src={image} alt={name} loading="lazy"/>
                </Link>
            </div>
            <p className="prix">{formatAmountWithSeparators(price)} FCFA</p>
            <div 
                className="Add"
                onClick={() => {
                          addItem(item);
                          toast.info("Un article a été ajouter aux panier");
                        }}
            >AJOUTER AU PANIER</div>
        </div>
            
    )
    
}