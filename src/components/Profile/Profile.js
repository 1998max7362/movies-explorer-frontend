import { useState } from "react"
import "./Profile.css"
export const Profile = () => {
  const [readOnly, setReadOnly] = useState(true)

  return <section className="profile">
    <h2 className="text profile__hello">Привет, name!</h2>
    <form className="profile__form">
      <div className="profile__container">
        <p className="text profile__label">Имя</p>
        <input className="profile__input" type="text" value="Крякря"/>
      </div>
      <div className="profile__container">
        <p className="text profile__label">E-mail</p>
        <input className="profile__input" type="text" value="Крякря"/>
      </div>
      <p className="text profile__error"></p>
      {!readOnly&&<button className="link profile__form-button" type="submit">Сохранить</button>}
    </form>
    {readOnly&&<button className="link profile__edit-button" onClick={()=>setReadOnly(false)}>Редактировать</button>}
    {readOnly&&<button className="link profile__sign-off-button">Выйти из аккаунта</button>}
  </section>
}
