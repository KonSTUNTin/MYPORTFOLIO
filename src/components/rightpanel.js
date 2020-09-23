import React from 'react';
import ProjectsData from '../data/projects.js'
import {ProjectBlock} from './projectlayout.js'


class RightPanel extends React.Component{
  
  
  render(){
    let element = ProjectsData[this.props.data.index];
    return(
      <div ref = {this.props.linkRef} className ={this.props.data.status} onScroll = {this.props.onScroll} id = 'RightPanel'>
        {(this.props.data.content!= null)&&
          <>
            <ProjectHeader img = {this.props.data.content.img}/>
            <CloseButton handler = {this.props.handler}/>
            <ProjectBlock
              inCase = {true}
              num = {element.index}
              mask = {element.mask} 
              img = {element.img}
              name={element.name}
              tags={element.tags}/>
            <div className = 'ProjectContent'>
            {this.props.data.content.content.map(
              (item, index)=>{
                return(
                  <>
                  {(item.type === 'text')&&<TextSection data = {item}/>}
                  {(item.type === 'img')&&<ImgSection data = {item}/>}
                  {(item.type === 'video')&&<VideoSection data = {item}/>}
                  </>
                )
              }
            )}
            </div>
          </>}
      </div>
    )
    }
  }

  class CloseButton extends React.Component{
    render(){
      return(
        <div onClick = {this.props.handler} className = 'closeButton'>
             <div className = 'crossIcon'/>
            <span>ЗАКРЫТЬ</span>
        </div>
      )
    }
  }


  class VideoSection extends React.Component{
    render(){
      return(
        <div className = {'videoSection ' + this.props.data.class}>
          <video poster={this.props.data.poster} autoPlay="autoplay" muted loop="loop" controls>
            <source src={this.props.data.src} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          </video>
        </div>
      )
    }
  }


class ImgSection extends React.Component{
  render(){
    return(
      <div className = {'imgSection ' + this.props.data.class}>
        {this.props.data.src.map(
        (item, index)=>{
            return(
                <img key = {index} src = {item}/>
            )
          }
        )}
      </div>
    )
  }
}



class ProjectHeader extends React.Component{
  render(){
    return(
      <>
      <div className = 'projectHeader' style = {{backgroundImage: 'url(' + this.props.img + ')'}} ></div>
      </>
    )
  }
}

class TextSection extends React.Component{
  
  render(){
    console.log(this.props)
    return(
      <div className = 'textSection'>
        <h4>
          {this.props.data.header}
        </h4>
        <p>
          {this.props.data.text}
        </p>
      </div>
    )
  }
}


export default RightPanel;