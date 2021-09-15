# Simple mailer service using nodemailer and distribute app in a container

## To run

Docker with docker-compose installed

- Download project
- Create .env file with the next params

```.txt
SERVER_PORT=<port_number>
HOST=<mail_server_ip>
PORT=<mail_server_port>
USER_NAME=<mail_server_user_name>
PASS=<mail_server_user_password>
```

NOTE if port_number is different than 3000 then should modify Dockerfile to match with the new value

run in terminal (or similar)

```bash
docker-compose up --build
```

if everything works well we should see

```bash
web_1  | Service started on port 3000
```

## To test

Using REST CLIENT
perform POST request with body

```json
{
  "fromName": "MAIL FOO",
  "fromEmail": "<sender>@<domain>.com",
  "to": "<receiver>@<domain>.com",
  "subject": "Hello to my friends from nodejs and expressjs",
  "text": "This is text body",
  "html": "<b>This is html body</b>"
}
```

should receive next 200 status response with body

```json
{
  "message": "Mail sended"
}
```

In console (where your container output is displayed) we should see

```bash
web_1  | Message sent: <<ID>@<domain>>
```

Email should be received in the mail set in "to" field in POST request

## To stop

hit ctrl + C // or whatever cancel jobs in your terminal
write

```bash
docker-compose down
```

and you should se something like this

```bash
Removing node-sendmail-service_web_1 ... done
Removing network node-sendmail-service_default
```
