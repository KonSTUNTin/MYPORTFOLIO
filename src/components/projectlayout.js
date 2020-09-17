import React from 'react';
import ProjectsData from '../data/projects.js'
import {Mask, StaticMask} from './maskshapes.js'


class Projects extends React.Component{
    render(){
      return(
        <div id = 'clipContainer'>
          <div id = 'projectMatrix'>
            {
            ProjectsData.map((element, num) => {
              return(
              <ProjectBlock 
                  key = {num}
                  inCase = {false}
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
        </div>
      )
    }
}
  
class ProjectBlock extends React.Component{
    constructor(props){
      super(props)
      this.angle = 0;
      if(!this.props.inCase)this.angle = Math.random() * 20 - 10
    }
    render(){
        let myclass = '';
        if(this.props.inCase){
          myclass = 'inCase'
        }
        return(
            <div 
            className ={'ProjectBlock ' + myclass} 
            id = {this.props.num} 
            onClick = {this.props.handler}
            style={{transform: "rotate(" + this.angle +'deg)'}}
            >
                <ProjectText 
                name={this.props.name}
                tags = {this.props.tags}
                shape = {this.props.mask}
                />
                {
                  (this.props.inCase)&&<StaticMask shape = {this.props.mask} num = {this.props.num}/>
                }
                {
                  (!this.props.inCase)&&<Mask shape = {this.props.mask} img = {this.props.img}  num = {this.props.num}/>
                }
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
 
export {Projects, ProjectBlock}