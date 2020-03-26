import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

//import {FiLogIn} from 'react-icons/fi';
import {FiLogIn } from 'react-icons/fi';

import './styles.css';

//Imagens
import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

//Criação da página de Login
export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id })
//talvez essas duas linhas a baixo devam ser excluidas
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile')
        } catch (err) {
            alert('Falha no login')
        }
    }

    return (
        <div className="logon-counteiner">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
            
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input
                        placeholder=" Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />      
                    <button className='button' classtype="submit">Entrar</button>

                    <Link className="back-link"to="/register">
                        <FiLogIn size={16} color="#E02041"/>   
                        Não tenho Cadastro
                    </Link>
                </form>
            </section>
  
            <img src={herosImg} alt="Heroes"/>
        </div>
    );

}