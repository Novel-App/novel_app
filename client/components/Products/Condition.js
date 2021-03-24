import React from 'react'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import {InfoCircleOutlined} from '@ant-design/icons'

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Book Condition Guidelines</Popover.Title>
    <Popover.Content>
      <p>
        New: Brand new, with original protective wrapping intact. Books with any
        markings or labels attached may not be listed as New.
      </p>
      <p>
        Like New: May have minimal, minor cosmetic defects (marks, wears, cuts,
        bends, etc.) Dust cover is intact, and pages are clean and without notes
        or markings. May be missing bundle media.
      </p>
      <p>
        Good: All pages and cover are intact. May have minor cosmetic defects.
        Dust covers, shrink wrap, or cases may be missing. Pages may include
        limited notes or markings, but text is readable. May be missing bundle
        media.
      </p>
      <p>
        Loved: All pages and cover are intact. Spine may show signs of wear. May
        have notes, markings, or water damage, but text is readable.
      </p>
      <p>
        Aged: Shows significant wear. May have notes, markings, and/or a couple
        pages missing.
      </p>
    </Popover.Content>
  </Popover>
)

export const Condition = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-info-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>
  </OverlayTrigger>
)

export default Condition
