import {BaseApi} from './BaseApi';

export class BenchlingApi extends BaseApi {
  public readonly host: string = 'https://swapi.dev/api';

  public async getData(): Promise<
    {id: string; population: number; name: string}[]
  > {
    const res = await this.get('planets');
    return res.results.map((r: any) => ({
      id: r.name,
      population: r.population,
      name: r.name,
    }));
  }
}
