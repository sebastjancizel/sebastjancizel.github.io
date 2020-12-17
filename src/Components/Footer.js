import React, { Component } from 'react';

class Footer extends Component {
  render() {

    if(this.props.data){
      var networks= this.props.data.social.map(function(network){
        return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      })
    }

    return (
      <footer>

     <div className="row">
        <div className="twelve columns">
           <ul className="social-links">
              {networks}
           </ul>

           <ul className="copyright">
              {/* <li>Photo by Zac Ong on <a href="https://unsplash.com/photos/JHN1-mpgXjo">Unsplash</a></li> */}
              <li>Photo by Luke Chesser on <a href="https://unsplash.com/photos/pJadQetzTkI">Unsplash</a></li>
              <li>Based on a <a href="https://github.com/tbakerx/react-resume-template">React template by Tim Baker</a></li>
              <li>Design by <a title="Styleshout" href="http://www.styleshout.com/">Styleshout</a></li>
           </ul>

        </div>
        <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
     </div>
  </footer>
    );
  }
}

export default Footer;