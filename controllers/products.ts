import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "alpha",
    description: "Alpha Product",
    price: 10,
  },
  {
    id: "2",
    name: "bravo",
    description: "Bravo Product",
    price: 20,
  },
  {
    id: "3",
    name: "charlie",
    description: "Charlie Product",
    price: 30,
  },
];

/**
 * @desc : Get All Products
 * @route : GET /api/products
 */

export const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

/**
 * @desc : Get Single Product
 * @route : GET /api/products/:id 
 */

export const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
    return;
  }
  response.status = 400;
  response.body = {
    success: false,
    message: "Product not found",
  };
};

/**
 * @desc : Add Product
 * @route : POST /api/products
 */

export const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data",
    };
    return;
  }
  const product: Product = body.value;
  product.id = v4.generate();
  products.push(product);
  response.status = 200;
  response.body = {
    success: true,
    data: product,
  };
};

/**
 * @desc : Add Product
 * @route : PUT /api/products/:id
 */

export const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (product) {
    const body = await request.body();
    const updateData: {
      name?: string;
      description?: string;
      price?: number;
    } = body.value;
    products = products.map((p) =>
      p.id === params.id
        ? {
          ...p,
          ...updateData,
        }
        : p
    );
    response.status = 200;
    response.body = {
      success: true,
      data: updateData,
    };
    return;
  }
  response.status = 400;
  response.body = {
    success: false,
    message: "Product not found",
  };
};

/**
 * @desc : delete Product
 * @route : DELETE /api/products/:id
 */

export const deleteProduct = (
  { params, response }: {
    params: { id: string };
    response: any;
  },
) => {
  if (products.some(p => p.id === params.id)){
    products.filter(p => p.id !== params.id)
    response.body = {
      success: true,
      message: "Product removed",
    };
    return;
  }
  response.status = 400;
  response.body = {
    success: false,
    message: "Product not found",
  };
};