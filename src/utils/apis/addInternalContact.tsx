export async function addInternalContact(name: string, phone: string, route: string): Promise<any> {
  const url = 'https://default3eb5a7a848aa4c6f957588c6a1ec94.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/b998094b593b4e70a4eac32c01560c7d/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PHtAA_Ca_dtwgpC7gim-Z461lRE4770r4JAsz9Hn14o';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Name": name, "Phone": phone, "Route": route }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API add internal contact call successful:', response.status);
      return data;
    } else {
      console.error('API add internal contact call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API add internal call:', error);
    return null;
  }
}