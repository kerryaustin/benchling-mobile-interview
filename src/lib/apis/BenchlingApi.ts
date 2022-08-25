import {BaseApi} from './BaseApi';

export class BenchlingApi extends BaseApi {
  public readonly host: string = 'https://packyg.bnch.org/api/v2';

  public async getDnaSequences(): Promise<
    {id: string; name: string; dnaBases: string}[]
  > {
    const result = await this.get('dna-sequences?schemaId=ts_AWCeTzLh');

    return result.dnaSequences.map((r: any) => ({
      id: r.id as string,
      name: r.name as string,
      dnaBases: r.bases as string,
    }));
  }

  public async updateBases(id: string, bases: string) {
    const result = await this.patch(`dna-sequences/${id}`, {bases});
    return result;
  }

  public async searchDnaSequences(
    bases: string,
  ): Promise<{id: string; name: string; dnaBases: string}[]> {
    const result = await this.get(
      `dna-sequences?schemaId=ts_AWCeTzLh&bases=${bases}`,
    );

    return result.dnaSequences.map((r: any) => ({
      id: r.id as string,
      name: r.name as string,
      dnaBases: r.bases as string,
    }));
  }
}
