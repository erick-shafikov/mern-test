import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './context/authContext';
import { NavBar } from './components/navbar';
import 'materialize-css';
import { Loader } from './components/Loader';

function App() {
  const {token, login, logout, ready} = useAuth();
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{token, login, logout, isAuthenticated}}>
      <BrowserRouter>
      {isAuthenticated && <NavBar />}
        <div className='container'>
          {routes}
        </div> 
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
