import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../store/hooks"

const Home: React.FC = () => {
  const boards = useAppSelector(state => state.app.boards)
  const navigate = useNavigate()

  useEffect(() => {
    if (boards.length) {
      navigate(`/${boards[0].slug}`)
    }
  }, [boards])

  return null
}

export default Home
