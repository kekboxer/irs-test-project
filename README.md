<<<<<<< HEAD
## irs-test-project
=======
##irs-test-project
>>>>>>> master

#### This is a test project for IRS.

To run this application locally, you need to edit **/config/default.json** file:

```json
{
"port": 5000,
"db_username": "your_database_username",
"db_password": "your_database_password",
"secret_key": "your_secret_session_key",
"cookie_key": "your_secret_cookie_key",
"redis_host": "redis_node",
"database_host": "database"
}
```
Then, run in command line following commands:

`$ docker-compose build`

`$ docker-compose up`

After it, application will be available on localhost