import Header from "./Header"

interface ILayout {
  children: React.ReactNode
  title: string
}

const Layout: React.FC<ILayout> = ({ children, title }) => {
  return (
    <>
      <Header title={title} />
      <main className="main">
        {children}
      </main>
    </>
  )
}

export default Layout
