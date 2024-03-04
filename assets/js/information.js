import React, { useState, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {Form, Button, InputGroup, DropdownButton} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Question from './question'

export default function Informations() {
    const [player, setPlayer] = useState('');
    const [score, setScore] = useState(0)
    const [attempt, setAttempt] = useState(1)
    const [maxAttempt, setMaxAttempt] = useState(10)
    const [endGame, setEndGame] = useState(false)

    function scoreOne(){
        setScore(score + 1)
    }

    function attemptOne() {
        setAttempt(attempt + 1)
        if (attempt >= maxAttempt)  {
            setEndGame(true);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const playerName = event.target.elements.playerName.value;
        const max = event.target.elements.maxAttempt.value;
        console.log(max, playerName)

        setPlayer(playerName);
        setMaxAttempt(max)
    }

    function handleReset() {
        setAttempt(1);
        setScore(0);
        setEndGame(false);
    }


    if (player && !endGame) {
        return (
            <>
                <nav>
                    Quiz Kaamelott - Question n°{attempt} / {maxAttempt} - {player}
                </nav>
                <Question
                    incrementScore={scoreOne}
                    incrementAttempt={attemptOne}
                />
            </>
        );
    }

    if (endGame) {
        const percentage = Math.round((score / maxAttempt) * 100);

        let message;
        switch (true) {
            case percentage === 100:
                message = `Félicitations ${player}, c'est un sans faute ${score}/${maxAttempt} tu es un vrais fan de Kaamelott !`;
                break;
            case percentage >= 70:
                message = `Bravo ${player}, avec tes ${score} points, tu connais plutôt bien Kaamelott, un sans fautes pour la prochaine ?`;
                break;
            case percentage >= 50:
                message = `Pas mal ${player}, avec tes ${score} points on peux dire que tu connais un peu Kaamelott, mais tu peux faire mieux !`;
                break;
            default:
                message = `Dommage ${player}, avec tes ${score} points, tu as gagné le droit d\'aller réviser !`;
                break;
        }
        return (
            <>
                <nav>
                    Quiz Kaamelott
                </nav>
                <div id="bg">
                    <div id="results" className="text-3xl flex flex-col justify-center">
                        {message}
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
                <div className="flex justify-center">
                    <div className="w-100 h-32 text-3xl backdrop-blur-sm bg-white/30 rounded-full flex px-3">
                        <h1 className="text-black self-center leading-normal">Bienvenue sur le quiz des répliques
                            Kaamelott</h1>
                    </div>
                </div>
                <div id="bg">
                    <div id="informations">
                        <h1 className="text-3xl">Bienvenue à toi jeune fan de Kaamelott, dis nous qui tu es ?</h1>
                        <Form onSubmit={handleSubmit} className="mt-10">
                            <InputGroup className="mb-3">
                                <Form.Group className="mb-3 text-3xl flex justify-center items-center font-sans">
                                    <Form.Control className="h-12 w-72 px-6 border" name="playerName" placeholder="Pseudo" type="text"/>
                                    <Form.Select className="text-2xl h-12 bg-white border px-6" name="maxAttempt">
                                        <option value="10">10 questions</option>
                                        <option value="20">20 questions</option>
                                        <option value="30">30 questions</option>
                                    </Form.Select>
                                    <Button className="text-2xl h-12 bg-white border px-4" type="submit">
                                        Lancer le quiz
                                    </Button>
                                </Form.Group>
                            </InputGroup>
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
