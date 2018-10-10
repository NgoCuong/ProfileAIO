

class ProxyGenerator {

    // #region Constructor
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.port = '3128';
        // this.user = 'profileaio';
        // this.pass = 'pr0fi13ai0';
        // this.region = 'us-east';
        this.serverLimitReached = false;

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
        var options = {
            auth: {
                'bearer': this.accessToken
            },
            method: 'get',
            json: true,
        };

        try {
            var jsonData = await this.request('https://api.linode.com/v4/linode/instances', options)
                .catch(function (response) {
                    console.log("Err: " + response.statusCode);
                });
            return jsonData.results;
        } catch (error) {
            console.log(error);
        }
    }

    // #endregion

    // #region Create Linode Servers
    async createInstance(instanceName, instancePassword, instanceRegion) {

        var label = this.getRandomInt(1, 1000000);

        var payload = {
            "region": instanceRegion,
            "type": "g6-nanode-1",
            "image": "linode/centos7",
            "root_pass": instancePassword,
            "booted": true,
            "label": ("proxyserver" + label)
        };
        var options = {
            auth: {
                'bearer': this.accessToken
            },
            method: 'post',
            body: payload,
            json: true,
        };

        try {
            var limitReached = false;
            var jsonData = await this.request('https://api.linode.com/v4/linode/instances', options)
                .catch(function (reason) {
                    console.log("\nResponse: " + reason.message);
                    if (reason.statusCode == 400) {
                        limitReached = true;
                    }
                });
            if (limitReached == true) {
                this.serverLimitReached = true;
            } else {
                var ip = jsonData.ipv4[0];
                var id = jsonData.id;
                var status = jsonData.status;
                console.log(`${status} server ${ip} `);
            }
        } catch (response) {
            console.log(response);
            console.log("ERROR FAILED TO CREATE SERVER..");
        }
    }


    async createBatchInstancesLimit(number) {

        // number of concurent requests limit
        var concurentLimit = 10;
        const limit = this.pLimit(concurentLimit);
        var promises = [];

        try {
            while (await this.getIpCount() != number && await this.serverLimitReached == false) {
                var rand = this.getRandomInt(0, 10000);
                promises.push(limit(() => this.createInstance(`server${rand}`, this.pass, this.region)));
            }
            await Promise.all(promises)
                .then(() => {
                    console.log("complete.");
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }
    // #endregion

    // #region Delete Linode Servers 

    async  deleteInstance(nodeId) {
        var options = {
            auth: {
                'bearer': this.accessToken
            },
            method: 'delete',
            json: true,
        };

        try {
            var jsonData = await this.request('https://api.linode.com/v4/linode/instances/' + nodeId, options)
                .catch(function (reason) {
                    console.log("\nResponse: " + reason.message);
                });
        } catch (response) {
            console.log(response);
            console.log("Error failed to delete instance");
        }
    }

    async deleteAllInstances() {
        var options = {
            auth: {
                'bearer': this.accessToken
            },
            method: 'get',
            json: true,
        };

        try {
            var jsonData = await this.request('https://api.linode.com/v4/linode/instances/', options)
                .catch(function (reason) {
                    console.log("\nResponse: " + reason.message);
                });

            var len = jsonData.data.length;

            if (len == 0) {
                console.log("No machines to delete");
            }

            for (var i = 0; i < len; i++) {
                var machine = jsonData.data[i];
                console.log("Deleting server %s", machine.ipv4);
                this.deleteInstance(machine.id);
            }
            console.log(`Deleted ${len} servers`);

        } catch (response) {
            console.log(response);
            console.log("Error failed to create instance");
        }
    }
    // #endregion

    // #region Execute Remote CLI

    // execute remote cl command for a server
    executeCommand(ip, pass, bashCommand) {
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
    }

    // execute remote cl for all servers
    async executeBatchCommand() {

        // get list of all ip: password:
        var ips = await this.getServerIps();
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

    // #region  Fetch Server Ips

    // gets all ips per page from api call
    async getPageIps(pageNumber) {
        var ips = [];
        var options = {
            auth: {
                'bearer': this.accessToken
            },
            method: 'get',
            json: true,
        };

        try {
            var jsonData = await this.request(`https://api.linode.com/v4/linode/instances?page=${pageNumber}`, options)
                .catch(function (reason) {
                    console.log("\nResponse: " + reason.message);
                });

            if (jsonData.data.length == 0) {
                console.log("No instances found");
            }

            for (var i = 0; i < jsonData.data.length; i++) {
                var machine = jsonData.data[i];
                ips.push(machine.ipv4[0]);
            }
            return ips;
        } catch (response) {
            console.log(response);
        }
    }

    // gathers all ips of servers
    async getServerIps() {
        var ips = [];

        var options = {
            auth: {
                'bearer': this.accessToken
            },
            method: 'get',
            json: true,
        };

        try {
            var jsonData = await this.request('https://api.linode.com/v4/linode/instances/', options)
                .catch(function (reason) {
                    console.log("\nResponse: " + reason.message);
                });
            if (jsonData.data.length == 0) {
                console.log("No instances found");
            }
            var pages = jsonData.pages;

            for (var i = 1; i < pages + 1; ++i) {
                var res = await this.getPageIps(i);
                ips = ips.concat(res);
            }
            return ips;
        } catch (response) {
            console.log(response);
        }
    }

    // #endregion

    // #region Fatch Server Status

    // gets all status per page from api call
    async getPageStatus(pageNumber) {
        var ips = [];
        var options = {
            auth: {
                'bearer': this.accessToken
            },
            method: 'get',
            json: true,
        };

        try {
            var jsonData = await this.request(`https://api.linode.com/v4/linode/instances?page=${pageNumber}`, options)
                .catch(function (reason) {
                    console.log("\nResponse: " + reason.message);
                });

            for (var i = 0; i < jsonData.data.length; i++) {
                var machine = jsonData.data[i];
                if (machine.status != 'running') {
                    return false;
                }
            }
            return true;
        } catch (response) {
            console.log(response);
        }
    }

    // gathers all server status
    async checkServerStatus() {
        var options = {
            auth: {
                'bearer': this.accessToken
            },
            method: 'get',
            json: true,
        };

        try {
            var jsonData = await this.request('https://api.linode.com/v4/linode/instances/', options)
                .catch(function (reason) {
                    console.log("\nResponse: " + reason.message);
                });

            var pages = jsonData.pages;

            for (var i = 1; i < pages + 1; ++i) {
                if (await this.getPageStatus(i) == false) {
                    return false;
                }
            }

            console.log("Servers are ready!");
            return true;
        } catch (response) {
            console.log(response);
            console.log("Error failed to create instance");
        }
    }
    // #endregion 

    async generateProxies(proxyNumber, user, pass, region) {
        this.user = user;
        this.pass = pass;
        this.region = region;

        console.log("Creating servers...")
        await this.createBatchInstancesLimit(proxyNumber);
        console.log("Server creation complete!");

        while (await this.checkServerStatus() == false) {
            console.log("Servers not up yet...waiting");
            await this.sleep(10000);
        }

        console.log("Running scripts on servers, please wait...")
        await this.executeBatchCommand();

        var iplist = await this.getServerIps();
        console.log(`Scripts complete, ${iplist.length} proxies generated!`);

        var generatedProxyList = [];
        for (var i = 0; i < iplist.length; i++) {
            var proxy = `${iplist[i]}:${this.port}:${this.user}:${this.pass}`;
            generatedProxyList.push(proxy);
            console.log(proxy);
        }
        return proxy;
    }
}



var x = new ProxyGenerator('3c5686daacefc2ddde5545c155f1de8cadba1077218685ff2f622ebc98285c70');
//x.generateProxies(35, 'profileaio', 'password123', 'us-east');
x.deleteAllInstances();









