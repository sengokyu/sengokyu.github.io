---
'created_at: ': '2018-04-23T10:00:36+09:00'
layout: post
published: 'true'
tags: !!python/object/apply:builtins.map
- !!python/name:__main__.%3Clambda%3E ''
- !!python/object/apply:builtins.iter
  args:
  - - name: CentOS
      versions: []
    - name: oVirt
      versions: []
  state: 0
title: "[oVirt] CentOS 7\u3067\u52D5\u304FoVirt\u30924.1.6\u304B\u30894.2\u3078\u30A2\
  \u30C3\u30D7\u30B0\u30EC\u30FC\u30C9"
'updated_at: ': '2018-04-23T10:00:36+09:00'

---
CentOS 7で動いているoVirt 4.1.6を4.2へアップグレードしました。  
  
https://www.ovirt.org/release/4.2.0/#centos--rhel にある手順に従えばいいはずですが、パッケージの依存性でつまずきました。  
  
# つまずいたこと  
  
```shell-session
# yum install http://resources.ovirt.org/pub/yum-repo/ovirt-release42.rpm
# yum update "ovirt-*-setup*"
  .
  .
  .
--> Running transaction check                
---> Package python-linecache2.noarch 0:1.0.0-1.el7 will be installed                     
--> Processing Conflict: ovirt-engine-setup-plugin-ovirt-engine-4.2.0.2-1.el7.centos.noarch conflicts ovirt-engine < 4.1.7                                                          
--> Finished Dependency Resolution           
Error: ovirt-engine-setup-plugin-ovirt-engine conflicts with ovirt-engine-4.1.6.2-1.el7.centos.noarch                                                                               
 You could try using --skip-broken to work around the problem                             
 You could try running: rpm -Va --nofiles --nodigest  
```  
  
ovirt-engine-setup-plugin-ovirt-engine conflicts with ovirt-engine-4.1.6.2-1.el7.centos.noarch と言われてしまいました。  
  
## 解決策  
  
先にoVirt 4.1.6を4.1.8へアップグレードする必要がありました。  
  
```shell-session
# rm /etc/yum.repos.d/ovirt-4.2*
# yum update "ovirt-*-setup*"
# engine-setup
```  
  
oVirt 4.2のレポジトリを消してから、4.1.8へアップグレードしました。  
  
  
# リトライ  
  
```shell-session
# yum install http://resources.ovirt.org/pub/yum-repo/ovirt-release42.rpm
# yum update "ovirt-*-setup*"
# engine-setup
```  
  
これでできました。  
  
