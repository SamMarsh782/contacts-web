export async function editExternalContact(guid: string, name: string, phone: string, email: string, compID: string, compName: string, region: string, emailTF: string): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1fe5c85700204f9db4316799969c5f8f/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=74rVXeIhdj4JCVVwldzFtupzxXS0OkGCDioFhGMdolQ';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "GUID": guid, "Name": name, "Phone": phone, "Email": email, "Comp_ID": compID, "Comp_Name": compName, "Region": region, "Email_T_F": emailTF }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API get edit external contact call successful:', response.status);
      return data;
    } else {
      console.error('API get edit external contact call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API edit external contact call:', error);
    return null;
  }
}