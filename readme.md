### GET :: Get All Products

```
curl --location --request GET 'http://localhost:5000/api/products'
```

### GET :: Get a  Product

```
curl --location --request GET 'http://localhost:5000/api/products/4'
```

### POST :: Add Product

```
curl --location --request POST 'http://localhost:5000/api/products' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "delta",
	"description": "delta",
	"price": 11
}'
```

### PUT :: Update Product

```
curl --location --request PUT 'http://localhost:5000/api/products/1' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "Updated Product",
	"price": 100
}'
```

### DELETE :: Delete Product 

```
curl --location --request DELETE 'http://localhost:5000/api/products/1'
```

