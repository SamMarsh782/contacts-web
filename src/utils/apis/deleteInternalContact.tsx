export async function deleteInternalContact(name: string, guid: string): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/b2371ce24ac142c997fbfde943fef56e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QtqJU4V2nx6xU30-rdUAKI1o6jWvq_nSLo9v-K0cRzI';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "GUID": guid }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API delete internal contact call successful:', response.status);
      return data;
    } else {
      console.error('Failed to delete user: ', name);
      return null;
    }
  } catch (error) {
    console.error('Failed to delete user: ', name);
    return null;
  }
}