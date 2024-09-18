import React, { useState, useEffect } from 'react';
import { CSidebar, CSidebarBrand, CSidebarHeader, CSidebarFooter, CNavTitle, CSidebarNav, CNavItem, CBadge, CNavGroup, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilMenu, cilSpeedometer, cilChartLine, cilAddressBook, cilFolderOpen, cilScreenSmartphone, cilShortText, cilNotes, cilFilterSquare, cilMobile } from "@coreui/icons";
import { } from "@coreui/icons";
import Prove from '../pages/prove/Prove';
import { } from "@coreui/icons";
import { Link } from "react-router-dom";
import { useSpring, animated } from 'react-spring';




const SideBar = ({ narrow, onNavClick }) => {
    const props = useSpring({ opacity: 1, from: { opacity: 0 } });

    return (
        <>
            <animated.div style={props}>
                <CSidebar
                    className="border-end"
                    colorScheme="dark"
                    src="/tree-Oakmont-Branca.png"
                    narrow={narrow}
                    style={{
                        position: "fixed",
                        left: 0,
                        top: '72px',
                        zIndex: 1,
                        height: '100%',
                        overflowY: 'auto'

                    }}
                >
                    <CSidebarHeader className="border-bottom">
                        <CSidebarBrand className="d-md-down-none" href="#" onClick={() => onNavClick('WelcomeHome')}>
                            <img className="m-1" src="/tree-Oakmont-Branca.png" alt="tree-Oakmont-Branca" width="45" height="30" />
                        </CSidebarBrand>
                    </CSidebarHeader>
                    <CSidebarNav>
                        <CNavItem href="#DashBoards" onClick={() => onNavClick('Audit')}><CIcon customClassName="nav-icon" icon={cilChartLine} /> DashBoards</CNavItem>
                        <CNavItem href="#Mobile_Reputation_Analisys" onClick={() => onNavClick('MReputAnalisys')}><CIcon customClassName="nav-icon" icon={cilMobile} /> Mobile Reputation Analisys</CNavItem>
                        <CNavItem href="#Mobile_Reputation_History" onClick={() => onNavClick('MReputHistory')}><CIcon customClassName="nav-icon" icon={cilNotes} /> Mobile Reputation History</CNavItem>
                        <CNavItem href="#Verify" onClick={() => onNavClick('Verify')}><CIcon customClassName="nav-icon" icon={cilFolderOpen} /> Verify</CNavItem>
                        <CNavItem href="#PreFill" onClick={() => onNavClick('PreFill')}><CIcon customClassName="nav-icon" icon={cilFilterSquare} /> PreFill</CNavItem>
                        <CNavItem href="#JcaEnriquecimento" onClick={() => onNavClick('JcaEnriquecimento')}><CIcon customClassName="nav-icon" icon={cilAddressBook} /> JCA Enriquecimento</CNavItem>
                    </CSidebarNav>
                    <CSidebarHeader className="border-top" />
                </CSidebar>
            </animated.div>
        </>
    );
}

export default SideBar





