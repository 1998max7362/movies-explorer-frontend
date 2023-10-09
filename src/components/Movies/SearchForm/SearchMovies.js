import { useState } from "react"
import "./SearchForm.css"

export const SearchMovies = () => {
  const [error, setError] = useState('')


  return (<form className="search">
    <div className="search__row">
      <input className="search__input" type="text" placeholder="Фильм" required/>
        <button className="link search__button" type="submit">Найти</button>
    </div>
    <div className="search__short-movies-switch">
      <label className="search__switch">
        <input className="search__checkbox" type="checkbox" />
        <span className="search__slider"></span>
      </label>
      <p className="search__short-movies-text">Короткометражки</p>
    </div>
  </form>)
}