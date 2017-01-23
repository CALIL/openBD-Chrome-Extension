# openBD-Chrome-Extension
openBD Chrome Extension

## これはなに？

[https://openbd.jp/](https://openbd.jp/)

書誌情報・書影を、だれでも自由に使える、高速なAPIとして提供するopenBDプロジェクトの書誌情報を、対応サイトの本のページに表示するChrome用の機能拡張です。

## 対応サービス

* [カーリル](https://calil.jp)
* 富士通 iLiswing (例: [https://ilisod001.apsel.jp/kurino-lib/wopc/pc/pages/SearchResultList.jsp](https://ilisod001.apsel.jp/kurino-lib/wopc/pc/pages/SearchResultList.jsp))
* NEC LiCS-WebII (例: [http://www.koge-lib.jp/WebOpac/webopac/searchdetail.do](http://www.koge-lib.jp/WebOpac/webopac/searchdetail.do))
* [Amazon](https://www.amazon.co.jp)

## 導入方法

このリポジトリをクローンするか、zipをダウンロードして解凍します。
Chromeの設定→機能拡張に行き、「デベロッパーモード」にチェックを入れます。すると、「パッケージ化されていない機能拡張を読み込む」というボタンが出てくるので、それを押します。

![スクリーンショット](screenshot.png "スクリーンショット")

さきほど作った、manifest.jsonがあるディレクトリを選択して開きます。すると、Extensionsに拡張がロードされて使える状態になります。

![スクリーンショット2](screenshot2.png "スクリーンショット2")

対応サービスの本のページを開くと、openBD APIから取得した書誌情報が追加・表示されています。

