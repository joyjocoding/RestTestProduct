# Rest Web Service with AngularJS and Symfony

## About

Simple product CRUD web developed by AngularJS and Symfony. 

## Features
* Symfony provides the RESTful service
* AngularJS calls the REST service as frontend

## Prerequisites
* PHP 5.3.9 or above
* MySQL server 5.6 or above
* Symfony2.8

## Installation
1. First install and configure the symfony2.8 framework, see https://symfony.com/doc/2.8/setup.html.

2. Require the following bundleas:
    * nelmio/NelmioCorsBundle  
    * friendsofsymfony/rest-bundle
    * jms/serializer-bundle
    * voryx/restgeneratorbundle
  
## Configuration
Using the following command in the Symfony project directory: 
```bash
$ php composer require nelmio/cors-bundle
$ php composer require friendsofsymfony/rest-bundle:1.1.0
$ php composer require jms/serializer-bundle
$ php composer require voryx/restgeneratorbundle dev-master
```

Refer the details about the budle for generating the REST controller here: https://github.com/voryx/restgeneratorbundle/blob/master/README.md
1. Add these bundles to your application's kernel in  **app/AppKernel.php**  along with other dependencies:

```php
public function registerBundles()
{
    $bundles = array(
        //...
          new Voryx\RESTGeneratorBundle\VoryxRESTGeneratorBundle(),
          new FOS\RestBundle\FOSRestBundle(),
          new JMS\SerializerBundle\JMSSerializerBundle($this),
          new Nelmio\CorsBundle\NelmioCorsBundle(),
        //...
    );
    //...
}
```
2. Cofigure the **app/config/config.yml** as following:
```yaml
framework:
    csrf_protection: false #only use for public API

fos_rest:
    routing_loader:
        default_format: json
    param_fetcher_listener: true
    body_listener: true
    #disable_csrf_role: ROLE_USER
    body_converter:
        enabled: true
    view:
        view_response_listener: force

nelmio_cors:
    defaults:
        allow_credentials: false
        allow_origin: []
        allow_headers: []
        allow_methods: []
        expose_headers: []
        max_age: 0
    paths:
        '^/test/':
            allow_origin: ['*']
            allow_headers: ['*']
            allow_methods: ['POST', 'PUT', 'GET', 'DELETE']
            max_age: 3600

sensio_framework_extra:
    request: { converters: true }
    view:    { annotations: false }
    router:  { annotations: true }
```

## Generating the Controller

1. Setup the database in **app/config/parameters.yml** file, see https://symfony.com/doc/current/doctrine.html

2. Create a new entity called 'Product'
```bash
$ php app/console doctrine:generate:entity --entity=AppBundle:Product --format=annotation --fields="sku:string(255) name:string(255) price:decimal(13,4)" --no-interaction
``` 
3. Update the database schema:
```bash
$ php app/console doctrine:schema:update --force
```
4. Generate the API controller:
```bash
$ php app/console voryx:generate:rest --entity="AppBundle:Product"
```

## Testing the REST API

You could install the POSTMAN extension for the browser chrome or you can use the following curl commands:
 
* Creating the product('POST'):
 ```bash
curl -i -H "Content-Type:application/json" -X POST -d "{\"sku\":\"xyztu\",\"name\":\"test\",\"price\":\"777.00\"}" http://localhost:8000/app_dev.php/test/products
```

* Updating the product(PUT): 
```bash
curl -i -H "Content-Type:application/json" -X PUT -d "{\"sku\":\"xyztu\",\"name\":\"test\",\"price\":\"777.00\"}" http://localhost:8000/app_dev.php/test/products/1
```

* Get all products('GET')
```bash
$ curl http://localhost:8000/app_dev.php/test/products
```

* Get one product ('GET')
```bash
$curl http://localhost:8000/app_dev.php/test/products/1
```

* Delete one product('DELETE')
```bash
$curl -X DELETE http://localhost:8000/app_dev.php/test/products/1
```

## Using the web service
The frontend is using AngularJS to call the REST API  and the Bootstrap for UI design which are included in the following folders and files:
* folders: **css, fonts, js**
* file: **index.html**

The web is using base resource url:http://localhost:8000/app_dev.php/test/products/:id, you can configure a different url in the **js/angular.js** file. 
To start the web, run **index.html** in any web browser.

### The screenshots can be found as following:
   * Main interface
<img src="https://github.com/joyjocoding/RestTestProduct/raw/master/screenshots/1.main.JPG" alt="main interface" width="500" height="360">

   * Add product
<img src="https://github.com/joyjocoding/RestTestProduct/raw/master/screenshots/2.add.JPG" alt="add product" width="500" height="360">
   
   * Update product
<img src="https://github.com/joyjocoding/RestTestProduct/raw/master/screenshots/3.edit.JPG" alt="update product" width="500" height="360">
  
  * Delete product
<img src="https://github.com/joyjocoding/RestTestProduct/raw/master/screenshots/4.delete.JPG" alt="delete product" width="500" height="350">
