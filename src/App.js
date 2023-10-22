import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App