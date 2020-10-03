# server-status
Monitoring service for endpoints. A small tool by [@adrianmg](https://twitter.com/adrianmg) and [@ivanguardado](https://twitter.com/ivanguardado)

[![Build Status](https://dev.azure.com/adrianmg-gh/adrianmg/_apis/build/status/adrianmg.status-server?branchName=master)](https://dev.azure.com/adrianmg-gh/adrianmg/_build/latest?definitionId=1&branchName=master)

### Server instructions
1/ Ensure that all service backends are up and running. You can do this easily using Docker.
```sh
docker-compose up
```

2/ Install node dependencies.
```sh
npm i
```

3/ Now you can run the API service
```sh
dotenv npm run start
```

4/ Open the local url:
```sh
http://localhost:3001/{username}/endpoints
```

#### Creating data
This step has not been automated yet, so you'll have to create the Mongo documents manually. If you're running `docker-compose` you can access to the Mongo Express web panel visiting `http://localhost:8081/`.

1/ Create a new database with the name: `endpoint`

2/ Create a collection named `endpoints`.

3/ Now you can add a new endpoint to get monitorized.
```
{
    _id: "40004fdf-8dbb-478b-8613-9a9ceba22a9f",
    userId: 'username',
    name: 'Personal Website',
    url: 'yourpersonalwebsite.com'
}
```

### Client instructions
1/ Go to the `app` directory.
```sh
cd app
```

2/ Install node dependencies.
```sh
npm i
```

3/ Run the application server.
```sh
npm run dev
```

4/ Go to the web application.
```
http://localhost:3000/user/{username}
```
