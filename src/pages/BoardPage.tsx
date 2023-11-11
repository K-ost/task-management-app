import { useParams } from "react-router-dom"
import Board from "../components/Board"

const BoardPage: React.FC = () => {
  const { slug } = useParams()
  
  return (
    <Board slug={slug!} />
  )
}

export default BoardPage
