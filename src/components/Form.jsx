import React from 'react'
import { useEffect,useState } from 'react';

const Form = () => {

    const [data, setData] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                console.log("Api data:",data);
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
     
    }, [])
    
  return (
    <div>
        <p>{data?.map((ele,idx)=>{
            return <>
            <span>{idx}</span>
            <h1>{ele.name}</h1>
            </>

        })}</p>
    </div>
  )
}

export default Form