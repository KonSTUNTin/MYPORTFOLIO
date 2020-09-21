import React from 'react';
import ProjectsData from '../data/projects.js'
import {Mask, StaticMask} from './maskshapes.js'


class Projects extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {
      filter: ["0"]
    }
    this.tags4filter = [
      'ALL',
      '3D',
      'WEB DESIGN',
      'ANIMATION',
      'PRODUCT',
      'CODING',
      'BRANDING'
    ]
    this.tagManager = this.tagManager.bind(this)
  }
  tagManager(event){
    let index = event.target.id;
    let arrayOfTags = this.state.filter;
    let find = arrayOfTags.indexOf(index)
    if(find===-1){
      if(index!=='0'){
        if(arrayOfTags.indexOf("0")>-1){
          arrayOfTags.splice(arrayOfTags.indexOf("0"), 1)
        }
        arrayOfTags.push(index)
      }else{
        arrayOfTags = ["0"]
      }
    }else{
      arrayOfTags.splice(find, 1)
    }
    if(arrayOfTags.length===0)arrayOfTags=['0']
    this.setState({filter:arrayOfTags})
  }
  render(){
    return(
      <div id = 'clipContainer'>
        <div id = 'projectMatrix'>
         <ProjectFilter filter = {this.state.filter} handler = {this.tagManager} tags4filter = {this.tags4filter}></ProjectFilter>
          {
          ProjectsData.map((element, num) => {

            let check = 0;
            if(this.state.filter.indexOf("0")===-1){
              this.state.filter.map((index)=>{
                if(element.tags.indexOf(this.tags4filter[index])>-1){check++}
              })
            }else{
              check = 1
            }
    
            if(check===this.state.filter.length){
              return(
                <ProjectBlock 
                    key = {num}
                    inCase = {false}
                    loaderHandler = {this.props.loaderHandler}
                    handler = {this.props.handler}
                    mask = {element.mask} 
                    img = {element.img} 
                    num = {num} 
                    name={element.name}
                    tags={element.tags}
                  />
                )
            }
            
          })
          }
        </div>
      </div>
    )
  }
}

class ProjectFilter extends React.Component{
  render(){
    return(
      <div id = 'filter'>
        {
        this.props.tags4filter.map((item, index)=>{
          let status ='';
          if(this.props.filter.indexOf(index.toString())>-1){status='active'}
          return(
            <span onClick = {this.props.handler} id = {index} key = {index} className = {'tag ' + status}>
            {(status==='active')&&'#'}
            {item}
            </span>
          )
        })
        }
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
              (!this.props.inCase)&&<Mask loaderHandler = {this.props.loaderHandler} shape = {this.props.mask} img = {this.props.img}  num = {this.props.num}/>
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
          {this.props.tags.map(
            (item, index) =>{
              return(
                <span key = {'tag' + index} className = 'tag'>
                  {'#' + item}
                </span>
              )
          })}
        </div>
        <h2>
          {this.props.name.toUpperCase()}
        </h2>
      </div>
      )
    }
}
 
export {Projects, ProjectBlock}