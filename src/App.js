import React from 'react';
import ProjectsData from './data/projects.js'
import './stylesheets/main.css';
import './stylesheets/desktop.css';
import './stylesheets/mobile.css';

import LeftColumn from './components/leftcolumn.js';
import RightPanel from './components/rightpanel.js';
import {Projects} from './components/projectlayout.js';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      status: null,
      content: null,
      index: null,
    }
    this.rightPanelActivate = this.rightPanelActivate.bind(this)
    this.closeRightPanel = this.closeRightPanel.bind(this)
  }
  closeRightPanel(){
    (this.state.status === "active")&&this.setState({status: null, content: null, index: null})
  }
  async rightPanelActivate(event){
      let index = event.currentTarget.id
      let response = await fetch(
        ProjectsData[index].link, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }}
        );
      let data = await response.json();
      this.setState({content:data, status:"active", index: index})
    
  }
  render() {
    let myclass ='';
    if(this.state.status == 'active'){myclass='hide'}
    return(
      <div id = 'MainContainer' className = {myclass}>
        <LeftColumn handler = {this.closeRightPanel}/>
        <Projects handler = {this.rightPanelActivate}/>
        <RightPanel handler = {this.closeRightPanel} data = {this.state} />
      </div>
    )
  }
}

export default App;
