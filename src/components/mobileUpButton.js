import React from 'react';

class MobileUpButton extends React.Component{
    render(){
      return(
        <div className = {'MobileUpButton ' + this.props.status}>
          <div id = 'logo'></div>
          <span onClick = {this.props.handler}>
            {this.props.lang===1&&"Наверх"}
            {this.props.lang===0&&"Scroll up"}
            </span>
        </div>
      )
    }
  }
export default MobileUpButton;