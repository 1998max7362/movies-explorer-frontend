import { useEffect, useState } from "react"
import "./Header.css"
export const Header = () => {
  const [headerExtraClassName, setHeaderExtraClassName] = useState('')
  useEffect(() => {
    if (window.location.pathname==='/'){
      setHeaderExtraClassName('header_is-main-page')
    }
  }, [])
  return <div className={`header ${headerExtraClassName}`} ></div >
}
