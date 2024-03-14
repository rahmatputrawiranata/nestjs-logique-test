# Project Name

## Prerequisites
- Docker
- Docker Compose

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

2. Navigate to the project directory:
    ```bash
    cd your-repo
    ```

3. Copy the environment variables file:
    ```bash
    cp env.example .env
    ```

4. Update the `.env` file with the necessary configuration values.

## Running the Project

1. Navigate to the `docker` folder:
    ```bash
    cd docker
    ```

2. Build the Docker images:
    ```bash
    docker-compose build
    ```

3. Start the containers:
    ```bash
    docker-compose up -d
    ```

4. Access the project in your browser at `http://localhost:port`.

## Stopping the Project

To stop the project and remove the containers, run the following command in the `docker` folder: