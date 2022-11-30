import Login from './components/account/Login'
import './App.css';
import DataProvider from './context/DataProvider.jsx';
//import Home from './components/home/homepage.jsx';
import store from './redux_store/store';
import { Provider } from 'react-redux';
function App() {
  return ( 
    <div style={{marginTop: 25}} >
    <Provider store={store}>
      <DataProvider>
      <Login/>   
       </DataProvider>
    </Provider>

    </div>
   );
    
}

 
export default App;
