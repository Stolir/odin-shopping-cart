import { Link } from "react-router"

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to='/store'>Explore Products</Link>
    </div>
  )
}

export default HomePage