
## Getting started
#### Prerequisites
  
    Name  | Version 
  --------| -------
  docker-compose | 1.6
  docker | 1.11
  docker-machine | 0.6
  
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
  
  **Step №3**: Install docker on your machine, for that go to the docker [website](https://www.docker.com). If you working on OS X do not forget that now we use old docker toolbox with docker machine. Also do not forget, that you should create `default` machine and initialize it, all information you may find on docker website.
  
  **Step №4**: Ask maintainer to give you `.sensetive` file.
  
  **Step №5**: Install and run `postgres` service.
  ```bash
  $ dcu -d postgres
  ```

  **Step №6**: Build `backend` service.
  ```bash
  $ dcb backend
  ```  

**Step №7**: Migrate database.
  ```bash
  $ dcr m-backend migrate
  ```
  
**Step №8**: Install and run `frontend`, wait for frontend to build.
  ```bash
  $ dcu frontend
  ```

**Step №9**: Add entry to the `/etc/hosts`, otherwise you will not be able to authenticate properly. If you run docker containers on the `docker-machine` (OS X), than check your `docker-machine` ip and pass it to the `/etc/hosts`:
 ```bash
 $ docker-machine ip
 $ sudo bash -c 'echo "<ip> dev.absortium.com" >> /etc/hosts'
 ```
 
 * Otherwise set `127.0.0.1`:
 
 ```bash
 $ sudo bash -c 'echo "127.0.0.1 dev.absortium.com " >> /etc/hosts'
 ```
   
**Step №10**: Go to the `dev.absortium.com:3000`
    
## Tips
* If you use `docker-machine` than you must download project only under `/Users/` directory.
 
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
