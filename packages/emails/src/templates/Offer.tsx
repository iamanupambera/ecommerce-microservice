const sender = '';
export const subject = `You have received a custom offer from ${sender}`;

export default function Offer({
  buyerUsername,
  sellerUsername,
  title,
  appLink,
  appIcon,
  description,
  deliveryDays,
  offerLink,
  amount,
}: {
  buyerUsername: string;
  sellerUsername: string;
  title: string;
  appLink: string;
  appIcon: string;
  description: string;
  deliveryDays: string;
  offerLink: string;
  amount: string;
}) {
  return (
    <div>
      <div>
        <div style={{ margin: 0, padding: 0 }}>
          <div></div>
          <table
            cellSpacing="0"
            cellPadding="0"
            style={{
              width: '100%',
              borderSpacing: 0,
              borderCollapse: 'collapse',
            }}
          >
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
                  style={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: '#eeeeee',
                  }}
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
                                  style={{ padding: '40px 40px 20px 40px' }}
                                >
                                  <a href={appLink} target="_blank">
                                    <img
                                      src={appIcon}
                                      width="70"
                                      style={{ verticalAlign: 'middle' }}
                                      className="CToWUd"
                                      data-bit="iit"
                                    />
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td align="center">
                                  <h1
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                      fontSize: '20px',
                                      lineHeight: '140%',
                                      fontFamily:
                                        'Arial, Helvetica, sans-serif',
                                      color: '#272528',
                                      textAlign: 'center',
                                    }}
                                  >
                                    Hi {buyerUsername},
                                  </h1>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '5px', lineHeight: '5px' }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td align="center">
                                  <h2
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                      fontSize: '16px',
                                      lineHeight: '140%',
                                      fontWeight: 500,
                                      fontFamily:
                                        'Arial, Helvetica, sans-serif',
                                      color: '#272528',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {sellerUsername} sent you a new Custom
                                    Offer.
                                  </h2>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '20px', lineHeight: '20px' }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            border={0}
                            align="center"
                            width="100%"
                            style={{
                              borderCollapse: 'collapse',
                              textAlign: 'left',
                              padding: '40px 20px 0px 20px',
                              margin: 0,
                            }}
                            cellSpacing="0"
                            cellPadding="0"
                          >
                            <tbody style={{ padding: '20px 40px 0px 40px' }}>
                              <tr>
                                <td style={{ height: '10px' }}></td>
                              </tr>
                              <tr>
                                <td
                                  valign="middle"
                                  align="left"
                                  style={{ textAlign: 'left' }}
                                >
                                  <p
                                    style={{
                                      borderTop: '1px solid #d6d6d6',
                                      padding: '20px 20px 0px 20px',
                                      margin: '0',
                                      fontWeight: 700,
                                      fontSize: '16px',
                                      lineHeight: '140%',
                                      fontFamily:
                                        'Arial, Helvetica, sans-serif',
                                      color: '#0e0e0f',
                                    }}
                                  >
                                    {title}
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '10px', lineHeight: '10px' }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td
                                  align="left"
                                  style={{
                                    textAlign: 'left',
                                    padding: '20px 20px 0px 20px',
                                  }}
                                >
                                  <p
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                      fontSize: '14px',
                                      lineHeight: '140%',
                                      fontWeight: 'normal',
                                      fontFamily:
                                        'Arial, Helvetica, sans-serif',
                                      color: '#272528',
                                    }}
                                  >
                                    {description}
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '20px', lineHeight: '20px' }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td
                                  align="left"
                                  style={{ textAlign: 'left' }}
                                ></td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '10px', lineHeight: '10px' }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td
                                  align="left"
                                  style={{
                                    textAlign: 'left',
                                    padding: '20px 20px 0px 20px',
                                  }}
                                >
                                  <ul
                                    style={{
                                      margin: 0,
                                      listStyle: 'none',
                                      width: '100%',
                                      borderBottom: '1px solid #d6d6d6',
                                      padding: '0 0 10px 0',
                                      marginBottom: '5px',
                                    }}
                                  >
                                    <li
                                      style={{
                                        margin: 0,
                                        padding: 0,
                                        display: 'inline-block',
                                        paddingRight: '20px',
                                        paddingBottom: '10px',
                                      }}
                                    >
                                      <p
                                        style={{
                                          margin: 0,
                                          padding: 0,
                                          fontSize: '14px',
                                          lineHeight: '140%',
                                          fontFamily:
                                            'Arial, Helvetica, sans-serif',
                                          color: '#272528',
                                          textTransform: 'capitalize',
                                        }}
                                      >
                                        <span>{deliveryDays}</span>
                                        days Delivery
                                      </p>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '15px', lineHeight: '15px' }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            width="100%"
                            align="center"
                            style={{
                              margin: 0,
                              padding: 0,
                              width: '100%',
                              borderCollapse: 'collapse',
                              textAlign: 'center',
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  height="40"
                                  style={{
                                    textAlign: 'center',
                                    height: '40px',
                                  }}
                                >
                                  <a
                                    href={offerLink}
                                    style={{
                                      width: '100px',
                                      backgroundColor: '#4aa1f3',
                                      padding: '10px 35px',
                                      borderRadius: '3px',
                                      textAlign: 'center',
                                      fontSize: '16px',
                                      lineHeight: '140%',
                                      fontWeight: '500',
                                      fontFamily:
                                        'Arial, Helvetica, sans-serif',
                                      color: '#f9f9f9',
                                      textDecoration: 'none',
                                      margin: 0,
                                    }}
                                    target="_blank"
                                  >
                                    Order Now (${amount})
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '20px', lineHeight: '20px' }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '20px', lineHeight: '20px' }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div
                                    style={{
                                      paddingTop: '10px',
                                      textAlign: 'center',
                                      fontFamily: 'arial',
                                    }}
                                  >
                                    Thanks
                                    <br />
                                    <br />
                                    The Jobber Team
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ height: '20px', lineHeight: '20px' }}
                                >
                                  &nbsp;
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
        </div>
      </div>
    </div>
  );
}
