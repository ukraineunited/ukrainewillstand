# ukrainewillstand
Website for ukrainewillstand.org

The purpose of the application and API is to assist refugees either via information, or attaining documentation while on the border. We have a set of APIs that allow us to ingest form data and from that generate necassary documents for refugees. We will also provide information on changes in guidelines, and where they can get further updates based on the country they are choosing to seek asylum from.

Consists of [Frontend](frontend), [Backend](backend)(written in Python), and a [Data Aggregator](worker)(written in JavaScript for [Workers](https://workers.cloudflare.com))


### How to build Backend
The backend is built with Flask using Docker. To build the container do the following:

1. Install docker
2. `cd backend`
3. `docker build -t ukrainewillstand .`
4. Add a .env file describing the enviroment variables into the backend folder
5. Run `docker run -p 3000:3000 ukrainewillstand`
6. Access site on `127.0.0.1:3000`
