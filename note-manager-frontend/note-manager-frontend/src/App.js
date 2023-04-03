
import { Route,Routes } from 'react-router-dom';
import  {LoginPage, RegistrationPage} from "./pages/welcome/Welcome";
import Login from "./pages/login/Login";
import Welcome from "./pages/welcome/Welcome";


function App() {
    return (
        <div >

            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/login' element={<Login/>}/>

            </Routes>

        </div>
    );
}

export default App;
