import React from 'react'
import * as AiIcons from 'react-icons/ai'

const Footer = () => {
  return (
    <section className="footer">
      <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5 socialMedia">
        <div className="mediaIconsFoot">
          <ul className="list-unstyled list-inline social pull-right">
            <li className="list-inline-item ">
              <a href="#">
                <AiIcons.AiFillFacebook className="footerIcon" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <AiIcons.AiFillInstagram className="footerIcon" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <AiIcons.AiFillTwitterCircle className="footerIcon" />
              </a>
            </li>
          </ul>
          <div className="createdBy">
            <p>Created by the Novel Coorporation</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
