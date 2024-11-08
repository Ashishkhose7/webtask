import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
    const data = useSelector((state) => state.webstore.data);
    console.log(data);
    
    return (
    <div>
      This is a simple home page {data}
    </div>
  )
}

export default Home
