import { Injectable, Logger } from '@nestjs/common';
import * as solr from 'solr-client';
import { ESolrCore } from 'src/common/enum/solr-core.enum';

@Injectable()
export class SolrUtil {
  private readonly logger = new Logger(SolrUtil.name);

  private getSolrClient = (core: ESolrCore): any => {
    const client = solr.createClient({
      // host: 'localhost',
      // port: 8983,
      core: core,
    });
    // client.basicAuth('user', 'password');
    // this.logger.log('ppp: ' + JSON.stringify(client));
    return client;
  };

  public addData = async (
    cr: ESolrCore,
    data: { [key: string]: any },
    index: number | string = null,
  ): Promise<any> => {
    const solrClient = await this.getSolrClient(cr);
    const d = await solrClient.add({ id: index, ...data });
    return d;
  };

  // public reindexProducts = (cr: ESolrCore, products: any[]): Promise<any> => {
  //   const solrClient = this.getSolrClient(cr);
  //   return new Promise((resolve, reject) => {
  //     solrClient.deleteAll({}, async (err, res) => {
  //       if (err) {
  //         this.logger.log(err);
  //         reject(err);
  //       } else {
  //         // this.logger.log(res, cr + ' Delete All');
  //         solrClient.softCommit();

  //         for (const [index, product] of products.entries()) {
  //           //await this.indexProduct(cr, product, index);
  //         }
  //         resolve(res);
  //       }
  //     });
  //   });
  // };

  // public reindexShops = (cr: ESolrCore, shops: any[]): Promise<any> => {
  //   const solrClient = this.getSolrClient(cr);
  //   return new Promise((resolve, reject) => {
  //     solrClient.deleteAll({}, async (err, res) => {
  //       if (err) {
  //         this.logger.log(err);
  //         reject(err);
  //       } else {
  //         // this.logger.log(res, cr + ' Delete All');
  //         solrClient.softCommit();

  //         for (const [index, shop] of shops.entries()) {
  //           // await this.indexShop(cr, shop, index);
  //         }
  //         resolve(res);
  //       }
  //     });
  //   });
  // };

  public search = async (
    core: ESolrCore,
    q: string,
    page = 0,
    limit = 10,
  ): Promise<any> => {
    const start = page * limit;

    // console.log({ DT: new Date(), core, q, start, limit });

    try {
      const solrClient = await this.getSolrClient(core);
      const query = await solrClient.query().q(q).start(page).rows(limit);
      this.logger.verbose(query);
      const ret = await solrClient.search(query);
      this.logger.verbose(ret['response']);
      return ret['response'];
    } catch (error) {
      this.logger.error({ error });
    }
  };

  public remove = (cr: ESolrCore, id: string): Promise<any> => {
    const solrClient = this.getSolrClient(cr);
    return new Promise((resolve, reject) => {
      solrClient.delete('id', id, (err, res) => {
        if (err) {
          this.logger.log(err);
          reject(err);
        } else {
          // this.logger.log(res);
          solrClient.softCommit();
          resolve(res);
        }
      });
    });
  };
}
