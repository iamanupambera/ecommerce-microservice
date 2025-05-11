export default function OrderDelivered({
  appLink,
  appIcon,
  buyerUsername,
  sellerUsername,
  title,
  orderUrl,
}: {
  appLink: string;
  appIcon: string;
  buyerUsername: string;
  sellerUsername: string;
  title: string;
  orderUrl: string;
}) {
  return (
    <div>
      <div style={{ margin: '0 !important', padding: '0 !important' }}>
        <table
          border={0}
          cellPadding="0"
          cellSpacing="0"
          width="100%"
          style={{ backgroundColor: '#eeeeee' }}
        >
          <tbody>
            <tr>
              <td
                width="100%"
                align="center"
                valign="top"
                height="20"
                style={{ backgroundColor: '#eeeeee' }}
              ></td>
            </tr>
            <tr>
              <td
                align="center"
                style={{
                  padding: '0px 15px',
                  backgroundColor: '#eeeeee',
                }}
              >
                <table
                  width="100%"
                  style={{
                    maxWidth: '600px',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <table width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style={{ padding: '40px' }}>
                                <a
                                  href={appLink}
                                  target="_blank"
                                  rel="noreferrer"
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
                                  fontWeight: '700',
                                  fontFamily: 'Helvetica Neue',
                                  lineHeight: '28px',
                                  textAlign: 'center',
                                  padding: '35px 40px 0px 40px',
                                }}
                              >
                                <strong>Consider it Done</strong>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style={{
                                  padding: '40px',
                                  borderTop: '1px solid #e4e4e4',
                                }}
                              ></td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  font: "16px/22px 'Helvetica Neue', Arial, 'sans-serif'",
                                  textAlign: 'left',
                                  color: '#555555',
                                  padding: '10px 40px 0 40px',
                                }}
                              >
                                <p>Hi {buyerUsername},</p>
                                <p>
                                  The Gig you ordered:{' '}
                                  <span style={{ fontWeight: 'bold' }}>
                                    {title}
                                  </span>{' '}
                                  from{' '}
                                  <span style={{ fontWeight: 'bold' }}>
                                    {sellerUsername}
                                  </span>{' '}
                                  is ready for your review.
                                </p>
                                <p>
                                  To cross it off your to-do list, accept the
                                  delivery or request a revision if needed!
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
                                  style={{ margin: '30px 0px' }}
                                >
                                  <tbody>
                                    <tr>
                                      <td align="center">
                                        <a
                                          href={orderUrl}
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
                                        >
                                          Review Your Order
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
                        height="45"
                        style={{ backgroundColor: '#ffffff' }}
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
