import fetch from 'node-fetch';

import { API_URL, API_USERNAME, API_PASSWORD } from '@config/index';
import { Discovery } from '@interfaces/discovery';

class ApiConsumer {
  private baseURL: string;

  private headers: Record<string, string>;

  constructor() {
    this.baseURL = API_URL;

    const credentials = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`, 'utf-8')
      .toString('base64');

    this.headers = {
      Authorization: `Basic ${credentials}`,
    };
  }

  async get(path: string): Promise<Discovery> {
    const response = await fetch(`${this.baseURL}/${path}`, { headers: this.headers });
    const body = await response.json() as Discovery;

    return body;
  }
}

export default ApiConsumer;
