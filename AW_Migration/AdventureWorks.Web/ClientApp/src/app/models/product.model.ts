// Coincide con AdventureWorks.Web.Models.Api.CategoryDto
export interface CategoryDto {
  productCategoryID: number;
  name: string;
}

// Coincide con AdventureWorks.Web.Models.Api.SubcategoryDto
export interface SubcategoryDto {
  productSubcategoryID: number;
  name: string;
  category?: CategoryDto;
}

// Coincide con AdventureWorks.Web.Models.Api.ProductDto
export interface Product {
  productID: number;
  name: string;
  productNumber: string;
  color?: string;
  listPrice: number;
  standardCost: number;
  size?: string;
  weight?: number;
  productLine?: string;
  style?: string;
  subcategory?: SubcategoryDto;
}

// Coincide con AdventureWorks.Web.Models.Api.PagedResult<T>
export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
