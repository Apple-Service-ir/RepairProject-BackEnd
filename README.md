# API Documentation

- All API responses have 'ok' and 'err' if response have err

[Auth API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#auth-api)\
[Register API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#register-api)\
[Submit Order API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#submit-order-api)\
[Cancel Order API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#cancel-order-api)\
[List of Cities API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#list-of-cities-api)\
[List of Devices API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#list-of-devices-api)\
[List of Parts API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#list-of-parts-api)\
[Get User Information API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#get-user-information)\
[Edit User Information API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#edit-user-information)\
[Create Ticket API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#create-ticket-api)\
[Close Ticket API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#close-ticket-api)\
[Get All Tickets API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#get-all-tickets-api)\
[New Ticket Message API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#new-ticket-message-api)\
[Get All Users API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#get-all-users-api)\
[Get All Orders API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#get-all-orders-api)\
[Content Controller API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#content-controller-api)\
[LogOut Controller API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#logout-controller-api)\
[Change Order Status API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#change-order-status-api)\
[Create User By Admin API](https://github.com/Apple-Service-ir/RepairProject-BackEnd#create-user-by-admin-api)

[Roles Documentation](https://github.com/Apple-Service-ir/RepairProject-BackEnd#roles-documentation)

## Auth API

|                        URL                         | Method | Response Type |           Queries            |        Body        |
| :------------------------------------------------: | :----: | :-----------: | :--------------------------: | :----------------: |
| [/auth](/Back-End/controllers/authController.js) |  POST  |     JSON      | `action (generate or submit)` `mode (register or login)` | `phone` `code` |

**Errors :**

| Code | Ok | Err | Description | nextPage |
| :---: | :---: | :---: | :---: | :---: |
| 404 | false | حساب کاربری با این شماره یافت نشد. | No users found with this phone number | false |
| 401 | false | این شماره از قبل ثبت شده است. | Phone number already registered | false |
| 406 | false | شما کد فعال دارید، لطفا آن را وارد کنید | This phone number has valid auth code | true |
| 400 | false | complete parameters [phone, code] | Set phone and code parameter into body of request | - |


## Register API

|                           URL                            | Method | Response Type | Queries |                                                      Body                                                      |
| :------------------------------------------------------: | :----: | :-----------: | :-----: | :------------------------------------------------------------------------------------------------------------: |
| [/register](/Back-End/controllers/registerController.js) |  POST  |     JSON      |    -    | `firstName (string)` `lastName (string)` `city (string)` `phone (string)` |

**Errors :**


| Code |  Ok   |        Err        |                   Description                    |
| :--: | :---: | :---------------: | :----------------------------------------------: |
| 500  | false | خطای سرور. عملیات با شکست مواجه شد. |   Internal error for insert user into database   |
| 401  | false | این شماره موبایل از قبل ثبت شده است. | Found another account with the same phone number |

## Submit Order API

|                           URL                            | Method | Response Type | Queries |                                                      Body                                                      |
| :------------------------------------------------------: | :----: | :-----------: | :-----: | :------------------------------------------------------------------------------------------------------------: |
| [/orders/submit](/Back-End/controllers/orders/submitController.js) |  POST  |     JSON      |    -    | `userId (int)` `address (string)` `city (string)` `phoneId (int)` `partId (int)` `description (string)` `picture (file)` |

**Errors :**


| Code |  Ok   |        Err        |                   Description                    |
| :--: | :---: | :---------------: | :----------------------------------------------: |
| 400  | false | شهر انتخاب شده مجاز نمی‌باشد. |   You have to add `city` to body of your request   |
| 400 | false | دستگاه انتخاب شده مجاز نمی‌باشد. | phoneId is incorrect
| 400 | false | قطعه انتخاب شده مجاز نمی‌باشد. | productId is incorrect
| 400 | false | لطفا عکس دستگاه خود را انتخاب کنید. | You have to add picture file into body of request using form data
| 406 | false | شما سفارش فعال دارید. | -

## List of cities API

|                           URL                            | Method | Response Type | Queries |                                                      Body                                                      |
| :------------------------------------------------------: | :----: | :-----------: | :-----: | :------------------------------------------------------------------------------------------------------------: |
| [/list/cities](/Back-End/controllers/list/citiesController.js) |  GET  |     JSON      |    -    | - |

**Errors :**


| Code |  Ok   |        Err        |                   Description                    |
| :--: | :---: | :---------------: | :----------------------------------------------: |
| -  | - | - |   -   |

## List of devices API

|                           URL                            | Method | Response Type | Queries |                                                      Body                                                      |
| :------------------------------------------------------: | :----: | :-----------: | :-----: | :------------------------------------------------------------------------------------------------------------: |
| [/list/devices](/Back-End/controllers/list/devicesController.js) |  GET  |     JSON      |    -    | - |

**Errors :**


| Code |  Ok   |        Err        |                   Description                    |
| :--: | :---: | :---------------: | :----------------------------------------------: |
| -  | - | - |   -   |

## List of parts API

|                           URL                            | Method | Response Type | Queries |                                                      Body                                                      |
| :------------------------------------------------------: | :----: | :-----------: | :-----: | :------------------------------------------------------------------------------------------------------------: |
| [/list/parts](/Back-End/controllers/list/partsController.js) |  GET  |     JSON      |    -    | - |

**Errors :**


| Code |  Ok   |        Err        |                   Description                    |
| :--: | :---: | :---------------: | :----------------------------------------------: |
| -  | - | - |   -   |

## Get User Information

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/informations/get](/Back-End/controllers/informations/getController.js) | GET | JSON | `token` | - |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 200 | false | parameters not found \[token\] | You have to set token into query of request |
| 200 | false | user is not defined | Maybe user deleted by admins |
| 200 | false | token is invalid | - |

## Edit User Informations

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/informations/edit](/Back-End/controllers/informations/editController.js) | POST | JSON | - | `token` and anything you want to change |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 401 | false | user not found | No users found with this user id |

## Create Ticket API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/tickets/new](/Back-End/controllers/tickets/newController.js) | POST | JSON | - | `token` `subject` `text` |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 200 | false | parameters not found \[token, subject\] | Put token and subject into body |

## Close Ticket API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/tickets/close](/Back-End/controllers/tickets/closeController.js) | POST | JSON | - | `token` `ticketId` |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 400 | false | parameters not found \[ticketId\] | Put ticket id you want to close in body |
| 404 | false | تیکت مورد نظر یافت نشد. | No tickets found with this ticket id |

## Get All Tickets API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/tickets/all](/Back-End/controllers/tickets/getAllController.js) | GET | JSON | `token` | - |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| - | - | - | - |

## New Ticket Message API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/tickets/messages/new](/Back-End/controllers/tickets/newMessageController.js) | POST | JSON | - | `ticketId` `text` `isSupport (optional)` |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 400 | false | parameters not defined \[ticketId, text\] | put ticket id and text in body |
| 406 | false | تیکت شما اجازه ارسال پیام ندارد. | ticket is closed or not found |

## Get all users API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/admins/users/all](/Back-End/controllers/admins/getAllUsersController.js) | GET | JSON | `token` | - |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| - | - | - | - |

## Get all orders API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/admins/orders/all](/Back-End/controllers/admins/getAllOrdersController.js) | GET | JSON | `token` | - |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| - | - | - | - |

## Cancel Order API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/orders/cancel](/Back-End/controllers/orders/cancelController.js) | POST | JSON | - | `token` `orderId` |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| - | - | - | - |

## Content Controller API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [-](/Back-End/controllers/contentController.js) | POST | JSON | - | `page` |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 400 | false | parameters not defined \[page\] | - |

## LogOut Controller API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/logout](/Back-End/controllers/logoutController.js) | POST | JSON | - | `page` |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 401 | false | توکن شما از بین رفته است. | token expired |

## Change Order Status API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/admins/orders/status](/Back-End/controllers/admins/changeOrderStatusController.js) | POST | JSON | - | `id` `status [pending, working, done, cancelled]` |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 400 | false | parameters undefined \[id, status\] | put order id and new status mode into body |
| 400 | false | order undefined | Order ID is not valid |

## Create User By Admin API

| URL | Method | Response Type | Queries | Body |
| :---: | :---: | :---: | :---: | :---: |
| [/admins/users/create](/Back-End/controllers/admins/createUserController.js) | POST | JSON | - | `firstName` `lastName` `phone` `city` |

**Errors :**


| Code | Ok | Err | Description |
| :---: | :---: | :---: | :---: |
| 400 | false | parameters undefined \[firstName, lastName, phone, city\] | put needed parameters into body of request |
| 400 | false | city is invalid | City id is not valid |
| 400 | false | این شماره موبایل از قبل ثبت شده است. | a user registered with this phone number |

# Roles documentation

- If user have not access, 'ok' will be false and err will be 'access denied'

| Rank Name |  Converted  |
| :-------: | :---------: |
|   admin   |    مدیر     |
| developer | توسعه دهنده |
| repairman | تعمیر کننده |
|   user    |    کاربر    |
