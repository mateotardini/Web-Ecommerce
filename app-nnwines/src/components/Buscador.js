import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import styles from "../css/Buscador.module.css";

function Buscador(){
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(window.location.href);
    if(window.location.href === "http://localhost:3000/Products/?search="){
        navigate("?search=" + searchText);
    }
    else{
        navigate("Products/?search=" + searchText);
    }
    };

    
    return(
        <div className={styles.contenedorBuscador}>
            <form onSubmit={handleSubmit}>
                <input className={styles.inputBuscador} 
                    name="ProductName" 
                    placeholder="Nombre de Producto" 
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}>
                </input>
                <input className={styles.inputBuscador} 
                    name="MinPrice" 
                    placeholder="Desde" 
                    type="text">
                </input>
                <input className={styles.inputBuscador} 
                    name="MaxPrice" 
                    placeholder="Hasta" 
                    type="text">
                </input>
                <button class={styles.buttonBuscador} type='submit'>Buscar</button>
            </form>
        </div>
    );
}

export default Buscador;