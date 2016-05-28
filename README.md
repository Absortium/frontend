## Getting started contributing
* Clone repository, for that you should have ssh keys fro push access.
```bash
$ git clone --recursive git@github.com:absortium/deluge.git
```

* Go into `useful` directory and copy all aliases to your alias file.
  * `zsh` - `~/.zsh_aliases`
  * `bash` - `~/.bash_aliases`
 
* Set environment variables.
  * `DELUGE_PATH=WORK_DIRECTORY_PATH` 
  * `DEFAULT_MODE='frontend'`

* Add entry to the `/etc/hosts`
   * If you run docker containers on the docker-machine, than check your ip and pass it to the `/etc/hosts`
   ```
   $ docker-machine ip
   $ sudo bash -c 'echo "absortium.com <ip>" >> /etc/hosts'
   ```
   * Otherwise set localhost
   ```
   $ sudo bash -c 'echo "absortium.com localhost" >> /etc/hosts'
   ```
   
* Open new terminal and go into docker `dev` directory, if there is no such alias than you should check - `Are aliases were preloaded?`
  ```
  godd
  ```

* Run `postgres` service which serve as database.
  ```
  $ dc up -d postgres
  ```
* Run `frontend` and make sure that service runs without errors.
  ```
  $ dc up frontend
  ```

* Go to the `absortium.com`
    
## Tips
* If you use `docker-machine` than you must download project only in user directory.
