import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolrUtil } from './util/solr.util';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SolrUtil],
})
export class AppModule {}
