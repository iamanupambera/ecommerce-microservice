export default function OrderExtensionApproval({
  appLink,
  appIcon,
  header,
  sellerUsername,
  buyerUsername,
  type,
  message,
  orderUrl,
}: {
  appLink: string;
  appIcon: string;
  header: string;
  sellerUsername: string;
  buyerUsername: string;
  type: string;
  message: string;
  orderUrl: string;
}) {
  return (
    <div className="im">
      <div style={{ margin: 0, padding: 0 }}>
        <table border={0} cellPadding="0" cellSpacing="0" width="100%">
          <tbody>
            <tr>
              <td
                width="100%"
                align="center"
                valign="top"
                style={{ backgroundColor: '#eeeeee' }}
                height="20"
              ></td>
            </tr>
            <tr>
              <td
                align="center"
                style={{ padding: '0 15px', backgroundColor: '#eeeeee' }}
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
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={appIcon}
                                    width="70"
                                    style={{ verticalAlign: 'middle' }}
                                    alt="App Icon"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style={{
                                  fontSize: '18px',
                                  color: '#0e0e0f',
                                  fontWeight: 700,
                                  fontFamily: 'Helvetica Neue',
                                  lineHeight: '28px',
                                  verticalAlign: 'top',
                                  textAlign: 'center',
                                  padding: '35px 40px 0px 40px',
                                }}
                              >
                                <strong>{header}</strong>
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
                                        style={{
                                          borderTop: '1px solid #e4e4e4',
                                        }}
                                      ></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="content"
                                style={{
                                  font: "16px/22px 'Helvetica Neue', Arial, 'sans-serif'",
                                  textAlign: 'left',
                                  color: '#555555',
                                  padding: '10px 40px 0 40px',
                                }}
                              >
                                <p>Hi {sellerUsername},</p>
                                <p>
                                  The order extension request sent to{' '}
                                  <span style={{ fontWeight: 'bold' }}>
                                    {buyerUsername}
                                  </span>{' '}
                                  was {type}.
                                </p>
                                <p>{message}</p>
                                <p>
                                  Thanks,
                                  <br />
                                  The Jobber Team
                                </p>
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
                                        >
                                          View Order
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
    </div>
  );
}
