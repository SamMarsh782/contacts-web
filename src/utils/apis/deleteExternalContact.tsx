export async function deleteExternalContact(name: string, guid: string): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/867c0e70690b492b8bf77f08f03ef9e5/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-jBOVRL6HUrbXU3BJaiJzfXJk_UhRg3I1Z6nVHbK_QE';

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
      console.log('API delete external contact call successful:', response.status);
      return data;
    } else {
      console.error('Failed to delete contact: ', name);
      return null;
    }
  } catch (error) {
    console.error('Failed to delete contact: ', name);
    return null;
  }
}