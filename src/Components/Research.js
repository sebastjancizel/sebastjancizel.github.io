import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class Research extends Component {
  render() {

    if (this.props.data) {
      var description = ReactHtmlParser(this.props.data.description);
      var papers = this.props.data.papers.map(function (papers) {
        return <div key={papers.title}><h5>{ReactHtmlParser(papers.title)}</h5>
          <p className="info">{ReactHtmlParser(papers.journal)} <span>&bull; </span><em className="date">Joint with {papers.collaborators}</em></p>
          <p>{papers.abstract}</p></div>
      })
    }

    return (
      <section id="research">

        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Research</span></h1>
          </div>

          <div className="nine columns main-col">
            <p>{description}</p>
            <h3>Publications</h3>
            <div className="row item">
              <div className="twelve columns">
                {papers}
              </div>
            </div>
          </div>
        </div>




      </section>
    );
  }
}

export default Research;
