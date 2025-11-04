export async function getStopStatuses(): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/2d03e3ca63954c54b5a0f4fcbec3267b/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=q848ITBI93pBMMsXLk_73jX7HYVyGYUGN30tzJPclSU';

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
      console.log('API get stop statuses call successful:', response.status);
      return data;
    } else {
      console.error('API get stop statuses call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API get stop statuses call:', error);
    return null;
  }
}