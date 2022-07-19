import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharList = ({ onGetCharInfo }) => {
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const marvelService = new MarvelService();
  const items = renderItems(characterList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  function loadChars() {
    marvelService.getAllCharacters().then(onCharLoaded).catch(onError);
  }

  function onCharLoaded(char) {
    setCharacterList(char);
    setLoading(false);
  }

  function onError() {
    setLoading(false);
    setError(true);
  }

  function renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => onGetCharInfo(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  useEffect(() => {
    loadChars();
  }, []);

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
