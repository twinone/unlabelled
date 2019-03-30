# unlabeled

Gerneric README.md



# Endpoints

#### User Registration / authentication
* GET /register/{email}/{pass} => {token: String}
The user will be logged in after registering

* GET /login/{email}/{pass} => {token: String}

#### Restaurant registration
* POST /restaurant/register => {restaurantToken: String}
```
POST Body: 
{
  name: String,
  location: {lat: Number, lng: Number},
  foodTypes: []String : foodType,
}
```

#### Restaurant Dashboard

* GET /restaurant/provides/{foodName = foodType}
* GET /restaurant/unprovides/{foodName = foodType}
* GET /restaurant/delete/{restaurantToken}


#### User operation
* POST /user/order/new => {orderId: String}

```
POST Body: 
{
  foodName: String,
  toppings: []String,
  deadline: int,
  maxPrice: int (cents),
}
```


* GET /user/location/{lat}/{lng} // Sets the user's location (Android)

(Low priority: tracking endpoint)


#### Restaurant operation
* GET /restaurant/accept/{orderId}/{deadline}
* GET /restaurant/decline/{orderId}



  
