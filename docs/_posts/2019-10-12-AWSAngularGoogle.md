---
'created_at: ': '2019-10-12T17:42:47+09:00'
layout: post
published: 'true'
tags: !!python/object/apply:builtins.map
- !!python/name:__main__.%3Clambda%3E ''
- !!python/object/apply:builtins.iter
  args:
  - - name: AWS
      versions: []
    - name: Angular
      versions: []
    - name: lambda
      versions: []
    - name: "\u500B\u4EBA\u958B\u767A"
      versions: []
  state: 0
title: "[AWS][Angular] \u77E5\u3089\u306A\u3044\u3053\u3068\u3092\u77E5\u308A\u305F\
  \u3044\u2192Google\u306E\u691C\u7D22\u88DC\u5B8C\u3092\u4E00\u89A7\u306B\u3057\u305F\
  \u3089\u3044\u3044\uFF1F"
'updated_at: ': '2019-11-22T21:22:08+09:00'

---
# 動機と思いつき  
  
* 知らない街で美味しいご飯に巡り会いたい  
* レビューサイトを使いこなすのは難しい  
* 他のひとが何を探しているかわかったらいいかも  
* 検索語 + 「あ」〜「ん」をGoogleに渡して、なにが補完されるか一覧してみよう  
  
# さて、Google補完API  
  
どうも公式なAPIではないようです。  
  
[Google API プログラミング解説](https://so-zou.jp/web-app/tech/web-api/google/suggest/)  
  
を参考にしました。JSONじゃなくてXMLが返ってくるんですね。  
  
# 構成  
  
Google APIはJavaScriptでたたけばいいし、Angularで作ったフロントエンドだけで完結しようと思いましたができません。  
（どうしてできなかったのかは忘れました）。  
間にプロキシを挟むことにしました。  
  
![image.png](/assets/images/e4ba6815-86d3-086b-40e3-01a5d40bd631.png)  
  
# 稼働環境  
  
AWSの鉄板構成です。  
  
フロントエンドはS3に格納します。S3単体ではhttpsできないため、CloudFrnotを使います。  
Google API呼び出しはLambdaで作りました。  
  
  
![image.png](/assets/images/4403c3bd-e8e1-fe90-6189-71e5021180e1.png)  
  
# できあがったもの  
  
https://hokanchan.uart.dev/  
  
![g9q54-soen8.gif](/assets/images/e9f5a83a-2b9a-ddf2-fdb0-b24c480c95e0.gif)  
  
ソースコード https://github.com/sengokyu/hokanchan  
  
# 考察  
  
* 漫然と検索語を入力すると、期待する結果を得られない。  
* 狭い範囲の検索語に絞り込むと良い結果が得られる。  
    * 例）「銀座 ランチ」 → 「銀座 ランチ 天ぷら」  
* 期待する結果が得られる地域と、得られない地域がある。  
    * 暮らす人々がどのくらいネットを使っているかによる？  
  
  
# ふりかえり  
  
## Keep  
  
* RxJSでエラーが起きたかどうか関係なく最後に処理を挟むのであれば、`pipe(finalize(()=> { /* ... */ })` を使えばいい。  
  
## Problem  
  
* 欲張ってCloudFormationですべてデプロイしようとして時間がかかりました。  
  
## Try  
  
* CloudFormationを親子関係にして、環境全体とLambdaに分ける。  
  
## その他  
  
* .dev ドメインはブラウザ(Chrome/Firefox)がhttpsアクセスを強制します。httpへアクセスできなくて悩みました。  
  
  
# リンク  
  
- 図の作成 https://draw.io/  
- 動画のGIF化 https://www.aconvert.com/jp/video/mov-to-gif/  
