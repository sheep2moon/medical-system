import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './common/Theme';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import RequireAuth from './common/RequireAuth';
import RequireDoctor from './common/RequireDoctor';
import DoctorDashboard from './pages/DoctorDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navigation />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route exact path='/profile' element={<Profile />} />
          </Route>
          <Route element={<RequireDoctor />}>
            <Route exact path='/dashboard' element={<DoctorDashboard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
