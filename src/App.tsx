import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar"
import { useAppDispatch } from "./store/hooks"
import { setBoards, setTheme } from "./store/appSlice"
import BoardPage from "./pages/BoardPage"
import Home from "./pages/Home"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setBoards())
    const LCTheme = !!localStorage.getItem('theme')
    if (LCTheme) {
      dispatch(setTheme(true))
    }
  }, [])

  return (
    <div className="app">
      <Sidebar />
      <div className="app_section">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/:slug" element={<BoardPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
