# Zadanie 4

:poland: Aplikacja do obsługi sklepu

:uk: E-Commerce app

## Backend

Created with [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), [SQLite](https://www.sqlite.org/index.html).

Enables:

- registering new account
- authentication via username/password (with use of [Passport.js](https://www.passportjs.org/)), afterwards returning JWT for use in subsequent requests
- RBAC (Role Based Access Control) implemented with Nest guards

You can explore available endpoints through SwaggerUI, that is available at `http://localhost:3000/swagger`.

Before running the app you need to create a `.env` file and provide value for each variable defined in [`.evn.example` file](backend/.env.example).

## Frontend

Created with [Angular](https://angular.io), [Bootstrap 5](https://getbootstrap.com/) and [ng-bootstrap](https://ng-bootstrap.github.io/).

Unauthenticated and regular users may browse products and add them to cart. Regular users may also place orders.

Administrators can modify products, but cannot add them to cart. Administrators can also manage placed orders - mark as accepted, completed or cancelled.
