
    Branch  | Status 
  --------| -------
  master | [![Build Status](https://travis-ci.org/absortium/frontend.svg?branch=master)](https://travis-ci.org/absortium/frontend)
  development | [![Build Status](https://travis-ci.org/absortium/frontend.svg?branch=development)](https://travis-ci.org/absortium/frontend)
  
## Getting started  
#### Prerequisites
  
    Name  | Version 
  --------| -------
  docker-compose | 1.8.0-rc1
  docker | 1.12.0-rc3
  
  **Step №1**: Clone repository.  
  ```bash
  $ git clone --recursive https://github.com/absortium/deluge.git
  $ cd deluge
  ```

  **Step №2**: Ask maintainer to give you `.sensitive` file.
  
  **Step №3**: Install `frontend` and run tests.
  ```bash
  $ ./useful/install.sh frontend
  ```

## Hot connect `frontend` to the `backend` and start developing?
  **Step №1**: Install `backend` and tun tests.
  ```bash
  $ ./useful/install.sh backend
  ```  
  
  **Step №2**: For simplicity I prefer use [aliases](#alias-info) which I developed for this project, on first sign it might look overwhelming, but I think it may significantly help you for developing, so add env variables and aliases from `useful` directory - copy this in the `.bashrc` or `.zshrc` (this code install project aliases every time when you instantiate terminal window):
  ```bash
  export DELUGE_PATH="YOUR_WORK_DIRECTORY_PATH"
  export DEFAULT_MODE="frontend"
  for f in $DELUGE_PATH/useful/aliases/*; do
    source "$f"
  done  
  ```
  
  **Step №3**: Run `frontend`.
  ```bash
  $ dc up frontend
  ```
  
  **Step №4**: Go to the `localhost:3000`  

## Test Driven Development (TDD)
  ```bash
  $ dc run frontend run test:watch -- --grep='<test name>'
  ```
  
## Services
* `m-backend` - main backend service.
* `w-backend` - backend worker service (celery).
* `frontend` - frontend service.
* `postgres` - postgres service (postgres data are stored separately, even if you remove service the data would be persisted).
* `rabbitmq` - queue service.
* `redis` - redis service (needed as backend for `rabbitmq` tasks store).
* `router` - `crossbar.io` service which notify user about new offers, market info, exchange history changes.

## Alias info
* `god` - go to the `DELUGE_PATH` directory.
* `godd` - go to the `docker` directory.
* `gods` - go to the `services` directory.
* `gods <backend|frontend|ethwallet|router|ethnode>` - go to the `service` project directory.
* `di` - list all images.
* `dps` - list all working containers.
* `dcinit <unit|integration|frontend|testnet>` - init start mode, default mode is `DEFAULT_MODE` .
    * `frontend`
        * external systems like `coinbase` and `ethwallet` are mocked.
        * `postgres`, `rabbitmq`, `celery`, `router` services are required to be up in order to celery task work.
        * celery workers are working and celery tasks are executing like in real system.
        * Service `notifier` is working and emulating money notification from `coinbase` and `ethwallet`.
    * (for more information please read `README.md` in the `docker` directory)         

* `dc` - alias for `docker-compose -f $DELUGE_PATH/docker/images/dev.yml -f $DELUGE_PATH/docker/composes/frontend.yml`.
* `dc(b| build) <service>` - build service.
* `dc(r| run) <service>` - run service.
* `dc(u| up) <service>` - up service.
* `dc(l| logs) <service>` - output service logs.
* `drmc <regex>` - delete containers that much regex expression.
* `drmi <regex>` - delete images that much regex expression.
* `drmd <regex>` - delete volumes that much regex expression.
