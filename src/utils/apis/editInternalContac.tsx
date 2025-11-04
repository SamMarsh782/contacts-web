export async function editInternalContact(guid: string, name: string, phone: string, route: string): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/caa54cb0fcd542ec8ba3c5a35cfce1ec/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Lhcrtd4UtDGxmp1xecbkzUEfhmKgSKs6Yt3N8-VVIt8';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "GUID": guid, "Name": name, "Phone": phone, "Route": route }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API edit internal contact call successful:', response.status);
      return data;
    } else {
      console.error('API edit internal contact call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API edit internal call:', error);
    return null;
  }
}