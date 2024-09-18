import React, { useEffect, useState } from 'react';
import * as core from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilGraph } from "@coreui/icons";

const icnWidgetConsumReq = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const myHeaders = new Headers();
            myHeaders.append("i-token", "rvxdviev66at8db8p3av3jkckk50wd");
            myHeaders.append("metric", "c-trustscore");

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            try {
                const response = await fetch("/metrics", requestOptions);
                const result = await response.json();
                setData(result);
                // console.log("grafico data:", result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const percentAnual = data ? (data.rows[0].metricvalue / data.rows[0].targetAnual) * 100 : 0;
    const percentMonth = data ? (data.rows[0].metricvalue / data.rows[0].targetMonth) * 100 : 0;

    return (
        <>
            <div>
                <core.CRow >
                    <core.CCol xs={4}  >
                        <core.CWidgetStatsC
                            className="mb-3 bg-primary shadow-lg"
                            inverse

                            progress={{ color: 'light', value: percentAnual }}
                            text="Widget helper text"
                            title="Total Requests"
                            value={data ? (data.rows[0].metricvalue + " / " + (data.rows[0].targetAnual || 'Loading...')) : 'Loading...'}
                        />
                    </core.CCol>
                    <core.CCol xs={4}>
                        <core.CWidgetStatsC
                            className="mb-3 bg-danger shadow-lg"
                            inverse
                            progress={{ color: 'light', value: percentMonth }}
                            text="Widget helper text"
                            title="Last off 30 Days"
                            value={data ? (data.rows[1].metricvalue + " / " + (data.rows[1].targetMonth || 'Loading...')) : 'Loading...'}
                        />
                    </core.CCol>
                    <core.CCol xs={4}>
                        <core.CWidgetStatsC
                            className="mb-3 bg-warning"
                            inverse
                            title="Last off 7 Days"
                            value={data ? data.rows[2].metricvalue : 'Loading...'}
                        />
                    </core.CCol>
                </core.CRow>
            </div>
        </>
    )
}

export default icnWidgetConsumReq;