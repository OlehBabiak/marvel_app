import "./charInfo.scss";
import MarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({ selectedCharId }) => {
  const [characterInfo, setCharacterInfo] = useState(null);
  const [characterComics, setCharacterComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const content = !(loading || error || !characterInfo) ? (
    <View char={characterInfo} characterComics={characterComics} />
  ) : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const skeleton = error || !selectedCharId ? <Skeleton /> : null;
  const marvelService = new MarvelService();

  function loadChars() {
    if (!selectedCharId) {
      return;
    }
    onCharLoading();
    marvelService
      .getCharacter(selectedCharId)
      .then(onCharLoaded)
      .catch(onError);
  }

  function onCharLoaded(char) {
    setCharacterInfo(char);
    setCharacterComics(char.comics);
    setLoading(false);

    onback.app = 0;
  }

  function onCharLoading() {
    setLoading(true);
  }

  function onError() {
    setLoading(false);
    setError(true);
  }

  useEffect(() => {
    loadChars();
  }, [selectedCharId]);

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char, characterComics }) => {
  const { name, description, thumbnail } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  const initDescValue = "No any description";
  const character = renderComics(characterComics);

  function renderComics(arr) {
    const items = arr.splice(0, 10).map((item, i) => {
      return (
        <li className="char__comics-item" key={i}>
          {item.name}
        </li>
      );
    });
    return (
      <ul className="char__comics-list">
        {items.length === 0 ? "No any comics" : items}
      </ul>
    );
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href="#" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href="#" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description ? description : initDescValue}
      </div>
      <div className="char__comics">Comics:</div>
      {character}
    </>
  );
};

export default CharInfo;
