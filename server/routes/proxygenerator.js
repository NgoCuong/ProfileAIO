/* This class used to create linode proxies */

module.exports = class ProxyGenerator {

    constructor(accessToken) {
        this.accessToken = accessToken;
        this.port = '3128';

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

            // wait until server is up and running
            console.log(`${ip}...not ready`);
            while (!await this.isServerUp(id)) {
                await this.sleep(10000);
            }

            console.log(`${ip}...ready, running script`)
            
            var bashCommand =
                "yum -y update && " +
                "yum -y install squid httpd-tools wget && " +
                "systemctl start squid && " +
                "systemctl enable squid && " +
                "touch /etc/squid/passwd && " +
                `htpasswd -b /etc/squid/passwd ${instanceUser} ${instancePassword} && ` +
                "wget -O /etc/squid/squid.conf https://raw.githubusercontent.com/dzt/easy-proxy/master/confg/userpass/squid.conf && " +
                "systemctl restart squid.service && " +
                "systemctl enable squid.service && " +
                `iptables -I INPUT -p tcp --dport ${this.port} -j ACCEPT && ` +
                "iptables-save";

            await this.sleep(10000);
            await this.executeCommand(ip, instancePassword, bashCommand);
            //await this.execRemote(ip, 'root', instancePassword, '3128')
            console.log("script complete");

            var proxy = `${ip}:${this.port}:${instanceUser}:${instancePassword}`;
            await this.insertProxyDB(proxy, id);
            console.log(`${ip}...script complete, proxy logged into database`)
        } catch (err) {
            throw err;
        }
    }





    async isServerUp(serverId) {
        var response = await this.api.httpRequest(`https://api.linode.com/v4/linode/instances/${serverId}`, 'get');
        var status = response.status;
        return (status == 'running' ? true : false);
    }


    async deleteInstance(accessToken, nodeId) {
        this.accessToken = accessToken;
        var response = await this.api.httpRequest('https://api.linode.com/v4/linode/instances/' + nodeId, 'delete')
            .catch(function (err) {
                console.log("\nResponse: " + err.message);
                throw err;
            });
        console.log(`Server ${nodeId}...deleted`);
        return response;
    }


    async deleteAllInstances(accessToken) {
        try {
            this.accessToken = accessToken;
            var response = await this.api.httpRequest('https://api.linode.com/v4/linode/instances', 'get')

            var serverCount = response.data.length;
            if (serverCount == 0) {
                console.log("No servers to delete");
            } else {
                for (var i = 0; i < serverCount; i++) {
                    var machine = response.data[i];
                    //console.log("Deleting server %s", machine.ipv4[0]);
                    await this.deleteInstance(accessToken, machine.id);
                }
                console.log(`Deleted ${serverCount} servers`);
            }
        } catch (err) {
            throw err;
        }
    }


    async executeCommand(ip, pass, bashCommand) {
        try {
            return new Promise(function (resolve) {
                var exec = require('ssh-exec');
                //var v_host = ip;
                exec(bashCommand, {
                    user: 'root',
                    host: ip,
                    password: pass
                }, function () {
                    resolve();
                })
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
                instanceId: instanceId,
                server: "linode"
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
            await this.validateToken();


            // number of concurent requests limit
            var concurentLimit = 10;
            const limit = this.pLimit(concurentLimit);
            var promises = [];

            for (var i = 0; i < this.number; ++i) {
                promises.push(limit(() => this.createInstance(this.user, this.pass, this.region)));
            }
            await Promise.all(promises);
            //return JSON.stringify({ 'created': number }, null, 3);
        } catch (err) {
            throw err;
        }
    }

    // async generateProxies(userId, proxyNumber, user, pass, region) {
    //     try {
    //         this.userId = userId;
    //         this.user = user;
    //         this.pass = pass;
    //         this.region = region;
    //         this.number = proxyNumber;
    //         await this.validateToken();
    //         var res = await this.createBatchInstancesLimit(this.number)

    //         return res
    //     } catch (err) {
    //         throw err;
    //     }
    // }


    async validateToken() {
        try {
            await this.api.httpRequest('https://api.linode.com/v4/linode/instances/', 'get');
        } catch (err) {
            throw err;
        }
    }
};

