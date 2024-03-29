import React from 'react';
class LeftColumn extends React.Component{
    render(){
      return(
        <div id = 'LeftColumn'>
          <div id = 'avatarRow'> 
            <div id ='myPhoto' onClick = {this.props.handler}></div>
            <div id ='language'>
              <span onClick = {this.props.changeLanguage} id = 'RU' className = {(this.props.lang==1)?'langSwitcher active':'langSwitcher'}>Ru</span>
              <span onClick = {this.props.changeLanguage} id = 'ENG' className = {(this.props.lang==0)?'langSwitcher active':'langSwitcher'}>Eng</span>
            </div>
          </div>
          <h1 id = 'aboutMe'>
            {(this.props.lang===1)&&<>Привет!<br/> Меня зовут<br/> Костя&nbsp;Остроухов.<br className ='mobile'/> Я проектирую, рендерю и&nbsp;кодю для&nbsp;web.</>}
            {(this.props.lang===0)&&<>Hello!<br/> My name is&nbsp;Kostya.<br/> I&nbsp;design, render, and&nbsp;code for&nbsp;WEB.</>}
          </h1>
          <a id = 'myPage' onClick = {this.props.openAboutMe}>
            {(this.props.lang===1)&&<>Обо мне</>}
            {(this.props.lang===0)&&<>About me</>}
          </a>
          <h4 id ='Contacts'>
            {"+7 950-64-99-204 k.ostro@yandex.ru "}<br/>
            <a target = 'blank' href = 'https://t.me/Kostya_Ostro'>Telegram</a>
            {' '}
            <a target = 'blank' href = 'https://www.facebook.com/totsamuion/'>Facebook</a>
          </h4>
        </div>
      )
    }
  }

  export default LeftColumn