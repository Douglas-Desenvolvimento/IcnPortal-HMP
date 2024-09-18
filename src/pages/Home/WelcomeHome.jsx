import React from 'react'
import * as core from "@coreui/react";
const WelcomeHome = ({ username }) => {
    //console.log("WelcomeHome: ", username)
    return (
        <>
            <div className="mt-0 pt-2 pb-2 pr-0 shadow bg-light-subtle bg-gradient rounded border border-light d-flex justify-content-center align-items-center" style={{ flex: '1 1 auto', overflow: 'auto', minHeight: '500px', minWidth: '1160px', marginLeft: 'auto' }}>
                <core.CContainer fluid>
                    <core.CCallout className='shadow-lg bg-secondary-subtitle '>
                        <h2>
                            Welcome to the Fraud Portal, {username}!
                        </h2>
                        <br />
                        <p className='fs-4'>
                            To navigate, click on the menu on the side
                        </p>
                    </core.CCallout>
                </core.CContainer>
            </div>
        </>
    )
}

export default WelcomeHome