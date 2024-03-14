# Project Name

LOGIQUE TEST

## Prerequisites
- Docker
- Docker Compose

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/rahmatputrawiranata/nestjs-logique-test
    ```

2. Navigate to the `nestjs-logique-test/technical-test/docker/dev` folder

3. Start the containers:
    ```bash
    docker-compose up -d
    ```

4. Navigate to the project directory `nestjs-logique-test/technical-test/app`

3. Copy the environment variables file:
    ```bash
    cp env.example .env
    ```

4. Update the `.env` file with the necessary configuration values.

5. Install dependencies:
    ```bash
    yarn
    ```

6. Run migration
    ```bash
    yarn mongo-migrate up
    ```



## Running the Project on production environtment

1. Navigate to the `root folder`

2. Run build command

    ```bash
    ./do.sh
    ```

## Running the Project on development environtment

1. Navigate to the `nestjs-logique-test/technical-test/docker` folder:
    ```bash
    cd dev
    ```

2. Start the containers:
    ```bash
    docker-compose up -d
    ```

3. Access the project in your browser at `http://localhost:port`.