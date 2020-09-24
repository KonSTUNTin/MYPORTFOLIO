import React from 'react';
import ProjectsData from './data/projects.js'
import './stylesheets/main.css';
import './stylesheets/desktop.css';
import './stylesheets/mobile.css';

import LeftColumn from './components/leftcolumn.js';
import RightPanel from './components/rightpanel.js';
import {Projects} from './components/projectlayout.js';
import MobileUpButton from './components/mobileUpButton.js';

class App extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      status: null,
      content: null,
      index: null,
      scroll: null,
      loaderProgress: 0,
      aboutMe: 0,
      lang: 0
    }

    this.myref = React.createRef()
    this.rightPanelRef = React.createRef()
    this.loadNum = ProjectsData.length;
    this.loaded = 0;
    this.loaderUpdate = this.loaderUpdate.bind(this);
    this.rightPanelActivate = this.rightPanelActivate.bind(this)
    this.closeRightPanel = this.closeRightPanel.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
    this.scrolltoTop = this.scrolltoTop.bind(this)
    this.pageAboutMeActivate = this.pageAboutMeActivate.bind(this)
    this.languageDetect = this.languageDetect.bind(this)

    
  }
  componentDidMount(){
    this.languageDetect()
  }
  languageDetect(){
    let config = {
      'language': 'en',
      'country': ''
    }
    let client = window.navigator ? (window.navigator.language ||
      window.navigator.systemLanguage ||
      window.navigator.userLanguage) : (config.language + "-" + config.country);
      if(client.toUpperCase().indexOf("RU" > -1)){
        this.setState({lang:1})
        console.log('ru')
      }
  }

  loaderUpdate(){
    this.loaded++
    let progress = this.loaded / this.loadNum ;
    this.setState({loaderProgress: progress})
  }
  closeRightPanel(){
    (this.state.status.indexOf("active")>-1)&&this.setState({status: null, content: null, index: null,  aboutMe: null})
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
      this.setState({content:data, status:"active", index: index, scroll: null, aboutMe: 0})
  }
  async pageAboutMeActivate(event){
    let response = await fetch(
      './data/aboutme.json', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }}
      );
    let data = await response.json();
    this.setState({content:data, status:"active aboutMe", scroll: null, aboutMe: 1})
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
        <MobileUpButton handler = {this.scrolltoTop} status = {this.state.scroll}/>
        <div id = 'MainContainer' ref = {this.myref} onScroll = {this.scrollHandler} className = {myclass}>
          {(this.state.loaderProgress < 1)&&<Loader lang = {this.state.lang} progress = {this.state.loaderProgress}></Loader>}
          <LeftColumn lang = {this.state.lang} openAboutMe = {this.pageAboutMeActivate} handler = {this.closeRightPanel}/>
          <Projects loaderHandler = {this.loaderUpdate} handler = {this.rightPanelActivate}/>
        </div>
        <RightPanel onScroll = {this.scrollHandler} linkRef = {this.rightPanelRef} handler = {this.closeRightPanel} data = {this.state} />
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
