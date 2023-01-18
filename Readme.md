# BarberShop

## Workspace specification

<a href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

This work space contains the source code for the barber shop application which is a social media application allowing it's users to create accounts and share their thoughts about verious topics

## Microservices

The application created in this work space are :

* **Gateway Api**: Nestjs application responsible for the handling of incoming requests, verification when needed, incrementing metrics and Logging

* **Auth service**: Nesjs application responsible for saving new users to the application, as well ase managing profiles

* **Posts service**: Nestjs application for the management of Posts shared in the application

## Containers

The dockerfiles of each microservice are contained in the root dir of the workspace: create image using the following command

```bash
docker build -it <image-tag> -f <docker-file> .
```

### Disclaimer

The current version of the dockerfiles results in images with gigantic size and it needs to be fixed as soon as possible

## Docker compose

for testing pusposes a docker compose file was provided in the root of this workspace. To run it use the command

```bash
docker compose up
```

## Notes

* The helm charts of this application are provided in this [repository](https://github.com/Ramzi-dev611/Barbershop-infra). note that template files for the database service where provided there for testing (using kind for example)

* In the infrastructure provisioning there were two issues faced:
    * The datadog api key setup didn't work
    * the database password setup didn't work (need to be fixed as soon as possible)

* The application is missing the implementation of tracing mechanism. the main condidate for it's implementation is this [repo](https://github.com/MetinSeylan/Nestjs-OpenTelemetry)

* No deployment strategy other than the default kubernetes behavior (Rolling update) was implemented

* Other setups like network policies and secrets configuration are for future releases