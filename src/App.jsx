import React, { useState, useEffect } from 'react';
import md5 from 'md5'; // Asegúrate de importar md5
import './App.css';

function App() {
  const [characterData, setCharacterData] = useState([]);
  const [randomCharacter, setRandomCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const publicKey = '160572a5d769d23bf48084e31e715e53';
        const privateKey = 'b371f811d717a3e7301f8228ac94bb2c7230f112';
        const timestamp = new Date().getTime().toString();
        const hash = md5(timestamp + privateKey + publicKey);
        const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();
        setCharacterData(data.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacterData();
  }, []);

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characterData.length);
    setRandomCharacter(characterData[randomIndex]);
  };

  return (
    <div className="container">
      <h1 className='text-red-500' style={{ color: 'rgb(239, 68, 68)' }}>Marvel escoger personaje favorito</h1>

      <div className="character-list">
        {randomCharacter && (
          <div className="character-card">
            <img src={`${randomCharacter.thumbnail.path}/standard_fantastic.${randomCharacter.thumbnail.extension}`} alt={randomCharacter.name} />
            <h2>{randomCharacter.name}</h2>
          </div>
        )}
      </div>
      <button className="green-button" onClick={getRandomCharacter}>Mostrar personaje aleatorio</button>
    </div>
  );
}

export default App;
