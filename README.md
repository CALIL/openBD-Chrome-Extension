# openBD Chrome Extension

## これはなに？


[openBDプロジェクト](https://openbd.jp/)の書誌情報を、対応サイトの本のページに表示するChrome用の機能拡張です。

## 対応サービス

* [カーリル](https://calil.jp)
* 富士通 iLiswing (例: [https://ilisod001.apsel.jp/kurino-lib/wopc/pc/pages/SearchResultList.jsp](https://ilisod001.apsel.jp/kurino-lib/wopc/pc/pages/SearchResultList.jsp))
* NEC LiCS-WebII (例: [http://www.koge-lib.jp/WebOpac/webopac/searchdetail.do](http://www.koge-lib.jp/WebOpac/webopac/searchdetail.do))
* [Amazon](https://www.amazon.co.jp)

## 導入方法

右上の緑色のボタン「clone or Download」から、このリポジトリをクローンするか、zipをダウンロードして解凍します。  
Chromeの設定→拡張機能に行き、右上の「デベロッパーモード」にチェックを入れます。すると、「パッケージ化されていない機能拡張を読み込む」というボタンが出てくるので、それを押します。

![スクリーンショット](screenshot.png "スクリーンショット")

さきほど作ったディレクトリを選択して開きます。すると、Extensionsに拡張がロードされて使える状態になります。

![スクリーンショット2](screenshot2.png "スクリーンショット2")

対応サービスの本のページを開くと、openBD APIから取得した書誌情報が追加・表示されます。

