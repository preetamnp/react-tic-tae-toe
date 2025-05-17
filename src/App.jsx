import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
};

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}
function App() {
    const [players, setPlayers] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    let gameBoard = [...initialGameBoard].map((row) => [...row]);
    let winner;
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    for(const combination of WINNING_COMBINATIONS) {
        let firstCombination = gameBoard[combination[0].row][combination[0].column];
        let secondCombination = gameBoard[combination[1].row][combination[1].column];
        let thirdCombination = gameBoard[combination[2].row][combination[2].column];
        if(firstCombination && firstCombination === secondCombination && firstCombination === thirdCombination) {
            winner = players[firstCombination];
        }

    }

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {

            const currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [
                { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    }

    function handleRestart() {
        setGameTurns([]);
    }

    function handleChangePlayerName(symbol, name) {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: name
            }
        })
        console.log("player X" + players.X + " player O " + players.O)

    }
    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player1" onChangeName={handleChangePlayerName} playerSymbol="X" isActive={activePlayer === 'X'}/>
                    <Player initialName="Player2" onChangeName={handleChangePlayerName} playerSymbol="O" isActive={activePlayer === 'O'}/>
                </ol>
                { (winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner} />}
                <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
            </div>
            <Log turns={gameTurns}/>
        </main>
    )
}

export default App
