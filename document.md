# API Documentation

## Login API

`URL : /login  |  Method : POST  |  Response : JSON`

> Parameter : action [password & phone]\
> Body : phone & password

### Errors :

1- [403] user not found\
2- [403] password is not correct

## Register API

`URL : /register  |  Method : POST  |  Response : JSON`

> Body : [firstName, lastName, city, phone, profile(picture file), password]

### Errors :

1- [500] false -> Can't create user
