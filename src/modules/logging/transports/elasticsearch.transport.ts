import { ElasticsearchTransport } from 'winston-elasticsearch';

export const createElasticsearchTransport = () => new ElasticsearchTransport({
  level: 'info',
  clientOpts: {
    node: process.env.ELASTICSEARCH_URL?? 'http://localhost:9200',
    auth: {
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD,
    },
  },
  indexPrefix: `${process.env.APP_NAME?? 'nestjs-app'}-logs`,
  format: require('winston').format.combine(
    require('winston').format.json()
  ),
});