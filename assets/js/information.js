import React, { useState, useEffect, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Question from './question'

export default function Informations() {
    const [player, setPlayer] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [score, setScore] = useState(0)
    const [attempt, setAttempt] = useState(0)
    const [maxAttempt, setMaxAttempt] = useState(10)
    const [endGame, setEndGame] = useState(false)


    function scoreOne(){
        setScore(score + 1)
    }

    function attemptOne() {
        setAttempt(attempt + 1)
        if (attempt >= maxAttempt - 1)  {
            setEndGame(true);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const playerName = event.target.elements.playerName.value;
        const max = event.target.elements.maxAttempt.value;
        setPlayer(playerName);
        setMaxAttempt(max)
    }

    function handleReset() {
        setAttempt(0);
        setScore(0);
        setEndGame(false);
    }


    if (player && !endGame) {
        return (
            <>
                <div className="text-end text-white text-2xl mt-4 me-8">
                    <div>Joueur : {player}</div>
                    <div>Score : {score}/{maxAttempt}</div>
                </div>
                <Question
                    incrementScore={scoreOne}
                    incrementAttempt={attemptOne}
                />
            </>
        );
    }

    if (endGame) {
        return (
            <>
                <div id="bg">
                    <div id="results" className="text-3xl flex flex-col justify-center">
                        Bravo {player} tu as atteint le score de {score}/{maxAttempt} !
                        <button onClick={handleReset} className="mt-12">
                            Rejouer ?
                        </button>
                    </div>
                </div>
            </>
        );
    }

    if (player === '') {
        return (
            <>
                <div id="bg">
                    <div id="informations">
                        <h1 className="text-3xl">Bienvenue à toi jeune fan de Kaamelott, dis nous qui tu es ?</h1>
                        <Form onSubmit={handleSubmit} className="mt-10">
                            <Form.Group className="mb-3 text-3xl" controlId="playerName">
                                <Form.Control className="h-12 w-10/12 px-6 font-sans" type="text"/>
                            </Form.Group>
                            <div className="mb-0">Nombre de questions</div>
                            <Form.Select className="font-sans block mx-auto" name="maxAttempt">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </Form.Select>
                            <Button className="bg-yellow-500 hover:bg-yellow-600 px-3 pt-3 mt-8 rounded-full" type="submit">
                                Valider
                            </Button>
                        </Form>
                    </div>
                </div>
            </>
        );
    }
}

const infos = ReactDOM.createRoot(document.querySelector('#game'));
infos.render(
    <StrictMode>
        <Informations/>
    </StrictMode>
);
