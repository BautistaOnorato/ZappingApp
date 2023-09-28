import GenreCard from "../components/GenreCard"
import { genres } from "../db"

const Home = () => {
  return (
    <div className="home">
      <h1>Generos</h1>
      <section className="genres">
        {
          genres.map(genre => (
            <GenreCard name={genre.name} Icon={genre.icon} key={genre.id} id={genre.id} />
          ))
        }
      </section>
    </div>
  )
}

export default Home