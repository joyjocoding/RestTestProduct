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
$ composer require nelmio/cors-bundle
$ composer require friendsofsymfony/rest-bundle:1.1.0
$ composer require jms/serializer-bundle
$ php composer require voryx/restgeneratorbundle dev-master
```

Refer the details about the budle for generating the REST controller here: Refer here: https://github.com/voryx/restgeneratorbundle/blob/master/README.md
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
2. Cofigure the ** app/config/config.yml ** as following:
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
        '^/api/':
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

1. Setup the databae in app/config/parameters.yml file, see https://symfony.com/doc/current/doctrine.html
you can create the mySQL database with the **post.sql** file.
2. Create a new entity called 'Post'
```bash
$ php app/console doctrine:generate:entity --entity=AppBundle:Post --format=annotation --fields="SKU:string(255) Name:string(255) Price:decimal(13,4)" --no-interaction
``` 
3. Update the database schema:
```bash
$ php app/console doctrine:schema:update --force
```
4. Generate the API controller:
```bash
$ php app/console voryx:generate:rest --entity="AppBundle:Post"
```

## Testing the REST API

You could install the POSTMAN extension for the browser chrome or you can using the following curl command:
 
* Creating the product('POST'):
 ```bash
curl -i -H "Content-Type:application/json" -X POST -d "{\"sKU\":\"xyztu\",\"name\":\"test\",\"price\":\"777.00\"}" http://localhost:8000/app_dev.php/product/posts
```

* Updating the product(PUT): 
```bash
curl -i -H "Content-Type:application/json" -X PUT -d "{\"sKU\":\"xyztu\",\"name\":\"test\",\"price\":\"777.00\"}" http://localhost:8000/app_dev.php/product/posts/1
```

* Get all products('GET')
```bash
$ curl http://localhost:8000/app_dev.php/product/posts
```

* Get one product ('GET')
```bash
$curl http://localhost:8000/app_dev.php/product/posts/1
```

* Delete one product('DELETE')
```bash
$curl -X DELETE http://localhost:8000/app_dev.php/product/posts/1
```

## Using the web service
The frontend are using the following folders and files in the repositry:
folders: **css, fonts, js**
file: **index.html**

The web is using base resource url:http://localhost:8000/app_dev.php/product/posts/:id, you can configure a different url in the **js/angular.js** file. 
To start the web, run **index.html** in any web browser.
