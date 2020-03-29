---
'created_at: ': '2019-07-10T11:15:33+09:00'
layout: post
published: 'true'
tags: !!python/object/apply:builtins.map
- !!python/name:__main__.%3Clambda%3E ''
- !!python/object/apply:builtins.iter
  args:
  - - name: coldfusion
      versions: []
  state: 0
title: "Cisco ASA/ColdFusion/sftp \u30C8\u30E9\u30D6\u30EB\u30B7\u30E5\u30FC\u30C8\
  \u30E1\u30E2 7/10\u7248"
'updated_at: ': '2019-07-10T11:15:33+09:00'

---
ただのメモです。  
  
# 環境  
  
```
内部サーバ === Cisco ASA === (Internet) === SFTPサーバ
```  
  
毎晩動かしてるバッチで、内部サーバからSFTPサーバへアクセスし、ファイルをダウンロードしている。  
バッチはColdFusionでできている。  
  
  
# トラブル  
  
ある日、SFTPサーバへの接続でタイムアウトするようになった。  
  
  
# 調べたこと/試したこと  
  
## 手動でsftp :ok:   
  
バッチではなく、手動でsftpを動かして見た。  
問題なし。なぜ。。。？  
  
  
## ASAのService Policy Rule :question:   
  
ASAのService Policy Ruleで、ssh接続に制限をかけていたので外してみた。  
Outsideインターフェースなので意味なさそう。  
  
外したら、ログイン時ではなく、ファイルダウンロード時にタイムアウトするようになった。  
不思議だ。:confused:   
  
## ASAでセッションを確認  
  
ASAにssh接続し、`enable`後`show conn all`すると、セッション情報が出てきます。  
  
flags UIO状態で、200件超溜まっていました。  
カウントは`show conn count`  
  
flgasの意味  
https://networkengineering.stackexchange.com/questions/45099/asa-conn-flags-explain  
  
> The Conn Flags UIO means: Three-way handshake (U) is completed and the inside host (192.168.1.3) initiated the traffic (we know that because there is no Flag B at all). inside host (192.168.1.3) has received data from and sent data to outside host (10.23.232.217) on TCP port 443 (IO)  
  
## 内部サーバで`netstat -an`  
  
sftp接続がたくさん出てきた。 :exclamation:   
  
# 推測  
  
バッチがsftpを切断しないので、どこかの制限に引っかかっている？  
  
  
  
