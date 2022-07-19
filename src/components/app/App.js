import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";

import decoration from "../../resources/img/vision.png";

const App = () => {
  const [selectedCharId, setSelectedCharId] = useState(null);

  function onGetCharInfo(id) {
    setSelectedCharId(id);
  }

  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList onGetCharInfo={onGetCharInfo} />
          <CharInfo selectedCharId={selectedCharId} />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
