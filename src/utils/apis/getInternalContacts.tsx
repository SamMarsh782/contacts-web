export async function getInternalContacts(): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/f63a11b52b304a3193963dc341dad052/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8VFCyrnApEjLnQZxUsySxtFimrTVjZqZm4MltsVoeJs';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log('API get internal contact call successful:', response.status);
      return data;
    } else {
      console.error('API get internal contacts call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API get internal contacts call:', error);
    return null;
  }
}