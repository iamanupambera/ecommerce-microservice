export const subject = 'Verify Your Email';

export default function VerifyEmail({
  appLink,
  appIcon,
  verifyLink,
}: {
  appLink: string;
  appIcon: string;
  verifyLink: string;
}) {
  return (
    <div
      style={{
        height: '100%',
        margin: 0,
        padding: 0,
        width: '100%',
        backgroundColor: '#f5f4f2',
      }}
    >
      <center>
        <table
          align="center"
          border={0}
          cellPadding="0"
          cellSpacing="0"
          width="100%"
          style={{
            borderCollapse: 'collapse',
            height: '100%',
            margin: 0,
            padding: 0,
            width: '100%',
            backgroundColor: '#f5f4f2',
          }}
        >
          <tbody>
            <tr>
              <td
                align="center"
                valign="top"
                style={{
                  height: '100%',
                  margin: 0,
                  padding: '8px',
                  width: '100%',
                  borderTop: 0,
                }}
              >
                <table
                  border={0}
                  cellPadding="0"
                  cellSpacing="0"
                  width="100%"
                  style={{
                    borderCollapse: 'collapse',
                    border: 0,
                    borderRadius: '16px',
                    maxWidth: '600px',
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        valign="top"
                        style={{
                          backgroundColor: '#ffffff',
                          borderTop: 0,
                          borderBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          borderRadius: '16px 16px 0 0',
                        }}
                      >
                        <table
                          border={0}
                          cellPadding="0"
                          cellSpacing="0"
                          width="100%"
                          style={{
                            minWidth: '100%',
                            borderCollapse: 'collapse',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td valign="top" style={{ padding: '16px' }}>
                                <table
                                  align="left"
                                  width="100%"
                                  border={0}
                                  cellPadding="0"
                                  cellSpacing="0"
                                  style={{
                                    minWidth: '100%',
                                    borderCollapse: 'collapse',
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        valign="top"
                                        style={{
                                          padding: '16px',
                                          textAlign: 'center',
                                        }}
                                      >
                                        <a
                                          href={appLink}
                                          style={{
                                            lineHeight: 'inherit',
                                            color: '#4aa1f3',
                                            fontWeight: 'normal',
                                            textDecoration: 'underline',
                                          }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img
                                            alt="App logo"
                                            src={appIcon}
                                            width="190"
                                            style={{
                                              width: '35.4477%',
                                              maxWidth: '380px',
                                              paddingBottom: 0,
                                              verticalAlign: 'bottom',
                                              border: 0,
                                              height: 'auto',
                                              outline: 'none',
                                              textDecoration: 'none',
                                              fontFamily:
                                                'Arial, Helvetica, sans-serif',
                                              fontSize: '16px',
                                              lineHeight: '1.5em',
                                              color: '#4aa1f3',
                                              display: 'inline',
                                            }}
                                          />
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
                        valign="top"
                        style={{
                          backgroundColor: '#ffffff',
                          borderTop: 0,
                          borderBottom: 0,
                          paddingTop: '8px',
                          paddingBottom: '8px',
                        }}
                      >
                        <table
                          border={0}
                          cellPadding="0"
                          cellSpacing="0"
                          width="100%"
                          style={{
                            minWidth: '100%',
                            borderCollapse: 'collapse',
                            tableLayout: 'fixed',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  minWidth: '100%',
                                  padding: '0 32px 0px 32px',
                                }}
                              >
                                <table
                                  border={0}
                                  cellPadding="0"
                                  cellSpacing="0"
                                  width="100%"
                                  style={{
                                    minWidth: '100%',
                                    borderTop: '1px solid #f5f4f2',
                                    borderCollapse: 'collapse',
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <span></span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          border={0}
                          cellPadding="0"
                          cellSpacing="0"
                          width="100%"
                          style={{
                            minWidth: '100%',
                            borderCollapse: 'collapse',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td valign="top">
                                <table
                                  align="left"
                                  border={0}
                                  cellPadding="0"
                                  cellSpacing="0"
                                  width="100%"
                                  style={{
                                    maxWidth: '100%',
                                    minWidth: '100%',
                                    borderCollapse: 'collapse',
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        valign="top"
                                        style={{
                                          wordBreak: 'break-word',
                                          color: '#0c0c14',
                                          fontFamily:
                                            'Arial, Helvetica, sans-serif',
                                          fontSize: '16px',
                                          lineHeight: '1.5em',
                                          textAlign: 'left',
                                          padding: '8px 32px 12px 32px',
                                        }}
                                      >
                                        <p style={{ margin: '12px 0px' }}>
                                          Welcome to Jobber!
                                        </p>
                                        <p style={{ margin: '12px 0px' }}>
                                          In order to get started, you need to
                                          verify your email address.
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          border={0}
                          cellPadding="0"
                          cellSpacing="0"
                          width="100%"
                          style={{
                            minWidth: '100%',
                            borderCollapse: 'collapse',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                valign="top"
                                align="left"
                                style={{
                                  textAlign: 'center',
                                  padding: '0px 32px 32px 32px',
                                }}
                              >
                                <table
                                  border={0}
                                  cellPadding="0"
                                  cellSpacing="0"
                                  style={{
                                    borderRadius: '8px',
                                    backgroundColor: '#4aa1f3',
                                    margin: 'auto',
                                    borderCollapse: 'separate',
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        align="center"
                                        valign="middle"
                                        style={{
                                          fontFamily:
                                            'Arial, Helvetica, sans-serif',
                                          fontSize: '16px',
                                          padding: '12px 32px',
                                        }}
                                      >
                                        <a
                                          href={verifyLink}
                                          style={{
                                            fontWeight: 'normal',
                                            letterSpacing: '1px',
                                            lineHeight: '1.5em',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            color: '#ffffff',
                                            display: 'block',
                                          }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          Verify email address
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          border={0}
                          cellPadding="0"
                          cellSpacing="0"
                          width="100%"
                          style={{
                            minWidth: '100%',
                            borderCollapse: 'collapse',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td valign="top">
                                <table
                                  align="left"
                                  border={0}
                                  cellPadding="0"
                                  cellSpacing="0"
                                  width="100%"
                                  style={{
                                    maxWidth: '100%',
                                    minWidth: '100%',
                                    borderCollapse: 'collapse',
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        valign="top"
                                        style={{
                                          wordBreak: 'break-word',
                                          color: '#0c0c14',
                                          fontFamily:
                                            'Arial, Helvetica, sans-serif',
                                          fontSize: '16px',
                                          lineHeight: '1.5em',
                                          textAlign: 'left',
                                          padding: '8px 32px 12px 32px',
                                        }}
                                      >
                                        <p style={{ margin: '12px 0px' }}>
                                          Best,
                                          <br />
                                          The Jobber Team
                                        </p>
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
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
}
