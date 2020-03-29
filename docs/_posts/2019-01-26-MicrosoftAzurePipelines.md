---
'created_at: ': '2019-01-26T20:08:49+09:00'
layout: post
published: 'true'
tags: !!python/object/apply:builtins.map
- !!python/name:__main__.%3Clambda%3E ''
- !!python/object/apply:builtins.iter
  args:
  - - name: Azure
      versions: []
    - name: CI
      versions: []
    - name: AzureDevOps
      versions: []
    - name: AzurePipelines
      versions: []
  state: 0
title: "[Microsoft] Azure Pipelines \u5229\u7528\u3055\u308C\u308B\u30C7\u30A3\u30EC\
  \u30AF\u30C8\u30EA\u3068\u53C2\u7167\u3059\u308B\u5909\u6570"
'updated_at: ': '2019-02-25T12:57:49+09:00'

---
Azure Pipelinesの中で、ファイルが展開される先のディレクトリと、それを参照する変数をまとめてみました。  
  
| 名前 | 変数 | 実ディレクトリの例 | 使用しているタスク |  
|:--|:--|:--|:--|  
| ソース置き場  | Build.SourcesDirectory 等  | `/home/vsts/work/1/s`  | Azure App Service Deploy 等 |  
| バイナリ置き場  | Build.BinariesDirectory 等 | `/home/vsts/work/1/b`  | Archive File 等 |  
| 生成物置き場  |  Build.ArtifactStagingDirectory 等 | `/home/vsts/work/1/a`  | Net Core CLI 等 |  
  
リファレンスはこちら → https://docs.microsoft.com/ja-jp/azure/devops/pipelines/build/variables?view=azdevops  
  
以下、詳細です。  
  
  
# ソース置き場  
  
ソースファイル全体がここに展開されます。  
  
ソース中のファイル名を指定する例はこのようになります。  
  
```
${Build.SourcesDirectory}/project-a/package.json
```  
  
## 変数  
  
- Build.SourcesDirectory  
  
下記も同じ内容を指しています(異なる場合もある?)  
  
- Build.Repository.LocalPath  
- System.DefaultWorkingDirectory  
  
  
## 使用しているタスクの例  
  
- [Azure App Service Deploy](https://docs.microsoft.com/ja-jp/azure/devops/pipelines/tasks/deploy/azure-rm-web-app-deployment?view=azdevops)  
  
  
  
# バイナリ置き場  
  
コンパイル結果が格納されます。  
  
## 変数  
  
- Build.BinariesDirectory  
  
  
  
## 使用しているタスクの例  
  
- [Archive File](https://docs.microsoft.com/ja-jp/azure/devops/pipelines/tasks/utility/archive-files?view=azdevops)  
  
  
  
# 生成物置き場  
  
パイプラインエージェントが生成したファイルが置かれます。  
  
## 変数  
  
- Build.ArtifactStagingDirectory  
- Build.StagingDirectory  
  
これらは同一の内容を指します。  
  
## 使用しているタスクの例  
  
- [Net Core CLI](https://docs.microsoft.com/ja-jp/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azdevops)  
- [Archive File](https://docs.microsoft.com/ja-jp/azure/devops/pipelines/tasks/utility/archive-files?view=azdevops)  
- [Publish Build Artifacts](https://docs.microsoft.com/ja-jp/azure/devops/pipelines/tasks/utility/publish-build-artifacts?view=azdevops)  
  
