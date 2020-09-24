import React from 'react';

class MobileUpButton extends React.Component{
    render(){
      console.log(new Date())
      return(
        <div className = {'MobileUpButton ' + this.props.status}>
          <div id = 'logo'></div>
          <span onClick = {this.props.handler}>Наверх</span>
        </div>
      )
    }
  }
export default MobileUpButton;