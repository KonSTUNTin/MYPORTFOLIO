import React from 'react';
import ProjectsData from './data/projects.js'
import './stylesheets/style.css';
import flowerPath from './flower.svg';


class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      status:null
    }
    this.rightPanelActivate = this.rightPanelActivate.bind(this)
  }
  rightPanelActivate(){
    console.log('click')
    this.setState({status:"active"})
  }
  render() {
    return(
      <div id = 'MainContainer'>
        <LeftColumn/>
        <Projects handler = {this.rightPanelActivate}/>
        <RightPanel status = {this.state.status}/>
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


class RightPanel extends React.Component{
  render(){
    return(
      <div className ={this.props.status} id = 'RightPanel'>
        
      </div>
    )
    }
}

class Projects extends React.Component{
  render(){
    return(
      <div id = 'projectMatrix'>
        {
        ProjectsData.map((element, num) => {
          
          return(
           <ProjectBlock 
            handler = {this.props.handler}
            mask = {element.mask} 
            img = {element.img} 
            num = {num} 
            name={element.name}
            tags={element.tags}
            />
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
      <div className ='ProjectBlock' onClick = {this.props.handler}>
        <ProjectText 
          name={this.props.name}
          tags = {this.props.tags}
          shape = {this.props.mask}
        />
        <Mask 
          shape = {this.props.mask} 
          img = {this.props.img} 
          num = {this.props.num}
        />
      </div>
    )
  }
}
class ProjectText extends React.Component{
  render(){
    return(
    <div className = {'projectText ' + this.props.shape}>
      <div className = 'tagsContainer'>
        {this.props.tags.map(item=>{
          return(
            <span className = 'tag'>
              {item}
            </span>
          )
        })}
      </div>
      <h2>
        {this.props.name}
      </h2>
    </div>
    )
  }
}



class Mask extends React.Component{
  render(){
    
      return(
          <svg className = {this.props.shape + ' mask'} viewBox="0 0 426 426" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <pattern id={"pattern" + this.props.num} patternContentUnits="objectBoundingBox" width="1" height="1">
              <use href={"#image" + this.props.num} transform="scale(.001)"/>
              </pattern>
              <image id ={"image" + this.props.num} x="0" y="0" height="1024" width="1024" href={this.props.img}/>
            </defs>
            {(this.props.shape == 'flower')&&<path d="M369 57V41C369 18.3563 350.644 1.10434e-05 328 1.00536e-05L98 0C75.3563 -9.89786e-07 57 18.3563 57 41V57H41C18.3563 57 0 75.3563 0 98V328C0 350.644 18.3563 369 41 369H57V385C57 407.644 75.3563 426 98 426H328C350.644 426 369 407.644 369 385V369H385C407.644 369 426 350.644 426 328V98C426 75.3563 407.644 57 385 57H369Z" fill={'url(#pattern' + this.props.num + ')'}/>
            }
            {(this.props.shape == 'circle')&&<path d="M414 207C414 321.323 321.323 414 207 414C92.6771 414 0 321.323 0 207C0 92.6771 92.6771 0 207 0C321.323 0 414 92.6771 414 207Z" fill={'url(#pattern' + this.props.num + ')'}/>
            }
            {(this.props.shape == 'oval')&&<path d="M340.471 213C340.471 330.637 264.254 426 170.236 426C76.217 426 0 330.637 0 213C0 95.3634 76.217 0 170.236 0C264.254 0 340.471 95.3634 340.471 213Z" fill={'url(#pattern' + this.props.num + ')'}/>
            }
             {(this.props.shape == 'cross')&&<path d="M369 57V1.3638e-05L57 0L57 57H0V369H57L57 426H369V369H426V57H369Z" fill={'url(#pattern' + this.props.num + ')'}/>
            }
             {(this.props.shape == 'romb')&&<path d="M162.565 21.185C190.534 -6.78435 235.882 -6.78433 263.851 21.1851L405.231 162.565C433.2 190.534 433.2 235.882 405.231 263.851L263.851 405.231C235.882 433.2 190.534 433.2 162.565 405.231L21.185 263.851C-6.78435 235.882 -6.78433 190.534 21.1851 162.565L162.565 21.185Z" fill={'url(#pattern' + this.props.num + ')'}/>
            }
            </svg>
         )
    
  }
}


export default App;
