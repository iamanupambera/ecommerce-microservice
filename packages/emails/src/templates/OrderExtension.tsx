export default function OrderExtension({
  appLink,
  appIcon,
  buyerUsername,
  sellerUsername,
  originalDate,
  newDate,
  reason,
  orderUrl,
}: {
  appLink: string;
  appIcon: string;
  buyerUsername: string;
  sellerUsername: string;
  originalDate: string;
  newDate: string;
  reason: string;
  orderUrl: string;
}) {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <table border={0} cellPadding="0" cellSpacing="0" width="100%">
        <tbody>
          <tr>
            <td
              width="100%"
              align="center"
              valign="top"
              style={{
                backgroundColor: '#eeeeee',
              }}
              height="20"
            ></td>
          </tr>
          <tr>
            <td
              align="center"
              style={{ padding: '0px 15px', backgroundColor: '#eeeeee' }}
            >
              <table
                bgcolor="#ffffff"
                border={0}
                cellPadding="0"
                cellSpacing="0"
                width="100%"
                style={{ maxWidth: '600px' }}
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        width="100%"
                        border={0}
                        cellSpacing="0"
                        cellPadding="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              align="center"
                              style={{ padding: '40px 40px 0px 40px' }}
                            >
                              <a
                                href={appLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={appIcon}
                                  width="70"
                                  alt="App Icon"
                                  style={{ verticalAlign: 'middle' }}
                                />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              height="1"
                              style={{
                                padding: '40px 40px 5px',
                                backgroundColor: '#ffffff',
                              }}
                              valign="top"
                              width="100%"
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{ borderTop: '1px solid #e4e4e4' }}
                                    ></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                font: "16px/22px 'Helvetica Neue', Arial, sans-serif",
                                textAlign: 'left',
                                color: '#555555',
                                padding: '40px 40px 0 40px',
                              }}
                            >
                              <p>Hi {buyerUsername},</p>
                              <br />
                              <p>
                                You've just received an order delivery extension
                                request from {sellerUsername}.<br />
                                You can approve or reject the request.
                              </p>
                              <table
                                align="center"
                                style={{
                                  color: '#555555',
                                  margin: 0,
                                  width: '100%',
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        color: '#555555',
                                        border: '1px solid #aeaeae',
                                        borderRadius: '3px',
                                      }}
                                    >
                                      <table
                                        cellSpacing="0"
                                        cellPadding="8"
                                        style={{
                                          borderBottom: '1px solid #aeaeae',
                                          width: '100%',
                                          fontFamily: 'arial',
                                        }}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                color: '#000000',
                                                borderBottom:
                                                  '1px solid #aeaeae',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                fontSize: '14px',
                                                width: '30%',
                                              }}
                                            >
                                              Original date
                                            </td>
                                            <td
                                              style={{
                                                color: '#000000',
                                                borderBottom:
                                                  '1px solid #aeaeae',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                fontSize: '14px',
                                                width: '30%',
                                              }}
                                            >
                                              New date
                                            </td>
                                            <td
                                              style={{
                                                color: '#000000',
                                                borderBottom:
                                                  '1px solid #aeaeae',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                fontSize: '14px',
                                              }}
                                            >
                                              Reason
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                color: '#555555',
                                                textAlign: 'left',
                                                borderRight:
                                                  '1px solid #aeaeae',
                                                borderBottom:
                                                  '1px solid #aeaeae',
                                                fontSize: '14px',
                                              }}
                                            >
                                              {originalDate}
                                            </td>
                                            <td
                                              style={{
                                                color: '#555555',
                                                borderRight:
                                                  '1px solid #aeaeae',
                                                borderBottom:
                                                  '1px solid #aeaeae',
                                                fontSize: '14px',
                                              }}
                                            >
                                              {newDate}
                                            </td>
                                            <td
                                              style={{
                                                textAlign: 'left',
                                                color: '#555555',
                                                borderBottom:
                                                  '1px solid #aeaeae',
                                                fontSize: '14px',
                                              }}
                                            >
                                              {reason}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table
                                width="100%"
                                border={0}
                                cellSpacing="0"
                                cellPadding="0"
                                style={{ margin: '30px 0px' }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      style={{ textAlign: 'center' }}
                                    >
                                      <p
                                        style={{
                                          font: "16px/22px 'Helvetica Neue', Arial, sans-serif",
                                          textAlign: 'center',
                                          color: '#555555',
                                          padding: '0 0 20px 0',
                                          margin: 0,
                                        }}
                                      >
                                        Ready to approve or reject request?
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      style={{ textAlign: 'center' }}
                                    >
                                      <a
                                        style={{
                                          color: '#ffffff',
                                          backgroundColor: '#4aa1f3',
                                          display: 'inline-block',
                                          fontFamily: 'Helvetica Neue',
                                          fontSize: '16px',
                                          lineHeight: '30px',
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                          textDecoration: 'none',
                                          padding: '5px 20px',
                                          borderRadius: '3px',
                                          textTransform: 'none',
                                        }}
                                        href={orderUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        View Request
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      width="100%"
                      align="center"
                      valign="top"
                      style={{ backgroundColor: '#ffffff' }}
                      height="45"
                    ></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
