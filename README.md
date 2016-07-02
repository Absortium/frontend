Name  | Version
------------- | -------------
Docker-Compose | 1.6.0
Docker | 1.10.2

## Getting started contributing
* First of all clone repository.  
  ```bash
  $ git clone --recursive https://github.com/absortium/deluge.git
  ```

* Add env variables and aliases from `useful` directory, for that copy this in the `.bashrc` or `.zshrc`
  ```bash
    export DELUGE_PATH="YOUR_WORK_DIRECTORY_PATH"
    export DEFAULT_MODE="frontend"
    for f in $DELUGE_PATH/useful/aliases/*; do
      . "$f"
    done  
  ```

* Add entry to the `/etc/hosts`
   * If you run docker containers on the `docker-machine`, than check your `docker-machine` ip and pass it to the `/etc/hosts`
   ```bash
   $ docker-machine ip
   $ sudo bash -c `echo "dev.absortium.com <ip>" >> /etc/hosts`
   ```
   * Otherwise set localhost
   ```bash
   $ sudo bash -c `echo "dev.absortium.com localhost" >> /etc/hosts`
   ```

* Run `postgres` service which serve as database.
  ```bash
  $ dc up -d postgres
  ```

* Build `backend` service.
  ```bash
  $ dcb backend
  ```  

* Migrate database.
  ```bash
  $ dc run m-backend migrate
  ```
  
* Run `frontend` and make sure that service runs without errors.
  ```bash
  $ dc up frontend
  ```

* Go to the `dev.absortium.com:3000`
    
## Tips
* If you use `docker-machine` than you must download project only in user directory.
 
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
* `godd` - go to the `docker` dev directory (in order to run docker service)
* `gods` - go to the `services` directory.
* `gods <service>` - go to the `<service>` project directory.
* `dcinit <mode>` - init start mode, default mode is `DEFAULT_MODE` .
    * `frontend`
        * external systems like `coinbase` and `ethwallet` are mocked.
        * `postgres`, `rabbitmq`, `celery`, `router` services are required to be up in order to celery task work.
        * celery workers are working and celery tasks are executing like in real system.
        * (NOT EXIST YET) special service `walletnotifier` is working and emulating money notification from `coinbase` and `ethwallet` 
    * (for more information please read `README.md` in the `docker` directory)         
   
* `dc(b| build) <service>` - build service.
* `dc(r| run) <service>` - run service.
* `drmc <regex>` - delete containers that much regex expression.
* `drmi <regex>` - delete images that much regex expression.
* `dc(l| logs) <service>` - output service logs.
* `di` - list all images.
* `dps` - list all working containers.
* `ideluge` - init sensitive information that is needed for backend start.
