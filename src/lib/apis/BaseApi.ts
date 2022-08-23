export class BaseApi {
  public readonly host: string = 'http://localhost:3000';

  protected async get(path: string) {
    const res = await fetch(this.getUrl(path), {method: 'GET'});
    return res.json();
  }

  private getUrl(path: string) {
    return `${this.host}/${path}`;
  }
}
