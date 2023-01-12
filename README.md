## Running the app (port 1955)

`npm run local`

## Running tests

`npm test`

</br>

# OVERVIEW

## Methodology

My aim was to plan a simple API that did the minimum amount of work to provide a deliverable Message Board application

Assumptions:

- A user can post a thread
- A user can view a thread
- A user can query pages of threads
- A user can post a message to a thread
- A user can delete a thread and all it's messages
- A user can delete a single message

Broke down into endpoints:

- /thread POST {message} => Thread
- /thread GET {threadId} => Thread
- /thread=queryString GET {threadId, queryString} => Thread[]
- /thread DELETE {threadId}
- /message POST {threadId, message} => Message
- /message DELETE {threadId}

</br>

## Steps

1. Create the data model

- Thread: is the first message that someone can post, has multiple messages that link to it

```
Message {
  id: string; (uuid) PK
  message: string;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
}
```

- Message: a message that relates to a thread

```
Message {
  id: string; (uuid) PK
  threadId: string; (uuid) FK
  message: string;
  dateTimeCreated: Date;
}
```

2. From the apiPlan, create:

- endpoints
- service layer
- repository layer
- SQL queries

## See `./apiPlan.png` for my initial plan for the API.

## STACK

- NodeJs
- Typescript
- Express
- SQLite (though not actually implemented)
- Jest
- Prettier

</br>

</br>

# STEPS TO GET TO v1

I wanted a solid controller/service/repo structure with test coverage before actually implementing the database and didn't have time to actually set it up.

Given how I've created it with the repository layer abstracted from the database, it would allow a database to be dropped in with minimal effort and the tests would give a good idea of if it's working.

The above would (in my opinion) give an 'alpha'/minimum deliverable product, annoyed that I didn't have enough to do it!

</br>

# NEXT STEPS (v1.1 +)

## `Tech`

### Tests

- End-to-end/integration tests and real DB (in container?)
- Only happy paths are done at the moment, would do negative paths, edge cases
- tests around validation on endpoints
- would add seeding real values to a test database to check E2E

### CI/CD

- Build pipeline: build/prettier/eslint/tests
- Deployment pipeline

### Branch Security

- Lock `main` so you can't merge directly into it, I know I did but I wouldn't usually, promise!
- Ensure pipelines are run and green before merging
- Make reviews mandatory, make commits render old commits stale etc...=

### And everything else

- Add validation and error handling to provide the user with accurate responses in case anything goes wrong

- Add a beautiful front-end to interact with the api

- Add environment variables/secrets management (not needed ATM)

- Add logging, something simple like winston

- I was originally going to have the routing done in it's own layer, and the current service calls inside a controller per router, but removed due to not needing it here, with more complex endpoints I'd add a contrller layer

- I quickly added dates as the standard Date type, I would make sure these are UTC in the future

- Update DateTimeUpdated on thread when message is added for it

- Make a base repostitory to inherit the repositories from, for standard methods like `getById`, `deleteById` etc

</br>

## `Extra Features - nice-to-have`

- Add a userId based on a cookie/ip of the user, allowing an id to be saved on messages/threads so that we can see who has posted what but remaining anoymous

- Update the dateTimeUpdated on thread when a new message has been added, allowing us to sort on it

- Add replyToId uuid field to Messages, would be able to sort into cascading
  replies to messages, like how most message boards work
