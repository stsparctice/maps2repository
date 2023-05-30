import { useReducer } from 'react';
import Map2 from './components/Map2';
import Map1 from './components/Map1';
import { CenterContext , centerReducer} from './context/map';



function App() {
const [center, setCenter] = useReducer(centerReducer,  {
  lat: 31.7875,
  lng: 34.6635
})
  return <>
    <CenterContext.Provider value={{center, setCenter}}>
      <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
      <Map1 zoom={3}/>
      <Map2 zoom={3} />
      </div>
    </CenterContext.Provider>
  </>
}

export default App;
