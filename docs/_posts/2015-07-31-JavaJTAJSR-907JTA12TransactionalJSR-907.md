---
'created_at: ': '2015-07-31T17:13:01+09:00'
layout: post
published: 'true'
tags: !!python/object/apply:builtins.map
- !!python/name:__main__.%3Clambda%3E ''
- !!python/object/apply:builtins.iter
  args:
  - - name: Java
      versions: []
    - name: JavaEE
      versions: []
    - name: JTA
      versions: []
  state: 0
title: "[Java][JTA][JSR-907] JTA 1.2 Transactional\u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\
  \u30F3\u306B\u3064\u3044\u3066\uFF08JSR-907\u62FE\u3044\u8AAD\u307F\uFF09"
'updated_at: ': '2017-01-13T11:46:19+09:00'

---
CDI管理ビーンに付けるだけでトランザクション処理してくれる``@Transactional``アノテーションについてです。  
  
JSR-907のドキュメントから拾い読みしてみました。  
  
# ``@Transactional``って何よ？  
  
CDIのインターセプターです。CDIのインターセプターはAOP的なことをしてくれるやつです。  
  
メソッドにつけると、そのメソッドの呼び出しに介入し、呼び出し前後にチョメチョメしたりなんだりできます。  
  
# ``@Transactional``のオプション  
  
``@Transactional``アノテーションで指定できるオプションについてです。  
  
オプションは2つあります。  
  
- トランザクション内外で呼ばれた時の振る舞いを指定  
- 例外発生時の振る舞いを指定  
  
  
## トランザクション内外で呼ばれたときの振る舞い  
  
トランザクション内外で、CDI管理ビーンのメソッドが呼ばれたときの振る舞いを設定できます。  
  
| ``TxType`` | トランザクション外から | 既存トランザクション内から|備考|  
|:-----------|:------------|:------------|:---|  
|``TxType.REQUIRED``|新しいトランザクションを開始|既存トランザクション内で実行|既定値|  
|``TxType.REQUIRED_NEW``|新しいトランザクションを開始|既存トランザクションを一旦停止して新しいトランザクション内で実行||  
|``TxType.MANDATORY``|``TransactionRequiredException``をネストした``TransactionalException``をスロー|既存トランザクション内で実行||  
|``TxType.SUPPORTS``|そのままトランザクション外で実行|既存トランザクション内で実行||  
|``TxType.NOT_SUPPORTED``|そのままトランザクション外で実行|既存トランザクションを一旦停止して、トランザクション外で実行||  
|``TxType.NEVER``|そのままトランザクション外で実行|``InvalidTRansactionException``をネストした``TransactionalException``をスロー||  
  
  
## 例外発生時の振る舞い  
  
既定では、チェック例外発生時にはロールバックしません。``RuntimeException``を継承した例外ではロールバックします。  
  
### ``rollbackOn``  
  
ロールバックしたい例外を指定します。  
  
以下の例は、あらゆるアプリケーション例外発生時にトランザクションをロールバックするようにマークします。  
  
****  
```java:
@Transactional(rollbackOn={Exception.class})
```  
  
### ``dontRollbackOn``  
  
ロールバックさせたくない例外を指定します。``rollbackOn``と``dontRollbackOn``両方を指定したときは、``dontRollbackOn``が優先します。  
  
以下の例は、``IllegalStateException``やこれを継承した例外発生時に、トランザクションをロールバックするマークを付けないようにします。  
  
****  
```java:
@Transactional(dontRollbackOn={IllegalStateException.class})
```  
