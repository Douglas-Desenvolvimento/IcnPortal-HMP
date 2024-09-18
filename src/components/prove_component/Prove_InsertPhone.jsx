import React, { useState, useEffect } from "react";
import * as core from "@coreui/react";
import { IMaskMixin } from "react-imask";
import CIcon from "@coreui/icons-react";
import { cilPhone } from "@coreui/icons";
import IcnProveTrustV1Endpoint from "../../hooks/IcdProvePRD/icnProveTrustV1Endpoint";
import useAuthentication from "../../hooks/useAuthentication";
import Prove_TrustScore_Gouge from "./Prove_TrustScore_Gouge";
import IcnTableDetail from "../audit_component/icnTableDetail";
import { CSSTransition } from "react-transition-group";
import "../../App.css";

const Prove_InsertPhone = () => {
  const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
    <core.CFormInput {...props} ref={inputRef} />
  ));

  const [validated, setValidated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [dados, setDados] = useState(null);
  const [trustScore, setTrustScore] = useState(0);
  const [showTrustScore, setShowTrustScore] = useState(false);
  const [showFirstTable, setShowFirstTable] = useState(false);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const { getLoggedInUser } = useAuthentication();
  const [username, setUserName] = useState(null);
  const [siteid, setSiteId] = useState(null);
  const [loginid, setLoginId] = useState(null);
  const [reqId, setReqId] = useState(null);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchUserSiteId = async () => {
      try {
        const userData = await getLoggedInUser();
        if (userData) {
          setUserName(userData.loggedInUser);
          setSiteId(userData.siteid);
          setLoginId(userData.loggedInUser);
          setReqId(userData.requestId);
        }
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error.message);
      }
    };

    fetchUserSiteId();
  }, [getLoggedInUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !checkBoxChecked) {
      setValidated(true);
      event.stopPropagation();
    } else {
      setShowSpinner(true);
      const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");


      try {
        const response = await IcnProveTrustV1Endpoint({
          formattedPhoneNumber,
          siteid,
          loginid,
        });

        const tableData = {
          username: response.username,
          siteid: response.siteid,
          requestId: response.requestId,
          status: response.status,
          timestamp: response.timestamp,
          mobile: response.mobile,
          trustscore: response.trustscore,
          indicators: response.indicators,
          riskLevel: response.details && response.details.length > 0 ? response.details[0].riskLevel : null,
          troubleshootingId: response.troubleshootingId,
          carrier: response.numberInfo ? response.numberInfo.carrier : null,
          lineType: response.numberInfo ? response.numberInfo.lineType : null,
          countryCode: response.numberInfo ? response.numberInfo.countryCode : null,
        };

        setRowData([tableData]);
        setDados(response);
        setTrustScore(response.trustscore);
        setShowTrustScore(true);
        setShowFirstTable(true);
        setShowSecondTable(true);
      } catch (error) {
        console.error("Erro ao chamar a API Trust:", error);
      }

      setShowSpinner(false);
      setValidated(false);
      setPhoneNumber("");
    }
  };

  const handlePhoneNumberBlur = (event) => {
    const formattedPhoneNumber = event.target.value.replace(/\D/g, "");
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleCheckBoxChange = (event) => {
    setCheckBoxChecked(event.target.checked);
  };

  return (
    <>
      <div>
        <core.CCard
          className={`p-2 mb-3 bg-light bg-gradient border-dark-subtitle border-top-3 shadow`}
        >
          <core.CRow>
            <core.CCol sm={7} className="m-5">
              <core.CCardGroup>
                <core.CCard
                  style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                  className="w-50 mb-1 p-2 bg-gradient border-dark-subtitle shadow"
                >
                  <core.CCardBody>
                    <core.CCardTitle className="text-start">
                      Insert your Phone
                    </core.CCardTitle>
                    <core.CForm noValidate validated={validated} onSubmit={handleSubmit}>
                      <core.CInputGroup>
                        <core.CInputGroupText id="addon-wrapping">
                          <i className="cil-user"></i>
                          <CIcon
                            icon={cilPhone}
                            className="text-secondary"
                            size="lg"
                            title="Phone"
                          />
                        </core.CInputGroupText>
                        <CFormInputWithMask
                          mask="+55 (00) 00000-0000"
                          type="text"
                          id="validationCustom01"
                          required
                          value={phoneNumber}
                          onBlur={handlePhoneNumberBlur}
                          onChange={() => { }} // Evite mudanças diretas no onChange
                          style={{ width: "50%" }} // Define a largura do input como 100%
                        />
                        <core.CButton
                          className="rounded border border-dark"
                          color="secondary"
                          type="submit"
                          disabled={!checkBoxChecked}
                        >
                          {showSpinner ? (
                            <core.CSpinner
                              as="span"
                              size="sm"
                              aria-hidden="true"
                              style={{ marginRight: "5px" }}
                            />
                          ) : (
                            "Check Number"
                          )}
                        </core.CButton>

                        <core.CFormCheck
                          className="mt-2 text-start"
                          type="checkbox"
                          id="invalidCheck"
                          label="Click to authorize the use of data"
                          checked={checkBoxChecked}
                          onChange={handleCheckBoxChange}
                        />
                        <core.CFormFeedback invalid>
                          You need to authorize the use of data.
                        </core.CFormFeedback>
                      </core.CInputGroup>
                    </core.CForm>
                  </core.CCardBody>
                </core.CCard>
              </core.CCardGroup>
            </core.CCol>
            <core.CCol>
              <core.CCard className="p-2 mb-3 border border-dark-subtitle border-top-1 shadow">
                <core.CCardHeader className="mb-2 border-light fs-5 fw-bold">
                  Score
                </core.CCardHeader>
                <core.CCardBody style={{ width: "260px", height: "200px", paddingTop: 0 }}>
                  <CSSTransition
                    in={showTrustScore}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                  >
                    <Prove_TrustScore_Gouge trustScore={trustScore} />
                  </CSSTransition>
                </core.CCardBody>
              </core.CCard>
            </core.CCol>
          </core.CRow>
          <core.CCard className="p-1 m-1 border-dark-subtitle border-top-1 shadow">
            <core.CCardHeader className="m-1 border-light fs-4 text-start">
              Results
            </core.CCardHeader>
            <core.CCardBody className="m-0 p-0 border border-dark-subtitle rounded">
              <IcnTableDetail rows={rowData} />
            </core.CCardBody>
          </core.CCard>
        </core.CCard>

      </div>
    </>
  );
};

export default Prove_InsertPhone;
