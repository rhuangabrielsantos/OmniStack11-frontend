import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

import './styles.css';

function Logon () {
    const [id, setId] = useState();

    const history = useHistory();

    async function handleLogon(event) {
        event.preventDefault();
        
        try {
            const response = await api.post('session', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Erro ao fazer logon, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be the Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho Cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}

export default Logon;