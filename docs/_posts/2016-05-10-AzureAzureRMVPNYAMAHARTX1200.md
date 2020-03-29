---
'created_at: ': '2016-05-10T10:32:22+09:00'
layout: post
published: 'true'
tags: !!python/object/apply:builtins.map
- !!python/name:__main__.%3Clambda%3E ''
- !!python/object/apply:builtins.iter
  args:
  - - name: Microsoft
      versions: []
    - name: Azure
      versions: []
    - name: VPN
      versions: []
    - name: yamaha
      versions: []
    - name: ipsec
      versions: []
  state: 0
title: "\u65B0\u3057\u3044Azure\u30DD\u30FC\u30BF\u30EB\uFF08Azure RM\uFF09\u3067\u4F5C\
  \u6210\u3057\u305F\u30EB\u30FC\u30C8\u30D9\u30FC\u30B9VPN\u3078YAMAHA RTX1200\u3067\
  \u63A5\u7D9A\u3059\u308B"
'updated_at: ': '2016-05-11T09:41:25+09:00'

---
Microsoft Azureの新しいポータルで作成した仮想ネットワークへVPN接続します。  
  
（古いAzureポータルを使う場合は、[YAMAHAのサイト](http://jp.yamaha.com/products/network/solution/dns_cloud/microsoft_azure/)に設定例があります）  
  
AzureのVPN接続には2種類あります。  
  
- ポリシーベース 一端末のみをVPN接続します。  
- ルートベース ネットワーク単位でVPN接続します。  
  
ここでは、YAMAHAのRTX1200を使用して、ネットワークごとVPN接続します。  
  
  
早速ですが、設定内容はこんな感じです。  
  
**rtx1200-config.txt**  
```text:rtx1200-config.txt
tunnel select 30
 ipsec tunnel 301
  ipsec sa policy 301 30 esp                <<<=== 暗号ペイロードのアルゴリズムをaes-cbc(初期値)にする
  ipsec ike version 30 2                    <<<=== IKEv2を使う
  ipsec ike keepalive log 30 off            <<<=== keepaliveログ出力しない
  ipsec ike keepalive use 30 on dpd         <<<=== keepaliveを使用する。DPD RFC3706方式
  ipsec ike local name 30 ルータのLAN側のIPアドレス ipv4-addr
  ipsec ike nat-traversal 30 on
  ipsec ike payload type 30 2 2             <<<=== IKEペイロードタイプをYAMAHA互換ではなく他の実装に合わせる
  ipsec ike pre-shared-key 30 ************* <<<=== 事前共有鍵の設定
  ipsec ike remote name 30 AzureゲートウェイのグローバルIPアドレス ipv4-addr
  ipsec auto refresh 30 on                  <<<=== 鍵交換を始動する
 ip tunnel tcp mss limit 1350
 tunnel enable 30
```  
  
自信が無いので薄目で見てやってください。 :stuck_out_tongue_closed_eyes:   
  
:bulb: YAMAHAのルータは[Microsoftの検証済みルータ](https://azure.microsoft.com/en-us/documentation/articles/vpn-gateway-about-vpn-devices/)には**含まれておらず**、いつなんどきAzure側の仕様変更にさらされるかわからないので、試用にとどめるか割り切って使うのがよいと思われます。  
