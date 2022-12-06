## Description
Rest API with Node.js and PostgreSQL
## Installation

- Create a `.env` file from `.env.example` file and fill in the information
- Run the following command:

```bash
yarn
```

## Running the app

1. Run migrations

```bash
yarn db:migrate
```
2. Run migration seed
```bash
yarn db:seed
```
3. Run the app
```bash
yarn start
```

## How to test

For articles administration please use placeholder `%imageName%` (image name without extension) in your text file for connecting images

### Example
1. Content text with placholders
```
Lorem ipsum dolor %img1% sit amet, consectetur %img2% adipiscing elit, sed do eiusmod tempor incididunt %img3% ut labore
```
2. upload corresponding images
```
img1.png
img2.png
img3.jpeg
```

For testing the routes please use attached postman coolection `api.postman_collection.json`