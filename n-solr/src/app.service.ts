import { Injectable } from '@nestjs/common';
import { ESolrCore } from './common/enum/solr-core.enum';
import { SolrUtil } from './util/solr.util';

@Injectable()
export class AppService {
  constructor(private readonly solrUtil: SolrUtil) {}

  async getAllData(): Promise<string> {
    const ret = await this.solrUtil.search(ESolrCore.article, '*:*', 0, 10);
    return ret;
  }

  async setData(data: any): Promise<string> {
    const ret = await this.solrUtil.addData(
      ESolrCore.article,
      { title: 'asd' },
      2,
    );
    return ret;
  }
}
