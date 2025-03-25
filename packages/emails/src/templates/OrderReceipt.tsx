export const subject = "Hers's your order receipt";

export default function OrderReceipt({
  appLink,
  appIcon,
  buyerUsername,
  title,
  description,
  amount,
  serviceFee,
  total,
  orderUrl,
}: {
  appLink: string;
  appIcon: string;
  buyerUsername: string;
  title: string;
  description: string;
  amount: string;
  serviceFee: string;
  total: string;
  orderUrl: string;
}) {
  return (
    <div>
      <div></div>
      <div tabIndex={-1}></div>
      <div>
        <div>
          <u></u>

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
                                    style={{ padding: '40px 40px 0px' }}
                                  >
                                    <a
                                      href={appLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
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
                                    style={{
                                      fontSize: '18px',
                                      color: '#0e0e0f',
                                      fontWeight: 700,
                                      fontFamily: 'Helvetica Neue',
                                      lineHeight: '28px',
                                      textAlign: 'center',
                                      padding: '35px 40px 0px',
                                    }}
                                  >
                                    <strong>Your Order Receipt</strong>
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
                                    style={{
                                      font: "16px/22px 'Helvetica Neue', Arial, 'sans-serif'",
                                      textAlign: 'left',
                                      color: '#555555',
                                      padding: '40px 40px 0 40px',
                                    }}
                                  >
                                    <p>Hi {buyerUsername},</p>
                                    <p>Congrats!</p>
                                    <p>
                                      You've accomplished something today.
                                      Here's your
                                      <br />
                                      receipt:
                                    </p>

                                    <table
                                      align="center"
                                      style={{
                                        color: '#555',
                                        margin: 0,
                                        width: '100%',
                                      }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td style={{ color: '#555' }}>
                                            <table
                                              cellSpacing="0"
                                              cellPadding="8"
                                              style={{
                                                font: "16px/22px 'Helvetica Neue', Arial, 'sans-serif'",
                                                border: 0,
                                                width: '100%',
                                                borderCollapse: 'collapse',
                                                backgroundColor: '#f2f2f2',
                                              }}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style={{
                                                      color: '#000',
                                                      borderBottom:
                                                        '1px solid #fff',
                                                      fontWeight: 'bold',
                                                      textAlign: 'left',
                                                    }}
                                                  >
                                                    Item
                                                  </td>
                                                  <td
                                                    style={{
                                                      color: '#000',
                                                      borderBottom:
                                                        '1px solid #fff',
                                                      fontWeight: 'bold',
                                                      width: '20%',
                                                    }}
                                                  >
                                                    Qty
                                                  </td>
                                                  <td
                                                    style={{
                                                      color: '#000',
                                                      borderBottom:
                                                        '1px solid #fff',
                                                      fontWeight: 'bold',
                                                      width: '40px',
                                                      textAlign: 'right',
                                                    }}
                                                  >
                                                    Price
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{
                                                      color: '#555555',
                                                      fontWeight: 'bold',
                                                      textAlign: 'left',
                                                      borderRight:
                                                        '1px solid #ffffff',
                                                      borderBottom:
                                                        '1px solid #ffffff',
                                                    }}
                                                  >
                                                    {title} -{' '}
                                                    <span
                                                      style={{
                                                        fontWeight: 'normal',
                                                      }}
                                                    >
                                                      {description}
                                                    </span>
                                                  </td>
                                                  <td
                                                    style={{
                                                      color: '#555',
                                                      borderRight:
                                                        '1px solid #fff',
                                                      borderBottom:
                                                        '1px solid #fff',
                                                    }}
                                                  >
                                                    × 1
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'right',
                                                      color: '#555',
                                                      borderBottom:
                                                        '1px solid #fff',
                                                    }}
                                                  >
                                                    ${amount}
                                                  </td>
                                                </tr>
                                                <tr
                                                  style={{
                                                    borderTop: '1px solid #fff',
                                                  }}
                                                >
                                                  <td
                                                    style={{
                                                      color: '#555',
                                                      textAlign: 'left',
                                                    }}
                                                    colSpan={2}
                                                  >
                                                    Service Fee
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'right',
                                                      color: '#555',
                                                    }}
                                                  >
                                                    ${serviceFee}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <div
                                              style={{
                                                textAlign: 'right',
                                                padding: '10px 8px 10px 0px',
                                                color: '#000',
                                                fontWeight: 'bold',
                                                backgroundColor: '#f2f2f2',
                                                borderTop: '1px solid #fff',
                                              }}
                                            >
                                              Total: ${total}
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <p>
                                      You can contact the seller if you need
                                      more information.
                                    </p>

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
                                                backgroundColor: '#1dbf73',
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
                                              rel="noopener noreferrer"
                                            >
                                              View Your Order
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
      </div>
    </div>
  );
}
