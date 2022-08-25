export class BaseApi {
  public readonly host: string = 'http://localhost:3000';

  protected async get(path: string) {
    const res = await fetch(this.getUrl(path), {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return res.json();
  }

  protected async patch(path: string, body: any) {
    try {
      const url = this.getUrl(path);
      console.log(url);
      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: this.getHeaders(),
      });
      return res.json();
    } catch (e) {
      console.error(e);
    }

    return;
  }

  private getHeaders() {
    return {
      Authorization: 'Basic c2tfZW1GTkZDdUdwdkY0UHNGYUtZZnpPUzc4clo1TnU6',
    };
  }

  private getUrl(path: string) {
    return `${this.host}/${path}`;
  }
}
