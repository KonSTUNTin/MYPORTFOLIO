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
      loaderProgress: 0
    }

    this.loadNum = ProjectsData.length;
    this.loaded = 0;
    this.loaderUpdate = this.loaderUpdate.bind(this);
    this.rightPanelActivate = this.rightPanelActivate.bind(this)
    this.closeRightPanel = this.closeRightPanel.bind(this)
  }
  loaderUpdate(){
    this.loaded ++
    let progress = this.loaded / this.loadNum ;
    this.setState({loaderProgress: progress})
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
        {(this.state.loaderProgress < 1)&&<Loader progress = {this.state.loaderProgress}></Loader>}
        <LeftColumn handler = {this.closeRightPanel}/>
        <Projects loaderHandler = {this.loaderUpdate} handler = {this.rightPanelActivate}/>
        <RightPanel handler = {this.closeRightPanel} data = {this.state} />
      </div>
    )
  }
}

class Loader extends React.Component{
  render(){
    return(
      <div className = 'Loader'>
        {"Загрузка " + Math.round(this.props.progress * 100) + '%'}
      </div>
    )
  }
}

export default App;
