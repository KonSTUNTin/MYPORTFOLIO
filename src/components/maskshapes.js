import React from 'react';

class Mask extends React.Component{
    constructor(props){
            super(props)
            this.x =  Math.round(Math.random()) * 426;
            this.y =  Math.round(Math.random()) * 426;
            
            if(this.props.shape === 'flower'){this.shape = <FlowerShape id = {this.props.num}/>; this.patterntransform = "scale(1 1)"}
            if(this.props.shape === 'circle'){this.shape = <CircleShape id = {this.props.num}/> ; this.patterntransform = "scale(1 1)"}
            if(this.props.shape === 'oval'){this.shape = <OvalShape id = {this.props.num}/>; this.patterntransform = "scale(1.2 1) translate(-32 0)"}
            if(this.props.shape === 'cross'){this.shape = <CrossShape id = {this.props.num}/>; this.patterntransform = "scale(1 1)"}
            if(this.props.shape === 'romb'){this.shape = <RombShape id = {this.props.num}/>; this.patterntransform = "scale(1 1)"}
    }
    render(){
       
        return(
            <>
            <img style = {{display: 'none'}} onLoad = {this.props.loaderHandler} src={this.props.img}/>
            <svg className = {this.props.shape + ' mask'} viewBox="0 0 426 426"  fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={"pattern" + this.props.num} patternContentUnits="objectBoundingBox" width="1" height="1" patternTransform = {this.patterntransform}>
                  <use xlinkHref={"#image" + this.props.num} transform="scale(.001)"/>
                  </pattern>
                  <image id ={"image" + this.props.num} x="0" y="0" height="1024" width="1024"  href={this.props.img}/>
                </defs>
                <clipPath id={"myClip" + this.props.num}>
                  <circle 
                  cx={this.x} 
                  cy={this.y} 
                  r="600" fill = 'black'/>
                </clipPath>
                    
                {this.shape}
    
                <use xlinkHref={"#" + this.props.shape + this.props.num} fill={'url(#pattern' + this.props.num + ')'}/>
                <use className = 'hoverMask' clipPath={"url(#myClip" + this.props.num + ')'} xlinkHref={"#" + this.props.shape + this.props.num} fill="black"/>
                </svg>
                </>
            )
        
    }
    }

class StaticMask extends React.Component{
    constructor(props){
        super(props)
        if(this.props.shape === 'flower'){this.shape = <FlowerShape id = {this.props.num}/>}
        if(this.props.shape === 'circle'){this.shape = <CircleShape id = {this.props.num}/>}
        if(this.props.shape === 'oval'){this.shape = <OvalShape id = {this.props.num}/>}
        if(this.props.shape === 'cross'){this.shape = <CrossShape id = {this.props.num}/>}
        if(this.props.shape === 'romb'){this.shape = <RombShape id = {this.props.num}/>}
    }
    render(){
        return(
            <svg className = {this.props.shape + ' mask'} viewBox="0 0 426 426" fill="none" xmlns="http://www.w3.org/2000/svg">
                {this.shape}
                <use xlinkHref={"#" + this.props.shape + this.props.num} fill="black" />
                </svg>
            )   
    }
}


class CircleShape extends React.Component{
    render(){
    return(
        <path id = {'circle' + this.props.id} d="M414 207C414 321.323 321.323 414 207 414C92.6771 414 0 321.323 0 207C0 92.6771 92.6771 0 207 0C321.323 0 414 92.6771 414 207Z" />
        )}
}
class RombShape extends React.Component{
    render(){
    return(
        <path id = {'romb' + this.props.id} d="M162.565 21.185C190.534 -6.78435 235.882 -6.78433 263.851 21.1851L405.231 162.565C433.2 190.534 433.2 235.882 405.231 263.851L263.851 405.231C235.882 433.2 190.534 433.2 162.565 405.231L21.185 263.851C-6.78435 235.882 -6.78433 190.534 21.1851 162.565L162.565 21.185Z"/>
    )}
}
class OvalShape extends React.Component{
    render(){
    return(
        <path id = {'oval' + this.props.id} d="M340.471 213C340.471 330.637 264.254 426 170.236 426C76.217 426 0 330.637 0 213C0 95.3634 76.217 0 170.236 0C264.254 0 340.471 95.3634 340.471 213Z" />
    )}
}
class FlowerShape extends React.Component{
    render(){
    return(
        <path id = {'flower' + this.props.id} d="M369 57V41C369 18.3563 350.644 1.10434e-05 328 1.00536e-05L98 0C75.3563 -9.89786e-07 57 18.3563 57 41V57H41C18.3563 57 0 75.3563 0 98V328C0 350.644 18.3563 369 41 369H57V385C57 407.644 75.3563 426 98 426H328C350.644 426 369 407.644 369 385V369H385C407.644 369 426 350.644 426 328V98C426 75.3563 407.644 57 385 57H369Z" />
    )
    }
}
class CrossShape extends React.Component{
    render(){
    return(
        <path id = {'cross' + this.props.id} d="M369 57V1.3638e-05L57 0L57 57H0V369H57L57 426H369V369H426V57H369Z"/>    )
    }
}
        
export {Mask, StaticMask}
    