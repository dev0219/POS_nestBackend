export enum QueueEnum {

  createProduct = 'product.create',
  productCreated = 'product.created',
  getProductDetail = 'product.get.detail',
  getProducts = 'products.get',

  createProductCategory = 'productCategory.create',
  productCategoryCreated = 'productCategory.created',
  getCategories = 'productCategories.get',
  getCategory = 'productCategory.get.category',

  createProductBrand = 'productBrand.create',
  productBrandCreated = 'productBrand.created',
  getBrand = 'productsBrand.get',
  
  getProductTypes = 'productTypes.get',
  createProductType = 'productType.create',
  updateProductType = 'productType.update',
  productTypeCreated = 'productType.created',
  getProductTypeDetail = 'productType.get',
  delProductType = 'productType.delete.detail',  
  
  getProductCatalogs = 'catalog.get.productcategories',

}
