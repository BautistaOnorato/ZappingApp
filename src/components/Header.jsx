import { useNavigate } from "react-router-dom"
import { HomeIcon } from "./icons/Icons"

const Header = () => {
  const navigate = useNavigate()
  return (
    <header>
      <img src="https://images.emojiterra.com/google/android-12l/512px/1f37f.png" alt="" />
      <button onClick={() => navigate("/")}>
        <HomeIcon />
      </button>
    </header>
  )
}

export default Header