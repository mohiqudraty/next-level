import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

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
    try {
      const products = productService();
      sendResponse(res, true, 200, "Products retrived successfully!", products);
    } catch (error) {
      sendResponse(res, false, 500, "Internal server Error!!!");
    }
  } // get product by id----------------
  else if (method === "GET" && id !== null) {
    const products = productService();
    const product = products.find((p: IProduct) => id == p.id);

    if (!product) {
      return sendResponse(res, false, 404, "Product Not Found!");
    }
    try {
      sendResponse(res, true, 200, "Products retrived successfully!", product);
    } catch (error) {
      sendResponse(res, false, 500, "Internal server Error!!!");
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

    try {
      sendResponse(
        res,
        true,
        201,
        "Products created successfully!",
        newProduct,
      );
    } catch (error) {
      sendResponse(res, false, 500, "Internal server Error!!!");
    }
  } // update product by PUT method ---------
  else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productService();

    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      sendResponse(res, false, 404, "product not found");
      return; // ← stop here
    }

    products[index] = {
      id: products[index].id,
      ...body,
    };
    createProduct(products);
    try {
      sendResponse(
        res,
        true,
        200,
        "Product Updated successfully!",
        products[index],
      );
    } catch (error) {
      sendResponse(res, false, 500, "Internal server Error!!!");
    }
    
  } // delete product -------------
  else if (method === "DELETE" && id !== null) {
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
     if (index < 0) {
       sendResponse(res, false, 404, "product not found");
       return; // ← stop here
     }
    products.splice(index, 1);
    createProduct(products);

    try {
       sendResponse(
         res,
         true,
         200,
         "Product Deleted successfully!"
       );
    } catch (error) {
      sendResponse(res, false, 500, "Internal server Error!!!");
    }
  }
};

export default productController;
