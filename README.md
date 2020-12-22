<!-- prettier-ignore -->
# Recovering Password

**Functional Requirements**

- The user must be able to recovery its password providing its e-mail;
- The user must receives an e-mail with instructions to password recovering;
- The user mus be able to redefine hs password;

**Non Functional Requirements**

- Using Mailtrap tool in order to test email sending in development environment;
- Using Amazon SES in order to send e-mail in production environment;
- Sending e-mails process must happen in background job

**Business Rules**

- The link sent by e-mail to reset password must expire in 2h;
- The user must confirm the password that was redefined;

# Perfil Updating

**Function Requirements**

- The user must be able to update its name, e-mail and password

**Business Rules**

- User must not change its e-mail for one already used;
- In order to update its password, the user must provider its old password;
- In order to update its password, the user must confirm the new one;

# Provider Dashboard

**Function Requirements**

- User must not to list its appointments from a specific day;
- Provider must receive a notification always it has a new appointment;
- Provider must be able to see non read notifications;

**Non Function Requirements**

- Provider appointments must be storage in cache;

**Business Rules**

- A notification must have a status of read and non read;
- Provider Notifications must be storage in MongoDB;
- Provider Notifications must be send in real time using Socket.io lib;

# Appointment Services

**Function Requirements**

- User must be able to list all registers providers;
- User must be able to list the days in a month, with at least one provider hour available;
- User must be able to list available hours from a provider in a specific day;
- User must be able to make new appointment with a provider;

**Non Function Requirements**

- Providers list must be storage in cache;

**Business Rules**

- Each appointment must take 1h long;
- Appointments must be available between 08am and 06pm (First hour at 08am and last one 05pm);
- User must not make appointments in non available hour;
- User must not make appointments before the current hour;
- User must not make appointments with itself;

# Infrastructure

**In order to create/update the database tables execute the following command**

- yarn typeorm migration:run

# Tasks Order - Password Forgot/Reset

1. TDD
1. Routes and Controllers
1. Tokens Repository (TypeORM)
1. Create tokens migrations
   1. yarn typeorm migration:create -n CreateUserTokens
1. E-mail send provider (DEV)
1. Register provides into the container
1. Test everything
# walmart-back
# walmart-back
