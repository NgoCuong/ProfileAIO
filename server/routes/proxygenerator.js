/* This class used to create linode proxies */

module.exports = class ProxyGenerator {

    // #region Constructor

    constructor(accessToken) {
        this.accessToken = accessToken;
        this.port = '3128';

        this.bashCommand =
            "yum -y update && " +
            "yum -y install squid httpd-tools wget && " +
            "systemctl start squid && " +
            "systemctl  enable squid && " +
            "touch /etc/squid/passwd && " +
            `htpasswd -b /etc/squid/passwd ${this.user} ${this.pass} && ` +
            "wget -O /etc/squid/squid.conf https://raw.githubusercontent.com/dzt/easy-proxy/master/confg/userpass/squid.conf && " +
            "systemctl restart squid.service && " +
            "systemctl enable squid.service && " +
            `iptables -I INPUT -p tcp --dport ${this.port} -j ACCEPT && ` +
            "iptables-save";

        this.request = require('request-promise');
        this.pLimit = require('p-limit');
        this.http = require('./HttpRequest');
        this.api = new this.http(this.accessToken);
    }

    // #endregion

    // #region Helpers

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // get number of servers created
    async getIpCount() {
        var response = await this.api.httpRequest('https://api.linode.com/v4/linode/instances', 'get')
            .catch(function (response) {
                console.log("Err: " + response.statusCode);
            });
        return response.results;
    }

    // #endregion

    // #region Create Linode Servers

    async createInstance(instancePassword, instanceRegion) {

        try {

            var label = this.getRandomInt(1, 1000000);
            var payload = {
                "region": instanceRegion,
                "type": "g6-nanode-1",
                "image": "linode/centos7",
                "root_pass": instancePassword,
                "booted": true,
                "label": ("proxyserver" + label)
            };

            var response = await this.api.httpRequest('https://api.linode.com/v4/linode/instances', 'post', payload)
            var ip = response.ipv4[0];
            var status = response.status;

            console.log(`${status} server ${ip} `);

        } catch (err) {
            throw err;
        }
    }

    async createBatchInstancesLimit(number) {
        try {
            // number of concurent requests limit
            var concurentLimit = 10;
            const limit = this.pLimit(concurentLimit);
            var promises = [];

            for (var i = 0; i < number; ++i) {
                promises.push(limit(() => this.createInstance(this.pass, this.region)));
            }
            await Promise.all(promises);
            return JSON.stringify({ 'created': number }, null, 3);
        } catch (err) {
            throw err;
        }
    }

    // #endregion

    // #region Delete Linode Servers 

    async  deleteInstance(nodeId) {
        await this.api.httpRequest('https://api.linode.com/v4/linode/instances/' + nodeId, 'delete')
            .catch(function (err) {
                console.log("\nResponse: " + err.message);
                throw err;
            });
    }

    async deleteAllInstances() {
        try {
            var response = await this.api.httpRequest('https://api.linode.com/v4/linode/instances', 'get')

            var serverCount = response.data.length;
            if (serverCount == 0) {
                console.log("No servers to delete");
            } else {
                for (var i = 0; i < serverCount; i++) {
                    var machine = response.data[i];
                    console.log("Deleting server %s", machine.ipv4[0]);
                    this.deleteInstance(machine.id);
                }
                console.log(`Deleted ${serverCount} servers`);
            }
            return JSON.stringify({ 'deleted': serverCount }, null, 3);
        } catch (err) {
            throw err;
        }
    }

    // #endregion

    // #region Execute Remote CLI

    // execute remote cl command for a server
    executeCommand(ip, pass, bashCommand) {
        try {
            var exec = require('ssh-exec');
            return new Promise(function (resolve) {
                //var v_host = ip;
                exec(bashCommand, {
                    user: 'root',
                    host: ip,
                    password: pass
                }, function (err) {
                    console.log(`${ip}...complete!`)
                    resolve();
                })
                // enable to see log output
                /*.pipe(process.stdout , function (err, data) {
                    if ( err ) { 
                        console.log(v_host); 
                        console.log(err); 
                    }
                    console.log(data);
                })*/
            });
        } catch (err) {
            throw err;
        }
    }

    // execute remote cl for all servers
    async executeBatchCommand() {

        // get list of all ip: password:
        var ips = await this.getAllPageIps();

        var promisesQueue = [];
        var len = ips.length;

        for (var i = 0; i < len; i++) {
            promisesQueue.push(this.executeCommand(ips[i], this.pass, this.bashCommand));
        }
        try {
            await Promise.all(promisesQueue)
                .then(() => {
                    console.log("Proxy scripts completed");
                })
                .catch((e) => {
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    // #endregion

    // #region Fetch Server Ips

    // gets all ips per page from api call
    async getPageIps(pageNumber, includeInstanceId = false) {
        try {
            var ips = [];
            var response = await this.api.httpRequest(`https://api.linode.com/v4/linode/instances?page=${pageNumber}`, 'get')
            var serverCount = response.data.length;
            if (serverCount == 0) {
                throw new RangeError("Server count is 0");
            } else {
                for (var i = 0; i < serverCount; i++) {
                    var machine = response.data[i];
                    if (includeInstanceId) {
                        ips.push([machine.ipv4[0], machine.id]);
                    } else {
                        ips.push(machine.ipv4[0]);
                    }
                }
                return ips;
            }
        } catch (err) {
            throw err;
        }
    }

    // gathers all ips of servers
    async getAllPageIps(includeInstanceId = false) {
        try {
            var ips = [];
            var response = await this.api.httpRequest('https://api.linode.com/v4/linode/instances/', 'get')
            var pageCount = response.pages;
            for (var i = 1; i < pageCount + 1; ++i) {
                if ( includeInstanceId) {
                    var res = await this.getPageIps(i, true);
                    ips = ips.concat(res);
                } else {
                    var res = await this.getPageIps(i);
                    ips = ips.concat(res);
                }
            }
            return ips;
        } catch (err) {
            throw err;
        }
    }

    // #endregion

    // #region Fatch Server Status

    // gets all status per page from api call
    async getPageStatus(pageNumber) {

        try {
            var response = await this.api.httpRequest(`https://api.linode.com/v4/linode/instances?page=${pageNumber}`, 'get');
            for (var i = 0; i < response.data.length; i++) {
                var machine = response.data[i];
                if (machine.status != 'running') {
                    return false;
                }
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    // gathers all server status
    async checkServerStatus() {

        var response = await this.api.httpRequest('https://api.linode.com/v4/linode/instances/', 'get');
        var pageCount = response.pages;

        for (var i = 1; i < pageCount + 1; ++i) {
            if (await this.getPageStatus(i) == false) {
                return false;
            }
        }
        console.log('Servers are ready!');
        return true;
    }

    insertProxyDB(proxyVal, instanceId) {
        try {
            var proxyObject = require('./proxySchema');
            let v = new proxyObject({
                userId: this.userId,
                proxy: proxyVal,
                region: this.region,
                instanceId: instanceId
            });
        
            v.save();
        } catch (err) {
            throw err;
        }        
    }




    // #endregion 

    // Step 1: Create servers
    async generateServers(userId, proxyNumber, user, pass, region) {
        try {
            this.userId = userId;
            this.user = user;
            this.pass = pass;
            this.region = region;
            this.number = proxyNumber;

            console.log("Creating servers...")
            var res = await this.createBatchInstancesLimit(this.number);
            console.log("Server creation complete!");
            await this.generateProxies(userId, user, pass, region);
        } catch (err) {
            throw err;
        }
    }

    // Step 2: Setup servers
    async generateProxies(userId, user, pass, region) {
        try {
            this.userId = userId;
            this.region = region;
            this.user = user;
            this.pass = pass;

            while (await this.checkServerStatus() == false) {
                console.log("Servers not up yet...waiting");
                await this.sleep(10000);
            }

            console.log("Running scripts on servers, please wait...")
            await this.executeBatchCommand();

            var iplist = await this.getAllPageIps(true);
            console.log(`Scripts complete, ${iplist.length} proxies generated!`);

            var generatedProxyList = [];
            for (var i = 0; i < iplist.length; i++) {
                var proxy = `${iplist[i][0]}:${this.port}:${this.user}:${this.pass}`;
                this.insertProxyDB(proxy, iplist[i][1]);
                generatedProxyList.push(proxy);
                console.log(proxy);
            }
            return proxy;
        } catch (err) {
            throw err;
        }
    }
};

