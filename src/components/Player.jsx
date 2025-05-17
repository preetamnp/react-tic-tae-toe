import {useState} from "react";

export default function Player({initialName, playerSymbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    function handleOnClick() {
        setIsEditing((isEditing) => !isEditing);
        if(isEditing) {
            onChangeName(playerSymbol, playerName);
        }
    }
    function handlePlayerChange(e) {
        setPlayerName(e.target.value);
    }
    let editablePlayerTag = <span className="player-name">{playerName}</span>;
    if(isEditing) {
        editablePlayerTag = <input type="text" value={playerName}
                                    onChange={handlePlayerChange} />
    }
    return (
        <li className={isActive ? "active" : undefined}>
              <span id="player">
                {editablePlayerTag}
                <span className="player-symbol">{playerSymbol}</span>
              </span>
            <button onClick={handleOnClick} >{isEditing ? "Save" : "Edit" }</button>
        </li>
    );
}