
## Getting started
#### Prerequisites
  
    Name  | Version 
  --------| -------
  docker-compose | 1.8.0-rc1
  docker | 1.12.0-rc3
  
  **Step №1**: Clone repository.  
  ```bash
  $ git clone --recursive https://github.com/absortium/deluge.git
  ```

  **Step №2**: For simplicity I prefer use [aliases](#alias-info) which I developed for this project, on first sign it might look overwhelming, but I think it may significantly help you for developing, so add env variables and aliases from `useful` directory - copy this in the `.bashrc` or `.zshrc` (this code install project aliases every time when you instantiate terminal window):
  ```bash
    export DELUGE_PATH="YOUR_WORK_DIRECTORY_PATH"
    export DEFAULT_MODE="frontend"
    for f in $DELUGE_PATH/useful/aliases/*; do
      source "$f"
    done  
  ```
  
  **Step №3**: Ask maintainer to give you `.sensetive` file.
  
  **Step №4**: Install and run `postgres` service.
  ```bash
  $ dc up -d postgres
  ```

  **Step №5**: Build `backend` service.
  ```bash
  $ dc build backend
  ```  

**Step №6**: Migrate database.
  ```bash
  $ dc run m-backend migrate
  ```
  
**Step №7**: Install and run `frontend`.
  ```bash
  $ dc up frontend
  ```
   
**Step №8**: Go to the `localhost:3000`
 
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
