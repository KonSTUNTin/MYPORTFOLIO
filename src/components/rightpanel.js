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
              {this.props.data.content.content.map(
                (item)=>{
                  return(
                    <>
                    {(item.type === 'text')&&<TextSection data = {item}/>}
                    {(item.type === 'img')&&<ImgSection data = {item}/>}
                    </>
                  )
                }
              )}
            </>}
        </div>
      )
      }
  }
class ImgSection extends React.Component{
  render(){
    console.log(this.props.data)
    return(
      <div className = 'imgSection'>
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
      <img className = 'projectHeader' src = {this.props.img}></img>
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