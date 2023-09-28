import { useNavigate } from "react-router-dom"
import { HomeIcon } from "./icons/Icons"

const Header = () => {
  const navigate = useNavigate()
  return (
    <header>
      <button onClick={() => navigate("/")}>
        <HomeIcon />
      </button>
    </header>
  )
}

export default Header