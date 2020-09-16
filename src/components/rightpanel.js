import React from 'react';
import ProjectsData from '../data/projects.js'
import {ProjectBlock} from './projectlayout.js'

class RightPanel extends React.Component{
    render(){
      let element = ProjectsData[this.props.data.index];
      return(
        <div className ={this.props.data.status} id = 'RightPanel'>
          {(this.props.data.content!= null)&&
            <>
              <ProjectHeader img = {this.props.data.content.img}/>
              <ProjectBlock
                inCase = {true}
                num = {element.index}
                mask = {element.mask} 
                img = {element.img}
                name={element.name}
                tags={element.tags}/>
              <div className = 'ProjectContent'>
              {this.props.data.content.content.map(
                (item)=>{
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
  class VideoSection extends React.Component{
    render(){
      return(
        <div className = {'videoSection ' + this.props.data.class}>
          <iframe width="560" height="315" src={this.props.data.src +"?controls =0"} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      )
    }
  }


class ImgSection extends React.Component{
  render(){
    return(
      <div className = {'imgSection ' + this.props.data.class}>
        {this.props.data.src.map(
        item=>{
            return(
                <img src = {item}/>
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
    return(
      <div class = 'textSection'>
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