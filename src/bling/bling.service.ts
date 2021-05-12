import { Injectable, HttpService, InternalServerErrorException, Logger, BadGatewayException } from '@nestjs/common';
import { BlingUtils as _ } from "src/utils/bling.utils";

@Injectable()
export class BlingService {
  private logger = new Logger('BlingService')
  constructor(
    private readonly http: HttpService,
  ) { }

  async postOrder(client: blingClientType, product: blingProductsType) {
    try {
      const order = await this.http.post('https://bling.com.br/Api/v2/pedido/json/', {}, {
        params: {
          apikey: process.env.BLING_API_TOKEN,
          gerarnfe: false,
          xml: _.generateXml(client, product)
        }
      })
        .toPromise()
        .then(res => res.data)

      if(
        !(order.retorno?.erros || []).map(err => err.erro?.cod).includes(30)
      ) throw new BadGatewayException()

      return order
    } catch (err) {
      this.logger.error(err.stack)
      throw new InternalServerErrorException()
    }
  }
}