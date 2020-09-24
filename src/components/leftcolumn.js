import React from 'react';
class LeftColumn extends React.Component{
    render(){
      return(
        <div id = 'LeftColumn'>
          <div id ='myPhoto' onClick = {this.props.handler}>
          </div>
          <h1 id = 'aboutMe'>
            {(this.props.lang===1)&&<>Привет!<br/> Меня зовут<br/> Костя&nbsp;Остроухов.<br className ='mobile'/> Я проектирую, рендерю и&nbsp;кодю для&nbsp;web.</>}
            {(this.props.lang===0)&&<>Hello!<br/> My name is&nbsp;Kostya.<br/> I&nbsp;design, render, and code for&nbsp;WEB.</>}
          </h1>
          <a id = 'myPage' onClick = {this.props.openAboutMe}>
            {(this.props.lang===1)&&<>ОБО МНЕ</>}
            {(this.props.lang===0)&&<>ABOUT ME</>}
          </a>
          <h4 id ='Contacts'>
            {"+7 950-64-99-204 totsamuion@yandex.ru "}<br/>
            <a target = 'blank' href = 'https://t.me/Kostya_Ostro'>TELEGRAM</a>
            {' '}
            <a target = 'blank' href = 'https://www.facebook.com/totsamuion/'>FACEBOOK</a>
          </h4>
        </div>
      )
    }
  }

  export default LeftColumn