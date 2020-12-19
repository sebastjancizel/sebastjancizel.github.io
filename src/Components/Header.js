import React, { Component } from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import ParticlesBg from 'particles-bg';
import MediaQuery from 'react-responsive';

class Header extends Component {
   render() {

      if (this.props.data) {
         // var name = this.props.data.name;
         // var occupation = this.props.data.occupation;
         var networks = this.props.data.social.map(function (network) {
            return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
         })
      }

      return (
         <header id="home">

            <nav id="nav-wrap">

               <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
               <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

               <ul id="nav" className="nav">
                  <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
                  <li><a className="smoothscroll" href="#about">About</a></li>
                  <li><a className="smoothscroll" href="#resume">Resume</a></li>
                  <li><a className="smoothscroll" href="#research">Research</a></li>
                  <li><a className="smoothscroll" href="#portfolio">Projects</a></li>
               </ul>

            </nav>

            <div className="row banner">
               <div className="banner-text">
                  <h1 className="responsive-headline">I'm Sebastjan Cizel.</h1>
                  <h3>I'm a <span> research student in mathematical physics</span> at the <span>University of Oxford</span>,
                with an interest in <span>machine learning</span>, <span>data science</span> and <span>finance</span>.
            </h3>
                  <hr />
                  <ul className="social">
                     {networks}
                  </ul>
               </div>
            </div>

            <p className="scrolldown">
               <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
            </p>
            <MediaQuery minWidth={767}>
               <ParticlesBg color="#ffffff" num={125} type="cobweb" bg={true} />
            </MediaQuery>
            <MediaQuery maxWidth={767}>
               <ParticlesBg color="#ffffff" num={30} type="cobweb" bg={true} />
            </MediaQuery>
         </header>
      );
   }
}

export default Header;
