import React, { useReducer } from 'react';
import  useFetch  from './UseFetch';
import { hnhReducer } from './HnhReducer';

export const HnhContext = React.createContext();

console.log("HnhContext: ");
console.log(HnhContext);

export const HnhStore = (props) => {

    const [hnhs, dispatch] = useReducer(hnhReducer, []);
    
    const setInitData = (initData) => {
      dispatch({type: 'SET_INIT_DATA', payload: initData});
      
    }
    const loading = useFetch(setInitData, 'http://13.124.29.106:8080/hello');
  
    return (
      <HnhContext.Provider value = {{hnhs, dispatch, loading}}>
        {props.children}
      </HnhContext.Provider>
    )
}