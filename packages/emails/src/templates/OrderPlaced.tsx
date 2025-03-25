const buyerUsername = '';
export const subject = `You've received an order from ${buyerUsername}`;

export default function OrderPlaced({
  appLink,
  appIcon,
  buyerUsername,
  sellerUsername,
  orderUrl,
  orderId,
  orderDue,
  title,
  description,
  amount,
  requirements,
}: {
  appLink: string;
  appIcon: string;
  buyerUsername: string;
  sellerUsername: string;
  orderUrl: string;
  orderId: string;
  orderDue: string;
  title: string;
  description: string;
  amount: string;
  requirements: string;
}) {
  return (
    <div>
      <div></div>
      <div tabIndex={-1}></div>
      <div>
        <div>
          <u></u>

          <div style={{ margin: '0 !important', padding: '0 !important' }}>
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
                                      textAlign: 'center',
                                      padding: '35px 40px 0px 40px',
                                    }}
                                  >
                                    <strong>
                                      You just received an order from{' '}
                                      {buyerUsername}
                                      <br />
                                      Please review the requirements below:
                                    </strong>
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
                                    <p>Hi {sellerUsername},</p>
                                    <p>
                                      You've just received an order from{' '}
                                      {buyerUsername}! Feels good, right?
                                      <br />
                                      Order{' '}
                                      <a
                                        href={orderUrl}
                                        style={{
                                          color: '#4aa1f3',
                                          textDecoration: 'none',
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        #{orderId}
                                      </a>{' '}
                                      is due <strong>{orderDue}</strong>.
                                    </p>

                                    <table
                                      align="center"
                                      style={{
                                        color: '#555555',
                                        margin: '0',
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
                                                border: 'none',
                                                borderBottom:
                                                  '1px solid #aeaeae',
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
                                                      textAlign: 'left',
                                                    }}
                                                  >
                                                    Item
                                                  </td>
                                                  <td
                                                    style={{
                                                      color: '#000000',
                                                      borderBottom:
                                                        '1px solid #aeaeae',
                                                      fontWeight: 'bold',
                                                      width: '20%',
                                                    }}
                                                  >
                                                    Qty
                                                  </td>
                                                  <td
                                                    style={{
                                                      color: '#000000',
                                                      borderBottom:
                                                        '1px solid #aeaeae',
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
                                                        '1px solid #aeaeae',
                                                      borderBottom:
                                                        '1px solid #aeaeae',
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
                                                      color: '#555555',
                                                      borderRight:
                                                        '1px solid #aeaeae',
                                                      borderBottom:
                                                        '1px solid #aeaeae',
                                                    }}
                                                  >
                                                    × 1
                                                  </td>
                                                  <td
                                                    style={{
                                                      textAlign: 'right',
                                                      color: '#555555',
                                                      borderBottom:
                                                        '1px solid #aeaeae',
                                                    }}
                                                  >
                                                    ${amount}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <div
                                              style={{
                                                textAlign: 'right',
                                                padding: '10px 8px 10px 0px',
                                                color: '#000000',
                                                fontSize: '16px',
                                                fontFamily: 'arial',
                                                fontWeight: 700,
                                              }}
                                            >
                                              Total: ${amount}
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <p
                                      style={{
                                        fontWeight: 500,
                                        paddingTop: '20px',
                                      }}
                                    >
                                      The buyer has provided the following order
                                      requirements:
                                    </p>

                                    <ol
                                      style={{
                                        margin: '0',
                                        padding: '0 20px',
                                      }}
                                    >
                                      <li>
                                        <p style={{ marginBottom: '0' }}>
                                          Requirements
                                        </p>

                                        <p style={{ margin: '0' }}>
                                          {requirements}
                                        </p>
                                      </li>
                                    </ol>

                                    <table
                                      cellPadding="0"
                                      cellSpacing="0"
                                      width="100%"
                                      style={{
                                        marginTop: '50px',
                                      }}
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
                                                font: "16px/22px 'Helvetica Neue', Arial, 'sans-serif'",
                                                textAlign: 'center',
                                                color: '#555555',
                                                padding: '0 0 20px 0',
                                                margin: '0',
                                              }}
                                            >
                                              Got everything you need?
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
                                              rel="noopener noreferrer"
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
      </div>
    </div>
  );
}
