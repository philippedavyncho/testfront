import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";


import {useState, useEffect} from "react"

import axios from "axios"

import {useCart} from "react-use-cart"

import { toast } from 'react-toastify';


import { useOrderContext } from './OrderContext';


import './Order.css'



export default function Order({closeModal}){
    
        //state (état ou données)
    
    const [nom, setNom] = useState("")
    const [phone, setPhone] = useState(null)
    
    
    const {items,cartTotal, emptyCart} = useCart()
    

    const { setOrderSuccess } = useOrderContext();
    
    //sauvegarde des items 
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    }, [items]);
    
    
    //comportements
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        
        
        for(let i=0 ; i<items.length; i++){
            
            axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/api/cd/orders/',
              data: {
                "nom": nom,
                
                "phone": phone,
                
                "quantity": JSON.stringify(items[i].quantity),
                
                "produit": JSON.stringify(items[i].id)
              },
            })
            
            .then(response => {
              // La commande a été passée avec succès, vider le panier
              emptyCart();
              
            
            })
            
            .catch(error => {
              console.log(error);
            });
        }
        
        toast.success("Commande prise en compte. Livraison dans un delai de 24h. Merci!",  { autoClose: 10000 }) ;
        
        setNom("")
        setPhone("")
        
        //alert("commande passé avec succès")
        
        closeModal();
        
        //navigate('/')
        
        setTimeout(() => {
            window.location.reload();
        }, 10000);
        
        setOrderSuccess(true);
        
        
        localStorage.setItem('orderSuccess', 'true');
        
    }
    
    
    
    const handleChange = (e)=>{
        setNom(e.target.value)
    }
    
    const handleOnChange = (e)=>{
        setPhone(e.target.value)
    }
    
    return(
        <>
            <div>
                <div className="enteteOrder">
                  <IconCreditCard2Front className="IconCreditCard2Front" /><p className="OrderTitle">Formulaire De Commande</p>
                <button className="modal-close" onClick={closeModal}>
                    X
                </button>
                </div>
                <form onSubmit={handleSubmit} className="FORM">
                    
                      <input
                        value={nom}
                        type="text"
                        className="inputOrder"
                        placeholder="Nom"
                        onChange={handleChange}
                       required="true"/>
                    
                      <input
                        value={phone}
                        type="number"
                        className="inputOrder"
                        placeholder="Numéro de Téléphone"
                        onChange={handleOnChange}
                       required="true"/>

                  <button type="submit" className="btn-order">
                    commander
                  </button>
                </form>
                
              </div>
            
              <div className="FACTURES">
                <div className="Ordertete">
                  <IconCart3 className="i-va" />
                  <span className="ms-3">MA COMMANDE</span>
                </div>
                <div className="CMDBODY">
                {items.map((item,index)=>{
                        return(
                <div className="orderGroup" key={index}>
                    <div>
                      {item.name}
                    </div>
                    <div>{item.price*item.quantity} FCFA</div>
                 
                </div>)
                })}
                <div className="orderTotal">
                    <span>Total: </span>
                    <strong>{cartTotal} FCFA</strong>
                </div>
                </div>
              </div>
              <div className="tricherOrder">
               <button className="FERMETURE" onClick={closeModal}>
                    annuler la commande
               </button>
              </div>
        </>
    )
}