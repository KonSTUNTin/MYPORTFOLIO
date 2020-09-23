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
            {this.props.data.aboutMe===0&&<ProjectHeader img = {this.props.data.content.img}/>}
            <CloseButton handler = {this.props.handler}/>
            {this.props.data.aboutMe===0&&<ProjectBlock
              inCase = {true}
              num = {element.index}
              mask = {element.mask} 
              img = {element.img}
              name={element.name}
              tags={element.tags}/>}
            <div className = 'ProjectContent'>
            {this.props.data.content.content.map(
              (item, index)=>{
                return(
                  <>
                  {(item.type === 'text')&&<TextSection data = {item}/>}
                  {(item.type === 'img')&&<ImgSection data = {item}/>}
                  {(item.type === 'video')&&<VideoSection data = {item}/>}
                  {(item.type === 'list')&&<ListSection data = {item}/>}
                  {(item.type === 'job')&&<JobSection data = {item}/>}
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

class ListSection extends React.Component{
  
  render(){
    return(
      <div className = 'listSection'>
        <h4>
          {this.props.data.header}
        </h4>
        <ul>
          {this.props.data.list.map(
            (point, index)=>{
              return(
                <li>{point}</li>
              )
            }
          )}
        </ul>
      </div>
    )
  }
}


class JobSection extends React.Component{
  
  render(){
    return(
      <div className = 'jobSection'>
        <h4>
          {this.props.data.header}
        </h4>
        <ul>
          {this.props.data.content.map(
            (job, index)=>{
              return(
                <div className = 'jobRow'>
                  <div className = 'jobInfo'>
                    {job.info}
                  </div>
                  <ul className = 'duties'>
                    {
                      job.list.map(
                        (item, index)=>{
                          return(
                            <li>{item}</li>
                          )
                        }
                      )
                    }
                  </ul>
                </div>
              )
            }
          )}
        </ul>
      </div>
    )
  }
}


export default RightPanel;