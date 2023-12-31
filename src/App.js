import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page'
import { RQParallelQueriesPage } from './components/RQParallelQueries.page'
import { DynamicParallelQueriesPage } from './components/DynamicParallelQueries.page'
import { DependentQueriesPage } from './components/DependencyQueries.page'
import { PaginatedQueriesPage } from './components/RQPaginatedQueries.page.js'
import { InfiniteQueriesPage } from './components/InfiniteQueries.page'

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
              <li>
                <Link to='/rq-parallel-queries'>RQ Parallel Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/rq-parallel-queries' element={<RQParallelQueriesPage />} />
            <Route path='/dynamic-parallel-queries' element={<DynamicParallelQueriesPage heroIds={[1, 3]} />} />
            <Route path='/rq-dependency' element={<DependentQueriesPage email='afs@example.com' />} />
            <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
            <Route path='/rq-infinite' element={<InfiniteQueriesPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
    </QueryClientProvider>
  )
}

export default App