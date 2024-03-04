import React, { useState, StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {Form, Button, InputGroup} from "react-bootstrap";
import Question from './question'

export default function Informations() {
    const [player, setPlayer] = useState('');
    const [score, setScore] = useState(0)
    const [attempt, setAttempt] = useState(1)
    const [maxAttempt, setMaxAttempt] = useState(10)
    const [endGame, setEndGame] = useState(false)
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [totalTime, setTotalTime] = useState('')

    function scoreOne(){
        setScore(score + 1)
    }

    function attemptOne() {
        setAttempt(attempt + 1)
        if (attempt >= maxAttempt)  {
            setEndGame(true);
            stopTimer()
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const playerName = event.target.elements.playerName.value;
        const max = event.target.elements.maxAttempt.value;
        startTimer();
        setPlayer(playerName);
        setMaxAttempt(max)
    }

    function handleReset() {
        setAttempt(1);
        setScore(0);
        setEndGame(false);
        setStartTime(null);
        setEndTime(null);
        startTimer();
    }

    function startTimer() {
        setStartTime(Date.now());
    }

    function stopTimer() {
        setEndTime(Date.now());
    }

    useEffect(() => {
        if (endTime && startTime) {
            const elapsedTime = endTime - startTime;
            const elapsedSeconds = Math.floor(elapsedTime / 1000);
            let formattedTime;
            if (elapsedSeconds >= 60) {
                const minutes = Math.floor(elapsedSeconds / 60);
                const seconds = elapsedSeconds % 60;
                formattedTime = `${minutes} min ${seconds} sec`;
            } else {
                formattedTime = `${elapsedSeconds} sec`;
            }

            setTotalTime(formattedTime);
        }
    }, [endTime, startTime]);

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
                message = `Félicitations ${player}, c'est un sans faute ${score}/${maxAttempt} en ${totalTime} tu es un vrais fan de Kaamelott !`;
                break;
            case percentage >= 70:
                message = `Bravo ${player}, avec tes ${score} points en ${totalTime}, tu connais plutôt bien Kaamelott, un sans fautes pour la prochaine ?`;
                break;
            case percentage >= 50:
                message = `Pas mal ${player}, avec tes ${score} points en ${totalTime} on peux dire que tu connais un peu Kaamelott, mais tu peux faire mieux !`;
                break;
            default:
                message = `Dommage ${player}, avec tes ${score} points en ${totalTime}, tu as gagné le droit d\'aller réviser !`;
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
                <div className="py-8">
                    <div className="flex justify-center">
                        <div className="w-100 h-32 text-3xl backdrop-blur-sm bg-white/30 rounded-full flex px-3">
                            <h1 className="text-black self-center leading-normal">Bienvenue sur le quiz des répliques
                                Kaamelott</h1>
                        </div>
                    </div>
                </div>
                <div id="bg">
                    <div id="informations">
                        <h1 className="text-3xl">Bienvenue à toi jeune fan de Kaamelott, dis nous qui tu es ?</h1>
                        <Form onSubmit={handleSubmit} className="mt-10">
                            <InputGroup className="mb-3">
                            <Form.Group className="mb-3 text-3xl flex justify-center items-center flex-wrap font-sans">
                                    <Form.Control className="h-12 w-72 px-6 border" name="playerName" placeholder="Pseudo" type="text"/>
                                    <Form.Select className="text-2xl w-72 h-12 bg-white border px-6" name="maxAttempt">
                                        <option value="10">10 questions</option>
                                        <option value="20">20 questions</option>
                                        <option value="30">30 questions</option>
                                    </Form.Select>
                                    <Button className="text-2xl w-72 h-12 bg-white border px-4" type="submit">
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
