import { useState } from "react"
import "./SearchForm.css"

export const SearchMovies = () => {
  const [error, setError] = useState('')


  return (<form className="search">
    <div className="search__row">
      <input className="search__input" type="text" placeholder="Фильм"/>
        <button className="search__button" type="submit">Найти</button>
    </div>
    <div className="search-form__short-movies-switch">
      <label className="search-form__switch">
        <input className="search-form__checkbox" type="checkbox" />
        <span className="search-form__slider"></span>
      </label>
      <p className="search-form__short-movies-text">Короткометражки</p>
    </div>
  </form>)
}