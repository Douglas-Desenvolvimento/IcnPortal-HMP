import React from 'react';
import { CButton, CCollapse, CListGroup, CListGroupItem } from '@coreui/react';
import { cilFullscreen, cilFullscreenExit } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
const CollapsibleDetail = ({ visible, toggleVisibility, title, content }) => (
    <CButton className="text-start fs-6" color="link" variant="outline" onClick={toggleVisibility}>
        {title}
        <CIcon
            icon={visible ? cilFullscreenExit : cilFullscreen}
            size="sm"
            className="ms-2"
        />
        <CCollapse visible={visible}>
            <CListGroup flush className="m-0 p-0 br-transparent">
                <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span className="fs-6">{content || "Not available"}</span>
                </CListGroupItem>
            </CListGroup>
        </CCollapse>
    </CButton>
);

export default CollapsibleDetail;
