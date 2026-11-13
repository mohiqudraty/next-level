import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  // console.log(url);  -> /products/1
  const urlParams = url?.split("/");
  // console.log(urlParams); ["", "products", "1"]
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
  // console.log(id);

  // GET all product-----------------
  if (url === "/products" && method === "GET") {
    //  const products = [
    //    {
    //      id: 1,
    //      name: "mobile",
    //      price: 300,
    //    },
    //    {
    //      id: 2,
    //      name: "laptop",
    //      price: 500,
    //    },
    //    {
    //      id: 3,
    //      name: "VR",
    //      price: 100,
    //    },
    //     ];
    const products = productService();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrived successfully!",
        data: products,
      }),
    );
  } // get product by id----------------
  else if (method === "GET" && id !== null) {
    const products = productService();
    const product = products.find((p: IProduct) => id == p.id);

    if (!product) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found",
        }),
      );
    } else {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Products retrive successfully!",
            data: product,
          }),
        );
    }
  
  } // post/create new product ---------------
  else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    // console.log(body);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // console.log(newProduct);
    const products = productService();
    products.push(newProduct);
    createProduct(products);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products created successfully!",
        data: newProduct,
      }),
    );
  } // update product by PUT method ---------
  else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productService();

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found",
        }),
      );
    }
    // console.log(products[index]);
    products[index] = {
      id: products[index].id,
      ...body,
    };
    createProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Updated successfully!",
        data: products[index],
      }),
    );
  } // delete product -------------
  else if (method === "DELETE" && id !== null) {
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found",
        }),
      );
    }

    products.splice(index, 1)
    createProduct(products)
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Deleted successfully!",
      }),
    );
  }
};

export default productController;
