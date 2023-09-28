import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
const GenreCard = ({ name, Icon, id }) => {
  const navigate = useNavigate();
  return (
    <div className="genre-card" onClick={() => navigate(`/genre/${id}`)}>
      <Icon />
      <h2>{name}</h2>
    </div>
  )
}

export default GenreCard