---
date: '2016-11-17T18:47:57+09:00'
layout: post
published: true
qiita_article_id: 431f406133f98d04aa85
tags:
- Java
- spring-boot
title: '[Java][Spring Boot] JPAエンティティをDTOへ変換する方法、というかそもそも変換するべき？'
updated: '2016-11-17T18:47:57+09:00'

---
[`spring-boot-starter-data-rest` を使用すれば](https://spring.io/guides/gs/accessing-data-rest/)、Repositoryインターフェースに`@RepositoryRestResource`アノテーションをつけるだけで、JPAエンティティをJSONとして公開できます。  
  
「えー、でも、直接公開しちゃうの？」  
「そういうのってData Transfer Object（DTO)へいったん変換するんじゃないの？」  
  
と考えて、ウジウジしていたのですが、そもそもなんでDTOへ変換するのか検索してみました。  
  
# 「Data Transfer Object(DTO)」とはなんぞや？  
  
[Wikipedia](https://en.wikipedia.org/wiki/Data_transfer_object)によりますと  
  
> Data Transfer Object(DTO)とは、プロセス間でデータを運ぶオブジェクトである。  
  
だそうです。データに対して何か操作する機能は持たず、データを格納することだけに特化したオブジェクトです。  
  
プロセス間通信（Webサービス等）はコストが高いので、DTOにデータをパッケージングすることで、通信回数を減らしたり通信量を減らしたりといった効果があります。  
  
  
# DTOを使うメリット  
  
DTOがなんなのかわかったところで、使うメリットをまとめてみます。  
  
| No. | メリット | 解説 |  
|--:|:--|:--|:-:|  
| 1 | 通信回数削減  | 1回の通信で、必要なものをすべてやりとりするため  |   
| 2 | 通信量削減  | 公開不要なものは通信しないため  |   
  
## No.１ - 通信回数削減  
  
データベーステーブルからデータをとりまとめて返すような処理の場合、このメリットが効いてきますね。  
  
JPAエンティティと一対一になるようなWebインターフェースだと効果ないですね。  
  
## No.2 ｰ 通信量削減  
  
データベーステーブルには、たいてい公開不要な項目がありますので、このメリットが効いてきますね。  
  
JPAエンティティにアノテーションつければ非公開にできるので、このメリットは実感ないですね。  
  
# DTOを使うデメリット  
  
逆にデメリットをまとめてみます。  
  
| No. | デメリット | 解説 |  
|--:|:--|:--|  
| 1 | コード量が増える  | 単純にDTOと変換用のコードが増えます。当然テストも増えます。 |  
| 2 | CPUコストが増える | DTOとの相互変換のためにCPUを食います。 |  
| 3 | メモリコストが増える  | 元データとDTO両方を持つので、メモリを倍近く食います。  |  
  
そ、それでも通信のほうがコスト高いから（震え声  
  
なんとなくDTO不要な気もしてきましたが、ここで真打ち登場です。  
  
# DTOを使う真のメリット  
  
## 「責任範囲」の分担  
  
「責任範囲」というのはアプリケーションを階層化したとき、その階層が責任を持って提供すべきインターフェースのことです。  
  
例えば、よくある三層構造はこのようなものです。  
  
| 階層 | 名前 | 責任範囲 |  
|:-:|:--|:--|  
| 4 | ユーザ/他アプリ | 責任あったりなかったり。 :smiley:  |  
| 3 | プレゼンテーション  | ユーザ/他アプリに対して操作/APIを提供する。  |  
| 2 | ビジネスロジック  | プレゼンテーションに対してAPIを提供する。  |  
| 1  | データアクセス  | ビジネスロジックに対してAPIを提供する。 |  
  
RESTの場合はこのようになります。  
  
| 階層 | 内容 |  
|:-:|:--|  
| 4 | ユーザ/他アプリ |   
| 3 | RESTサービス  |  
| 2 | ビジネスロジック  |  
| 1 | JPA  |  
  
JPAエンティティを直接RESTサービスへ公開していると、JPAの変更がユーザ/他アプリまで波及してしまうのです。  
  
DTOを使っていれば、そのようなことはありません。  
  
# まとめ ｰ DTOを使うべき？  
  
- DTOを使うべきとき<br>  
共同作業をしている、あるいは公開APIのため、階層間のインターフェースを簡単には変更できない。  
- それ以外のとき<br>お好みで。  
  
  
# ところで、変換する方法は……？  
  
SeasarのS2DXOみたいなのはないみたいです。  
  
普通にしこしこ書くしか？  
  