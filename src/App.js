import './App.css';
import React from 'react'
import Header from './components/header/index';
import Instapost from './components/instagram-post/index';



class App extends React.Component{
  render(){
    return (
      <div className="container">
        <Header />
        <Instapost />
      </div>
    );

  }
}

export default App;
