export async function getExternalContacts(): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/3180716c285f41a28112fa98496b15ca/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jxCn8EqenPTQTU6RDSz8t_KBkQ_RprYv4VAAKvEuAr4';

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
      console.log('API get external contacts call successful:', response.status);
      return data;
    } else {
      console.error('API get external contacts call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API get external contacts call:', error);
    return null;
  }
}