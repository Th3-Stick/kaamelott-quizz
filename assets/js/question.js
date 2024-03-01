import React, { useState, useEffect, StrictMode } from 'react';

export default function Question({ incrementScore, incrementAttempt }) {
    const [goodAnswer, setGoodAnswer] = useState('')
    const [answers, setAnswers] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [citation, setCitation] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnswers();
    }, []);

    useEffect(() => {
        if (characters.length > 0) {
            fetchData();
        }
    }, [characters]);

    function fetchAnswers() {
        fetch(`https://kaamelott.reiter.tf/characters`, {
            method: "GET",
            headers: {
                accept: 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            })
            .then((actualData) => {
                setCharacters(actualData);
                setLoading(false);
                setErrorMessage(null);
            })
            .catch((err) => {
                setErrorMessage("Une erreur interne est survenue dans la récupération des personnages");
                setLoading(false);
            });
    };

    const fetchData = () => {
        fetch(`https://kaamelott.reiter.tf/quote/random`, {
            method: "GET",
            headers: {
                accept: 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            })
            .then((actualData) => {
                setCitation(actualData.citation);
                setGoodAnswer(actualData.infos.personnage);
                mixAnswers(actualData.infos.personnage);
                setErrorMessage(null);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage("Une erreur interne est survenue");
                setLoading(false);
            });
    };

    function mixAnswers(valid) {
        if (characters.length < 4) {
            console.error("Le tableau de personnages doit contenir au moins 4 éléments");
            return;
        }
        let mixedCharacters = characters.slice();

        mixedCharacters = mixedCharacters.filter(char => char !== valid);
        mixedCharacters.sort(() => Math.random() - 0.5);
        const randomCharacters = mixedCharacters.slice(0, 3);
        randomCharacters.push(valid);
        randomCharacters.sort(() => Math.random() - 0.5);
        setAnswers(randomCharacters);
    }

    function checkAnswer(event) {
        const playerInput = event.target.textContent;
        if (playerInput === goodAnswer) {
            incrementScore();
        }
        fetchData();
        incrementAttempt();
    }

    if (loading) {
        return (
            <>
                <div className="text-center">
                    <h1 className="text-3xl mt-24">Chargement...</h1>
                </div>
            </>
        );
    }

    if (errorMessage) {
        return (
            <>
                <div className="text-center">
                    <div className="text-3xl mt-24">{errorMessage}</div>
                </div>
            </>
        );
    }

    return (
        <>
            <div id="bg">
                <div id="question" className="text-3xl flex flex-col justify-center h-full">
                    {citation}
                </div>
            </div>
            <div id="answers">
                {answers.map((answer, index) => (
                    <button key={index} onClick={checkAnswer}
                            className="bg-yellow-500 hover:bg-yellow-600 px-3 pb-2 pt-3 rounded-full">
                        {answer}
                    </button>
                ))}
            </div>
        </>
    );
}

