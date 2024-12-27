export const MAILER_CONFIG_OPTS = 'MAILER_CONFIG_OPTS';

export const TEMPLATES = {
  verify_email: `
  <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
<meta name='x-apple-disable-message-reformatting' />
<!--[if !mso]><!-->
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<!--<![endif]-->
<title></title>
<style type='text/css'>
  table, td { color: #000000; } a { color: #0000ee; text-decoration: underline;
  } @media only screen and (min-width: 520px) { .u-row { width: 500px
  !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 {
  width: 500px !important; } } @media (max-width: 520px) { .u-row-container {
  max-width: 100% !important; padding-left: 0px !important; padding-right: 0px
  !important; } .u-row .u-col { min-width: 320px !important; max-width: 100%
  !important; display: block !important; } .u-row { width: calc(100% - 40px)
  !important; } .u-col { width: 100% !important; } .u-col > div { margin: 0
  auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top;
  border-collapse: collapse; } p { margin: 0; } .ie-container table,
  .mso-container table { table-layout: fixed; } * { line-height: inherit; }
  a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration:
  none !important; }
</style>

<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table
  style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%'
  cellpadding='0'
  cellspacing='0'
>
  <tbody>
    <tr style='vertical-align: top'>
      <td
        style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'
      >
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
        <div
          class='u-row-container'
          style='padding: 0px;background-color: transparent'
        >
          <div
            class='u-row'
            style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'
          >
            <div
              style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'
            >
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div
                class='u-col u-col-100'
                style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'
              >
                <div style='width: 100% !important;'>
                  <!--[if (!mso)&(!IE)]><!-->
                  <div
                    style='padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;'
                  >
                    <!--<![endif]-->
                    <table
                      style='font-family:arial,helvetica,sans-serif;'
                      role='presentation'
                      cellpadding='0'
                      cellspacing='0'
                      width='100%'
                      border='0'
                    >
                      <tbody>
                        <tr>
                          <td
                            style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                            align='left'
                          >
                            <div>
                              <!-- start: container -->
                              <div
                                style='margin: 0 auto; max-width: 768px; position: relative'
                              >
                                <!-- start: content -->
                                <div
                                  style='max-width: 483px; margin: 0 auto 16px; z-index: 9999; position: relative;'
                                >
                                  <!-- start: logo -->
                                  <p
                                    style='font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #034499'
                                  >Grant Suite</p>
                                  <!-- end: logo -->
                                  <!-- start: body -->
                                  <div
                                    style='background: white; border-radius: 16px; padding: 32px 24px'
                                  >
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <div
                                      style='background: white; border-radius: 16px; padding: 32px 24px'
                                    >
                                      <h2 style='margin-bottom: 32px'>Hi
                                        {{fname}},
                                      </h2>
                                      <p style='margin-bottom: 24px'>
                                        Thanks for joining Grant Suite!
                                        Before we get started, we just need to
                                        confirm that this is you. Click below to
                                        verify your email address:
                                      </p>
                                      <div style='margin-bottom: 32px'>
                                        <a
                                          href='{{site_url}}/auth/verify-email?code={{verification_code}}'
                                          target='_blank'
                                          style='text-decoration: none'
                                        >
                                          <button
                                            style='padding: 8px 16px; background-color: #034499; color: #fff; font-weight: bold; border-radius: 32px; border: none; cursor: pointer;'
                                          >
                                            Verify email
                                          </button>
                                        </a>
                                      </div>
                                    </div>
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                  </div>
                                  <!-- end: body -->
                                </div>
                                <!-- end: content -->
                                <!-- start: footer -->
                                <div
                                  style='max-width: 483px; margin: 16px auto 0; z-index: 4;position: relative;'
                                >
                                  <a
                                    href='https://6figuregrants.com/about-us/contact/'
                                    target='_blank'
                                    style='margin-bottom: 16px; display: block; text-decoration: none; color: #034499;'
                                  >Contact Us</a>
                                </div>
                                <!-- end: footer -->
                              </div>
                              <!-- end: container -->
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
  `,
  payment_links: `
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG />
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<title></title>
<style type="text/css">
  table,
  td {
    color: #000000;
  }
  a {
    color: #0000ee;
    text-decoration: underline;
  }
  @media only screen and (min-width: 520px) {
    .u-row {
      width: 500px !important;
    }
    .u-row .u-col {
      vertical-align: top;
    }
    .u-row .u-col-100 {
      width: 500px !important;
    }
  }
  @media (max-width: 520px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: calc(100% - 40px) !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  p {
    margin: 0;
  }
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  * {
    line-height: inherit;
  }
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
</style>

<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table
  style="
    border-collapse: collapse;
    table-layout: fixed;
    border-spacing: 0;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    vertical-align: top;
    min-width: 320px;
    margin: 0 auto;
    background-color: #e7e7e7;
    width: 100%;
  "
  cellpadding="0"
  cellspacing="0"
>
  <tbody>
    <tr style="vertical-align: top">
      <td
        style="
          word-break: break-word;
          border-collapse: collapse !important;
          vertical-align: top;
        "
      >
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
        <div
          class="u-row-container"
          style="padding: 0px; background-color: transparent"
        >
          <div
            class="u-row"
            style="
              margin: 0 auto;
              min-width: 320px;
              max-width: 500px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              background-color: transparent;
            "
          >
            <div
              style="
                border-collapse: collapse;
                display: table;
                width: 100%;
                background-color: transparent;
              "
            >
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div
                class="u-col u-col-100"
                style="
                  max-width: 320px;
                  min-width: 500px;
                  display: table-cell;
                  vertical-align: top;
                "
              >
                <div style="width: 100% !important">
                  <!--[if (!mso)&(!IE)]><!-->
                  <div
                    style="
                      padding: 0px;
                      border-top: 0px solid transparent;
                      border-left: 0px solid transparent;
                      border-right: 0px solid transparent;
                      border-bottom: 0px solid transparent;
                    "
                  >
                    <!--<![endif]-->
                    <table
                      style="font-family: arial, helvetica, sans-serif"
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              overflow-wrap: break-word;
                              word-break: break-word;
                              padding: 10px;
                              font-family: arial, helvetica, sans-serif;
                            "
                            align="left"
                          >
                            <div>
                              <!-- start: container -->
                              <div
                                style="
                                  margin: 0 auto;
                                  max-width: 768px;
                                  position: relative;
                                "
                              >
                                <!-- start: content -->
                                <div
                                  style="
                                    max-width: 483px;
                                    margin: 0 auto 16px;
                                    z-index: 9999;
                                    position: relative;
                                  "
                                >
                                  <!-- start: logo -->
                                  <p
                                    style="
                                      font-size: 24px;
                                      font-weight: bold;
                                      margin-bottom: 16px;
                                      color: #034499;
                                    "
                                  >
                                    Grant Suite
                                  </p>
                                  <!-- end: logo -->
                                  <!-- start: body -->
                                  <div
                                    style="
                                      background: white;
                                      border-radius: 16px;
                                      padding: 32px 24px;
                                    "
                                  >
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <div
                                      style="
                                        background: white;
                                        border-radius: 16px;
                                        padding: 32px 24px;
                                      "
                                    >
                                      <h2 style="margin-bottom: 32px">
                                        Hi {{fname}},
                                      </h2>
                                      <p style="margin-bottom: 24px">
                                        Thank you for verifying your email! You
                                        are a step closer to accessing Grants
                                        Suite.
                                      </p>
                                      <p style="margin-bottom: 24px">
                                        To start using Grants Suite, please
                                        visit one of the links below to complete
                                        your payment.
                                      </p>
                                      <table>
                                        <thead>
                                          <th style="text-align: left; padding: 8px;">Access</th>
                                          <th style="text-align: left; padding: 8px;">Link</th>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td style="vertical-align: middle; padding-right: 16px; border: 1px solid #eee">{{payment_desc_1}}</td>
                                            <td style="border: 1px solid #eee; padding: 8px;">
                                              <a
                                                href="{{payment_link_1}}"
                                                target="_blank"
                                                style="text-decoration: none"
                                              >
                                                  {{payment_desc_1}}
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style="vertical-align: middle; padding-right: 16px; border: 1px solid #eee">{{payment_desc_2}}</td>
                                            <td style="border: 1px solid #eee; padding: 8px;">
                                              <a
                                                href="{{payment_link_2}}"
                                                target="_blank"
                                                style="text-decoration: none"
                                              >
                                                  {{payment_desc_2}}
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style="vertical-align: middle; padding-right: 16px; border: 1px solid #eee">{{payment_desc_3}}</td>
                                            <td style="border: 1px solid #eee; padding: 8px;">
                                              <a
                                                href="{{payment_link_3}}"
                                                target="_blank"
                                                style="text-decoration: none"
                                              >
                                                  {{payment_desc_3}}
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div>
                                    </div>
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                  </div>
                                  <!-- end: body -->
                                </div>
                                <!-- end: content -->
                                <!-- start: footer -->
                                <div
                                  style="
                                    max-width: 483px;
                                    margin: 16px auto 0;
                                    z-index: 4;
                                    position: relative;
                                  "
                                >
                                  <a
                                    href="https://6figuregrants.com/about-us/contact/"
                                    target="_blank"
                                    style="
                                      margin-bottom: 16px;
                                      display: block;
                                      text-decoration: none;
                                      color: #034499;
                                    "
                                    >Contact Us</a
                                  >
                                </div>
                                <!-- end: footer -->
                              </div>
                              <!-- end: container -->
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
  `,
  register_notify: `
  <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
<meta name='x-apple-disable-message-reformatting' />
<!--[if !mso]><!-->
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<!--<![endif]-->
<title></title>
<style type='text/css'>
  table, td { color: #000000; } a { color: #0000ee; text-decoration: underline;
  } @media only screen and (min-width: 520px) { .u-row { width: 500px
  !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 {
  width: 500px !important; } } @media (max-width: 520px) { .u-row-container {
  max-width: 100% !important; padding-left: 0px !important; padding-right: 0px
  !important; } .u-row .u-col { min-width: 320px !important; max-width: 100%
  !important; display: block !important; } .u-row { width: calc(100% - 40px)
  !important; } .u-col { width: 100% !important; } .u-col > div { margin: 0
  auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top;
  border-collapse: collapse; } p { margin: 0; } .ie-container table,
  .mso-container table { table-layout: fixed; } * { line-height: inherit; }
  a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration:
  none !important; }
</style>

<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table
  style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%'
  cellpadding='0'
  cellspacing='0'
>
  <tbody>
    <tr style='vertical-align: top'>
      <td
        style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'
      >
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
        <div
          class='u-row-container'
          style='padding: 0px;background-color: transparent'
        >
          <div
            class='u-row'
            style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'
          >
            <div
              style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'
            >
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div
                class='u-col u-col-100'
                style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'
              >
                <div style='width: 100% !important;'>
                  <!--[if (!mso)&(!IE)]><!-->
                  <div
                    style='padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;'
                  >
                    <!--<![endif]-->
                    <table
                      style='font-family:arial,helvetica,sans-serif;'
                      role='presentation'
                      cellpadding='0'
                      cellspacing='0'
                      width='100%'
                      border='0'
                    >
                      <tbody>
                        <tr>
                          <td
                            style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                            align='left'
                          >
                            <div>
                              <!-- start: container -->
                              <div
                                style='margin: 0 auto; max-width: 768px; position: relative'
                              >
                                <!-- start: content -->
                                <div
                                  style='max-width: 483px; margin: 0 auto 16px; z-index: 9999; position: relative;'
                                >
                                  <!-- start: logo -->
                                  <p
                                    style='font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #034499'
                                  >Grant Suite</p>
                                  <!-- end: logo -->
                                  <!-- start: body -->
                                  <div
                                    style='background: white; border-radius: 16px; padding: 32px 24px'
                                  >
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <div
                                      style='background: white; border-radius: 16px; padding: 32px 24px'
                                    >
                                      <h2 style='margin-bottom: 32px'>{{fname}} {{lname}} has registered!</h2>
                                      <p style='margin-bottom: 32px'>
                                        A user has joined and ready to receive an invoice.
                                      </p>
                                      <p style="margin-bottom: 32px;">
                                        Email: <span style="font-weight: bold;">{{email}}</span>
                                      </p>
                                      <div>
                                        <a
                                          href='{{site_url}}/admin/manage-users/{{user_id}}'
                                          target='_blank'
                                          style='text-decoration: none; margin-right: 16px'
                                        >
                                          <button
                                            style='padding: 12px 16px; background-color: #034499; color: #fff; font-weight: bold; border-radius: 32px; border: none; cursor: pointer;'
                                          >
                                            View User
                                          </button>
                                        </a>
                                      </div></div>
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                  </div>
                                  <!-- end: body -->
                                </div>
                                <!-- end: content -->
                                <!-- start: footer -->
                                <div
                                  style='max-width: 483px; margin: 16px auto 0; z-index: 4;position: relative;'
                                >
                                  <a
                                    href='https://6figuregrants.com/about-us/contact/'
                                    target='_blank'
                                    style='margin-bottom: 16px; display: block; text-decoration: none; color: #034499;'
                                  >Contact Us</a>
                                </div>
                                <!-- end: footer -->
                              </div>
                              <!-- end: container -->
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
  `,
  reset_password: `
  <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
<meta name='x-apple-disable-message-reformatting' />
<!--[if !mso]><!-->
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<!--<![endif]-->
<title></title>
<style type='text/css'>
  table, td { color: #000000; } a { color: #0000ee; text-decoration: underline;
  } @media only screen and (min-width: 520px) { .u-row { width: 500px
  !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 {
  width: 500px !important; } } @media (max-width: 520px) { .u-row-container {
  max-width: 100% !important; padding-left: 0px !important; padding-right: 0px
  !important; } .u-row .u-col { min-width: 320px !important; max-width: 100%
  !important; display: block !important; } .u-row { width: calc(100% - 40px)
  !important; } .u-col { width: 100% !important; } .u-col > div { margin: 0
  auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top;
  border-collapse: collapse; } p { margin: 0; } .ie-container table,
  .mso-container table { table-layout: fixed; } * { line-height: inherit; }
  a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration:
  none !important; }
</style>

<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table
  style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%'
  cellpadding='0'
  cellspacing='0'
>
  <tbody>
    <tr style='vertical-align: top'>
      <td
        style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'
      >
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
        <div
          class='u-row-container'
          style='padding: 0px;background-color: transparent'
        >
          <div
            class='u-row'
            style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'
          >
            <div
              style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'
            >
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div
                class='u-col u-col-100'
                style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'
              >
                <div style='width: 100% !important;'>
                  <!--[if (!mso)&(!IE)]><!-->
                  <div
                    style='padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;'
                  >
                    <!--<![endif]-->
                    <table
                      style='font-family:arial,helvetica,sans-serif;'
                      role='presentation'
                      cellpadding='0'
                      cellspacing='0'
                      width='100%'
                      border='0'
                    >
                      <tbody>
                        <tr>
                          <td
                            style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                            align='left'
                          >
                            <div>
                              <!-- start: container -->
                              <div
                                style='margin: 0 auto; max-width: 768px; position: relative'
                              >
                                <!-- start: content -->
                                <div
                                  style='max-width: 483px; margin: 0 auto 16px; z-index: 9999; position: relative;'
                                >
                                  <!-- start: logo -->
                                  <p
                                    style='font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #034499'
                                  >Grant Suite</p>
                                  <!-- end: logo -->
                                  <!-- start: body -->
                                  <div
                                    style='background: white; border-radius: 16px; padding: 32px 24px'
                                  >
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <div
                                      style='background: white; border-radius: 16px; padding: 32px 24px'
                                    >
                                      <h2 style='margin-bottom: 32px'>Hi
                                        {{fname}},</h2>
                                      <p style='margin-bottom: 32px'>Please
                                        click on the button below to reset your
                                        password.&nbsp;</p>
                                      <div>
                                        <a
                                          href='{{site_url}}/auth/reset-password?token={{token}}'
                                          target='_blank'
                                          style='text-decoration: none; margin-right: 16px'
                                        >
                                          <button
                                            style='padding: 12px 16px; background-color: #034499; color: #fff; font-weight: bold; border-radius: 32px; border: none; cursor: pointer;'
                                          >
                                            Reset Password
                                          </button>
                                        </a>
                                      </div></div>
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                  </div>
                                  <!-- end: body -->
                                </div>
                                <!-- end: content -->
                                <!-- start: footer -->
                                <div
                                  style='max-width: 483px; margin: 16px auto 0; z-index: 4;position: relative;'
                                >
                                  <a
                                    href='https://6figuregrants.com/about-us/contact/'
                                    target='_blank'
                                    style='margin-bottom: 16px; display: block; text-decoration: none; color: #034499;'
                                  >Contact Us</a>
                                </div>
                                <!-- end: footer -->
                              </div>
                              <!-- end: container -->
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
  `,
  email_notification_message: `
  <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
<meta name='x-apple-disable-message-reformatting' />
<!--[if !mso]><!-->
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<!--<![endif]-->
<title></title>
<style type='text/css'>
  table, td { color: #000000; } a { color: #0000ee; text-decoration: underline;
  } @media only screen and (min-width: 520px) { .u-row { width: 500px
  !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 {
  width: 500px !important; } } @media (max-width: 520px) { .u-row-container {
  max-width: 100% !important; padding-left: 0px !important; padding-right: 0px
  !important; } .u-row .u-col { min-width: 320px !important; max-width: 100%
  !important; display: block !important; } .u-row { width: calc(100% - 40px)
  !important; } .u-col { width: 100% !important; } .u-col > div { margin: 0
  auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top;
  border-collapse: collapse; } p { margin: 0; } .ie-container table,
  .mso-container table { table-layout: fixed; } * { line-height: inherit; }
  a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration:
  none !important; }
</style>

<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table
  style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%'
  cellpadding='0'
  cellspacing='0'
>
  <tbody>
    <tr style='vertical-align: top'>
      <td
        style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'
      >
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
        <div
          class='u-row-container'
          style='padding: 0px;background-color: transparent'
        >
          <div
            class='u-row'
            style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'
          >
            <div
              style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'
            >
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div
                class='u-col u-col-100'
                style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'
              >
                <div style='width: 100% !important;'>
                  <!--[if (!mso)&(!IE)]><!-->
                  <div
                    style='padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;'
                  >
                    <!--<![endif]-->
                    <table
                      style='font-family:arial,helvetica,sans-serif;'
                      role='presentation'
                      cellpadding='0'
                      cellspacing='0'
                      width='100%'
                      border='0'
                    >
                      <tbody>
                        <tr>
                          <td
                            style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                            align='left'
                          >
                            <div>
                              <!-- start: container -->
                              <div
                                style='margin: 0 auto; max-width: 768px; position: relative'
                              >
                                <!-- start: content -->
                                <div
                                  style='max-width: 483px; margin: 0 auto 16px; z-index: 9999; position: relative;'
                                >
                                  <!-- start: logo -->
                                  <p
                                    style='font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #034499'
                                  >Grant Suite</p>
                                  <!-- end: logo -->
                                  <!-- start: body -->
                                  <div
                                    style='background: white; border-radius: 16px; padding: 32px 24px'
                                  >
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <div
                                      style='background: white; border-radius: 16px; padding: 32px 24px'
                                    >
                                      <h2 style='margin-bottom: 32px'>Hi
                                        {{fname}},</h2>
                                      <p style='margin-bottom: 32px'>
                                        {{content}}
                                      </p>
                                      <div>
                                        <a
                                          href='{{site_url}}'
                                          target='_blank'
                                          style='text-decoration: none; margin-right: 16px'
                                        >
                                          <button
                                            style='padding: 12px 16px; background-color: #034499; color: #fff; font-weight: bold; border-radius: 32px; border: none; cursor: pointer;'
                                          >
                                            Go to Grant Suite
                                          </button>
                                        </a>
                                      </div>
                                    </div>
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                  </div>
                                  <!-- end: body -->
                                </div>
                                <!-- end: content -->
                                <!-- start: footer -->
                                <div
                                  style='max-width: 483px; margin: 16px auto 0; z-index: 4;position: relative;'
                                >
                                  <a
                                    href='https://6figuregrants.com/about-us/contact/'
                                    target='_blank'
                                    style='margin-bottom: 16px; display: block; text-decoration: none; color: #034499;'
                                  >Contact Us</a>
                                </div>
                                <!-- end: footer -->
                              </div>
                              <!-- end: container -->
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
  `,
  welcome_email: `
  <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
<meta name='x-apple-disable-message-reformatting' />
<!--[if !mso]><!-->
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<!--<![endif]-->
<title></title>
<style type='text/css'>
  table, td { color: #000000; } a { color: #0000ee; text-decoration: underline;
  } @media only screen and (min-width: 520px) { .u-row { width: 500px
  !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 {
  width: 500px !important; } } @media (max-width: 520px) { .u-row-container {
  max-width: 100% !important; padding-left: 0px !important; padding-right: 0px
  !important; } .u-row .u-col { min-width: 320px !important; max-width: 100%
  !important; display: block !important; } .u-row { width: calc(100% - 40px)
  !important; } .u-col { width: 100% !important; } .u-col > div { margin: 0
  auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top;
  border-collapse: collapse; } p { margin: 0; } .ie-container table,
  .mso-container table { table-layout: fixed; } * { line-height: inherit; }
  a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration:
  none !important; }
</style>

<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table
  style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%'
  cellpadding='0'
  cellspacing='0'
>
  <tbody>
    <tr style='vertical-align: top'>
      <td
        style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'
      >
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
        <div
          class='u-row-container'
          style='padding: 0px;background-color: transparent'
        >
          <div
            class='u-row'
            style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'
          >
            <div
              style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'
            >
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div
                class='u-col u-col-100'
                style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'
              >
                <div style='width: 100% !important;'>
                  <!--[if (!mso)&(!IE)]><!-->
                  <div
                    style='padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;'
                  >
                    <!--<![endif]-->
                    <table
                      style='font-family:arial,helvetica,sans-serif;'
                      role='presentation'
                      cellpadding='0'
                      cellspacing='0'
                      width='100%'
                      border='0'
                    >
                      <tbody>
                        <tr>
                          <td
                            style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                            align='left'
                          >
                            <div>
                              <!-- start: container -->
                              <div
                                style='margin: 0 auto; max-width: 768px; position: relative'
                              >
                                <!-- start: content -->
                                <div
                                  style='max-width: 483px; margin: 0 auto 16px; z-index: 9999; position: relative;'
                                >
                                  <!-- start: logo -->
                                  <p
                                    style='font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #034499'
                                  >Grant Suite</p>
                                  <!-- end: logo -->
                                  <!-- start: body -->
                                  <div
                                    style='background: white; border-radius: 16px; padding: 32px 24px'
                                  >
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <!-- CONTENT STARTS HERE -->
                                    <div
                                      style='background: white; border-radius: 16px; padding: 32px 24px'
                                    >
                                      <h2 style='margin-bottom: 32px'>Hi
                                        {{fname}},</h2>
                                      <p style='margin-bottom: 32px'>
                                        Welcome {{fname}} to <span style="font-weight: bold; color: #034499">6 Figure Grants</span>. To get started, please click on the login button below and use the following credentials.
                                      </p>
                                      <div style='margin-bottom: 32px'>
                                        <p><b>Email:</b> {{email}}</p>
                                        <p><b>Password:</b> {{password}}</p>
                                      </div>
                                      <p style='margin-bottom: 32px'>
                                        You will be prompted to reset your password after successfully logging in for the first time.
                                      </p>
                                      <div>
                                        <a
                                          href='{{site_url}}/auth/signin'
                                          target='_blank'
                                          style='text-decoration: none; margin-right: 16px'
                                        >
                                          <button
                                            style='padding: 12px 16px; background-color: #034499; color: #fff; font-weight: bold; border-radius: 32px; border: none; cursor: pointer;'
                                          >
                                            Login
                                          </button>
                                        </a>
                                      </div></div>
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                    <!-- CONTENT ENDS HERE -->
                                  </div>
                                  <!-- end: body -->
                                </div>
                                <!-- end: content -->
                                <!-- start: footer -->
                                <div
                                  style='max-width: 483px; margin: 16px auto 0; z-index: 4;position: relative;'
                                >
                                  <a
                                    href='https://6figuregrants.com/about-us/contact/'
                                    target='_blank'
                                    style='margin-bottom: 16px; display: block; text-decoration: none; color: #034499;'
                                  >Contact Us</a>
                                </div>
                                <!-- end: footer -->
                              </div>
                              <!-- end: container -->
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
  `,
};
