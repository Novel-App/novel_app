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
    <InfoCircleOutlined />
  </OverlayTrigger>
)

export default Condition
