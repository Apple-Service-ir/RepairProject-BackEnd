# API Documentation

- All API responses have 'ok' and 'err' if response have err

[Login API](https://github.com/Apple-Service-ir/AppleService-RepairProject#login-api)\
[Register API](https://github.com/Apple-Service-ir/AppleService-RepairProject#register-api)

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

1- [500] can't create user\
2- [200] phone number used
