# API Documentation

- All API responses have 'ok' and 'err' if response have err

[Login API](https://github.com/Apple-Service-ir/AppleService-RepairProject#login-api)\
[Register API](https://github.com/Apple-Service-ir/AppleService-RepairProject#register-api)

## Login API

|                       URL                       | Method | Response Type |           Queries            |        Body        |
| :---------------------------------------------: | :----: | :-----------: | :--------------------------: | :----------------: |
| [/login](/Back-End/controllers/loginController) |  POST  |     JSON      | `action (phone or password)` | `phone` `password` |

**Errors :**

| Code |  Ok   |           Err           |                            Description                             |
| :--: | :---: | :---------------------: | :----------------------------------------------------------------: |
| 403  | false |     user not found      |             No users in database with this information             |
| 403  | false | password is not correct | Password is not correct (show username or password is not correct) |

## Register API

|                          URL                          | Method | Response Type | Queries |                                                      Body                                                      |
| :---------------------------------------------------: | :----: | :-----------: | :-----: | :------------------------------------------------------------------------------------------------------------: |
| [/register](/Back-End/controllers/registerController) |  POST  |     JSON      |    -    | `firstName (string)` `lastName (string)` `city (string)` `phone (string)` `profile (file)` `password (string)` |

**Errors :**

| Code |  Ok   |        Err        |                   Description                    |
| :--: | :---: | :---------------: | :----------------------------------------------: |
| 500  | false | can't create user |   Internal error for insert user into database   |
| 200  | false | phone number used | Found another account with the same phone number |
