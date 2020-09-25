import React from 'react';
import ProjectsDataRU from './data/projectsRU.js';
import ProjectsDataEN from './data/projectsEN.js'
import './stylesheets/main.css';
import './stylesheets/desktop.css';
import './stylesheets/tablet.css';
import './stylesheets/mobile.css';

import LeftColumn from './components/leftcolumn.js';
import RightPanel from './components/rightpanel.js';
import {Projects} from './components/projectlayout.js';
import MobileUpButton from './components/mobileUpButton.js';


class App extends React.Component{
  constructor(props){
    super(props)

    let config = {
      'language': 'en',
      'country': 'EN'
    }
    let ProjectsData = ProjectsDataEN;
    let lang = 0;
    let client = window.navigator ? (window.navigator.language ||
      window.navigator.systemLanguage ||
      window.navigator.userLanguage) : (config.language + "-" + config.country);
    if(client.toUpperCase().indexOf("RU" > -1)){
      lang = 1
      ProjectsData = ProjectsDataRU
    }
    this.state ={
      status: 'not',
      content: null,
      index: null,
      scroll: null,
      loaderProgress: 0,
      aboutMe: 0,
      lang: lang
    }
    this.ProjectsData = ProjectsData;
    this.myref = React.createRef()
    this.rightPanelRef = React.createRef()
    this.loaded = 0;
    this.loaderUpdate = this.loaderUpdate.bind(this);
    this.rightPanelActivate = this.rightPanelActivate.bind(this)
    this.closeRightPanel = this.closeRightPanel.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
    this.scrolltoTop = this.scrolltoTop.bind(this)
    this.pageAboutMeActivate = this.pageAboutMeActivate.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
    
  }
  changeLanguage(){
    if(this.state.lang === 0){
      this.setState({lang: 1})
      this.ProjectsData = ProjectsDataRU
    } else {
      this.setState({lang: 0})
      this.ProjectsData = ProjectsDataEN
    }
    this.closeRightPanel()
  }
  loaderUpdate(){
    this.loaded++
    let progress = this.loaded / this.loadNum ;
    this.setState({loaderProgress: progress})
  }
  closeRightPanel(){
    (this.state.status.indexOf("active")>-1)&&this.setState({status: 'not', content: null, index: null,  aboutMe: null})
  }
  async rightPanelActivate(event){
      let index = event.currentTarget.id
      let response = await fetch(
        this.ProjectsData[index].link, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }}
        );
      let data = await response.json();
      this.setState({content:data, status:"active", index: index, scroll: null, aboutMe: 0})
  }
  async pageAboutMeActivate(event){
    let path = [
      './dataEN/aboutme.json',
      './dataRU/aboutme.json',
    ]
    if(this.state.status.indexOf("active")>-1){
      this.closeRightPanel()
    } else {
      let response = await fetch(
        path[this.state.lang], {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }}
        );
      let data = await response.json();
      this.setState({content:data, status:"active aboutMe", scroll: null, aboutMe: 1})
    }
    
}
  scrollHandler(event){
    let scroll = event.target.scrollTop;
    if((scroll > 100)&&(this.state.scroll === null)){
      this.setState({scroll: 'active'})
    }else{
      if((scroll< 100)&&(this.state.scroll === 'active')){
        this.setState({scroll: null})
      }
    }
  }
  scrolltoTop(){
    if(this.state.status.indexOf('active')<0){
      this.myref.current.scrollTo(0, 0)
    }else{
      this.rightPanelRef.current.scrollTo(0, 0)
    }
    
  }
  render() {
    let myclass ='';
    
    if(this.state.status === 'active'){myclass='hide'}
    return(
      <>
        {this.ex}
        <MobileUpButton lang = {this.state.lang} handler = {this.scrolltoTop} status = {this.state.scroll}/>
        <div id = 'MainContainer' ref = {this.myref} onScroll = {this.scrollHandler} className = {myclass}>
          {(this.state.loaderProgress < 1)&&<Loader lang = {this.state.lang} progress = {this.state.loaderProgress}></Loader>}
          <LeftColumn changeLanguage = {this.changeLanguage} lang = {this.state.lang} openAboutMe = {this.pageAboutMeActivate} handler = {this.closeRightPanel}/>
          <Projects loaderHandler = {this.loaderUpdate} handler = {this.rightPanelActivate} projects = {this.ProjectsData}/>
        </div>
        <RightPanel lang = {this.state.lang} projects = {this.ProjectsData} onScroll = {this.scrollHandler} linkRef = {this.rightPanelRef} handler = {this.closeRightPanel} data = {this.state} />
      </>
    )
  }
}

class Loader extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      time: 0
    }
    this.loop = this.loop.bind(this);
    
  }
  componentDidMount(){
    this.raf = requestAnimationFrame(this.loop)
  }
  loop(){
    let time = this.state.time + .1
    this.setState({time: time})
    if(this.props.progress<1){this.raf = requestAnimationFrame(this.loop)}
  }
  componentWillUnmount(){
    cancelAnimationFrame(this.raf)
  }
  render(){
    let star = convertUnicode("\u2738")
    let texts = ["LOADING", "ЗАГРУЗКА"];
    let string = texts[this.props.lang];
    let progress = Math.floor(this.state.time) % (string.length + 1)
    let stringStart = string.slice(0, progress)
    let stringEnd = string.slice(progress, string.length)
    return(
      <div className = 'Loader'>
        <h1>{stringStart}<span className ='red'>{star}</span>{stringEnd}</h1>
      </div>
    )
  }
}

function convertUnicode(input) {
  return input.replace(/\\u(\w\w\w\w)/g,function(a,b) {
    var charcode = parseInt(b,16);
    return String.fromCharCode(charcode);
  });
}

export default App;
