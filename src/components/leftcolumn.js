import React from 'react';
class LeftColumn extends React.Component{
    render(){
      return(
        <div id = 'LeftColumn'>
          <div id ='myPhoto' onClick = {this.props.handler}>
          </div>
          <h1 id = 'aboutMe'>
            Привет! Меня зовут Костя Остроухов, я проектирую, рендерю и кодю для web будущего
          </h1>
          <h4 id ='Contacts'>
            950-64-99-204
            totsamuion@yandex.ru
            <a href = 'https://t.me/Kostya_Ostro'>TELEGRAM</a>
            <a href = 'https://www.facebook.com/totsamuion/'>FACEBOOK</a>
          </h4>
        </div>
      )
    }
  }

  export default LeftColumn