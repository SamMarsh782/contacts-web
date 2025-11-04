export async function addExternalContact(name: string, phone: string, email: string, compID: string, compName: string, region: string, emailTF: string): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/5a9a20de6fab4fa8b3680f6b59f9d216/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AjyMXn-3DbAzcUhGCBia0EYcHtMTaxWXBdgu-M_nno8';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Name": name, "Phone": phone, "Email": email, "Comp_ID": compID, "Comp_Name": compName, "Region": region, "Email_T_F": emailTF }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API get add external contact call successful:', response.status);
      return data;
    } else {
      console.error('API get add external contact call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API add external contact call:', error);
    return null;
  }
}