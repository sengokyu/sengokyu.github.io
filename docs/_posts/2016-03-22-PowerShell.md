---
'created_at: ': '2016-03-22T18:34:41+09:00'
layout: post
published: 'true'
tags: !!python/object/apply:builtins.map
- !!python/name:__main__.%3Clambda%3E ''
- !!python/object/apply:builtins.iter
  args:
  - - name: PowerShell
      versions: []
    - name: Pester
      versions: []
  state: 0
title: "PowerShell\u30D7\u30ED\u30B0\u30E9\u30E0\u306E\u304A\u3059\u3059\u3081\u30C7\
  \u30A3\u30EC\u30AF\u30C8\u30EA\u69CB\u6210\u3068\u30E6\u30CB\u30C3\u30C8\u30C6\u30B9\
  \u30C8\u30E1\u30E2"
'updated_at: ': '2016-03-22T18:45:09+09:00'

---
# ユニットテストリンク集  
  
* Pesterの紹介と使い方 http://www.powershellmagazine.com/2014/03/12/get-started-with-pester-powershell-unit-testing-framework/  
* Pester公式Wiki https://github.com/pester/Pester/wiki  
  
# おすすめディレクトリ構成  
  
この構成はPesterの実装からいただきました。  
  
  
```
+---Invoke-MyCommmand.ps1
+---Invoke-MyCommands.Tests.ps1
\---Functions
    +---function1.ps1
    +---function1.Tests.ps1
    +---function2.ps1
    +---function2.Tests.ps1
    \---（続く……）
```  
  
`Invoke-MyCommand.ps1`が本体プログラムです。  
  
`Functions`の下に関数を置き、本体プログラムから読み込みます。  
  
ユニットテストは`.Tests.ps1`という拡張子をつけます。  
  
  
# プログラムのひな形  
  
**Template.ps1**  
```ps1:Template.ps1
<#
.SYNOPSIS
プログラムの短い説明

.DESCRIPTION
プログラムの詳しい説明
# >
Set-StrictMode -Version Latest

$moduleRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# 関数を読み込み
"$moduleRoot\Functions\*.ps1" |
Resolve-Path |
Where-Object { -not ($_.ProviderPath.ToLower().Contains(".tests.")) } |
ForEach-Object { . $_.ProviderPath }
```  
  
# ユニットテストのひな形  
  
**Template.Tests.ps1**  
```ps1:Template.Tests.ps1
Set-StrictMode -Version Latest

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$sut = (Split-Path -Leaf $MyInvocation.MyCommand.Path).Replace(".Tests.", ".")
. "$here\$sut"

Describe "function1" {
    It "returns true" {
        # テストコード
    }
}
```  
