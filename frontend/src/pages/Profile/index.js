import React, { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';


export default function Profile() {
    const history = useHistory();
    
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    
    
    useEffect(() => { 
        api.get('profile', {
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    //Deletar Casos
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId,
            }
            });  
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err){alert('Erro ao deletar caso');}
    }

    //Finalizar Sessão
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    //Exibição basica dos casos, botões e objetos da tela
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg}  alt='Be The Hero' />
                <span>Bem-vinda {ongName}</span>

                <Link className="button" to="/incident/new">Cadastrar novo Caso</Link>
                <button onClick={handleLogout}type='button'>
                <FiPower size={18} color= "#e02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id) }type='button'>
                        <FiTrash2 size={20} color='#a8a8b3'/>
                    </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}