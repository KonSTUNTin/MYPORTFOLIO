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
            <ProjectBlock
              mask = {element.mask} 
              img = {element.img}
              name={element.name}
              tags={element.tags}
              />
            </>}
        </div>
      )
      }
  }

  export default RightPanel;