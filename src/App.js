import React from 'react';
import ProjectsData from './data/projects.js'
import './stylesheets/style.css';
import flowerPath from './flower.svg';


class App extends React.Component{
  render() {
    return(
      <div id = 'MainContainer'>
        <LeftColumn/>
        <Projects/>
      </div>
    )
  }
}

class LeftColumn extends React.Component{
  render(){
    return(
      <div id = 'LeftColumn'>
        <div id ='myPhoto'>
        </div>
        <h1 id = 'aboutMe'>
          Привет! Меня зовут Костя Остроухов, я проектирую, рендерю и кодю для web будущего
        </h1>
        <h4 id ='Contacts'>
          950-64-99-204
          totsamuion@yandex.ru
          <a href = 'https://t.me/Kostya_Ostro'>TELEGRAM</a>
          <a href = 'https://www.facebook.com/totsamuion/'>FACEBOOK</a>
        </h4>
      </div>
    )
  }
}

class Projects extends React.Component{
  render(){
    return(
      <div id = 'projectMatrix'>
        {
        ProjectsData.map((element) => {
          return(
           <ProjectBlock mask = {element.mask}/>
          )
        })
        }
      </div>
    )
    }
}

class ProjectBlock extends React.Component{
  render(){
    return(
      <div className ='ProjectBlock'>
        <Mask shape = {this.props.mask}/>
      </div>
    )
  }
}

class Mask extends React.Component{
  render(){
    if(this.props.shape == 'flower'){
      return(
          <svg className = 'mask flower' viewBox="0 0 426 426" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M369 57V41C369 18.3563 350.644 1.10434e-05 328 1.00536e-05L98 0C75.3563 -9.89786e-07 57 18.3563 57
          41V57H41C18.3563 57 0 75.3563 0 98V328C0 350.644 18.3563 369 41 369H57V385C57 407.644 75.3563 426 98 426H328C350.644 
          426 369 407.644 369 385V369H385C407.644 369 426 350.644 426 328V98C426 75.3563 407.644 57 385 57H369Z" fill="#0F0F0F"/></svg>
         )
    }
    if(this.props.shape == 'circle'){
      return(
        <svg className = 'mask circle' viewBox="0 0 414 414" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M414 207C414 321.323 321.323 414 207 414C92.6771 414 0 321.323 0 207C0 92.6771 92.6771 0 207 0C321.323 0 414 92.6771 414 207Z" fill="#0F0F0F"/>
        </svg>
         )
    }
    if(this.props.shape == 'oval'){
      return(
        <svg className = 'mask oval' viewBox="0 0 414 518" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M414 259C414 402.042 321.323 518 207 518C92.6771 518 0 402.042 0 259C0 115.958 92.6771 0 207 0C321.323 0 414 115.958 414 259Z" fill="#0F0F0F"/>
        </svg>
         )
    }
    
  }
}


export default App;
