/* This class used to create linode proxies */

module.exports = class ProxyGenerator {

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

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async createInstance(instanceUser, instancePassword, instanceRegion) {

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
            var id = response.id;
            var status = response.status;

            // wait until server is up and running
            console.log(`${ip}...not ready`);
            while (!await this.isServerUp(id)) {
                await this.sleep(5000);
            }

            console.log(`${ip}...ready, running script`)
            await this.executeCommand(ip, instancePassword, this.bashCommand)

            var proxy = `${ip}:${this.port}:${instanceUser}:${instancePassword}`;
            this.insertProxyDB(proxy, id);
            console.log(`${ip}...script complete, proxy logged into database`)
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
                promises.push(limit(() => this.createInstance(this.user ,this.pass, this.region)));
            }
            Promise.all(promises);
            return JSON.stringify({ 'created': number }, null, 3);
        } catch (err) {
            throw err;
        }
    }

    async isServerUp(serverId) {
        var response = await this.api.httpRequest(`https://api.linode.com/v4/linode/instances/${serverId}`, 'get');
        var status = response.status;
        return (status == 'running' ? true : false);
    }

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

    executeCommand(ip, pass, bashCommand) {
        try {
            var exec = require('ssh-exec');
            return new Promise(function (resolve) {
                //var v_host = ip;
                exec(bashCommand, {
                    user: 'root',
                    host: ip,
                    password: pass
                }, function (res) {
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

    async generateProxies(userId, proxyNumber, user, pass, region) {
        try {
            this.userId = userId;
            this.user = user;
            this.pass = pass;
            this.region = region;
            this.number = proxyNumber;

            return await this.createBatchInstancesLimit(this.number);
        } catch (err) {
            throw err;
        }
    }
};

