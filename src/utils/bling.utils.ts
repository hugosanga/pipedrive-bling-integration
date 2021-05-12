export class BlingUtils {
  /*
    Generates Bling Pattern XML for given Client and Products
  */
  static generateXml(client: blingClientType, products: blingProductsType): string {
    const clientXml = `
      <nome>${client.name}</nome>
      <fone>${client.phone}</fone>
      <email>${client.email}</email>
    `

    const productsXml = products.reduce((acc: string, item): string => {
      return acc + `
        <item>
          <codigo>${item.code}</codigo>
          <descricao>${item.description}</descricao>
          <un>${item.unit}</un>
          <qtde>${item.amount}</qtde>
          <vlr_unit>${item.unit_price}</vlr_unit>
        </item>
      `
    }, '') 

    return `
      <?xml version="1.0" encoding="UTF-8"?>
      <pedido>
        <cliente>
          ${clientXml}
        </cliente>
        <itens>
          ${productsXml}
        </itens>
      </pedido>
    `
  }
}