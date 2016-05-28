## Getting started
* Clone repository, for that you should have ssh keys (push)
```bash
$ git clone --recursive git@github.com:absortium/deluge.git
```

* Go into `useful` directory and copy all aliases to your alias file.
  * `zsh` - `~/.zsh_aliases`
  * `bash` - `~/.bash_aliases`
 
* Set environment variables.
  * `DELUGE_DIRECTORY=YOUR_WORK_DIRECTORY` 
  * `DEFAULT_MODE='frontend'`

* Add entry to the /etc/hosts
   * If you run docker containers on the docker-machine, than check your ip and set it to the /etc/hosts
   ```
   $ docker-machine ip
   $ sudo bash -c 'echo "absortium.com <ip>" >> /etc/hosts'
   ```
   * Otherwise set localhost
   ```
   $ sudo bash -c 'echo "absortium.com localhost" >> /etc/hosts'
   ```
   
* Open new terminal and go into docker `dev` directory
```
godd
```

* Run `postgres` service which serve as database.
```
$ docker-compose up -d postgres
```
* Run `frontend` and make sure that service runs without errors.
```
$ docker-compose up frontend
```

* Go to the `absortium.com`
    
## Tips
* If you use `docker-machine` than you must download project only in user directory.
