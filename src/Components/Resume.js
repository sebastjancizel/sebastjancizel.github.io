import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
class Resume extends Component {
  render() {

    if (this.props.data) {
      var work = this.props.data.work.map(function (work) {
        return <div key={work.company}>
          <div className="wrapper">
            <div>
              <img className="icon" src={"images/" + work.image} align="center" />
            </div>
            <div>
              <h3>{work.company}</h3>
              <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
            </div>
          </div>
          <p>{ReactHtmlParser(work.description)}</p>
        </div>
      })
      var education = this.props.data.education.map(function (education) {
        return <div key={education.school}>
          <div className="wrapper">
            <div>
              <img className="icon" src={"images/" + education.image} align="center" />
            </div>
            <div>
              <h3>{education.school}</h3>
              <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
            </div>
          <p>{education.description}</p></div>
          </div>
      })
      var skills = this.props.data.skills.map(function (skill) {
        return <div key={skill.title}><h3>{skill.title}</h3>
          <p className="info">{skill.list}</p>
          <p>{ReactHtmlParser(skill.description)}</p>
        </div>
      })
    }

    return (
      <section id="resume">
        <div className="row work">

          <div className="three columns header-col">
            <h1><span>Work</span></h1>
          </div>

          <div className="nine columns main-col">
            {work}
          </div>
        </div>

        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>
          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                {education}
              </div>
            </div>
          </div>
        </div>





        <div className="row skills">

          <div className="three columns header-col">
            <h1><span>Skills</span></h1>
          </div>

          <div className="nine columns main-col">
            {skills}
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
