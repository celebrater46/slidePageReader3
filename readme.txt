Slide Page Reader についてあれこれ

##############################################
利用規約とか
##############################################

当プログラムは富士見永人が個人のHP公開向けに開発したものであり、極めてシンプルなプログラムです。

MITライセンスでの配布となります。
著作権表示とライセンス表示をしていただければ改変、再配布してくださって構いません。
当プログラムを使用して発生した如何なる問題にも作者は責任を負いません。
詳しくはMITライセンスでググってください。
　
本プログラムの利用を開始した時点で規約に同意したとみなされます。
　
バグなどの不具合報告があれば可能な範囲で対応する予定ですが、多忙につき保障はできません。

サンプル小説、画像の著作権は放棄してません。
保存、鑑賞は自由ですが、無断転載とかはしないでください。


##############################################
使い方
##############################################

books フォルダ内の bookList.txt を、サンプルを参考に
「タイトル|ファイル名.txt|バージョン番号」と、間に半角の縦棒を入れて書いていってください。
ファイル名は texts フォルダ内の本文ファイルの名前を拡張子までそのまま入れてください。
フォルダ分けしてる場合は「hoge/fuga.txt」といった具合に書いてください。

サーバーへの負荷を減らすため、
一度読み込まれた文章データは localStorage に保管されます。
バージョン番号が更新された時のみ、再読込みを行う設計になっています。

texts フォルダ内に本文の txt ファイルを入れます。
サンプルを参考に、タイトルを <Title></Title> というタグで、
章題を <Chapter></Chapter>
サブタイトルを <Sub></Sub> というタグで囲って記入します。

また、<Break /> というタグを入れると、そこがひとつの記事の区切りとなります。

index.html にアクセスすると
bookList.txt の一番上のタイトルを自動的に読み込んで最初のページを表示しますが、
index.html?book=1 などというように
末尾にURL パラメータを追加することで
任意のタイトルを読み込ませることができます。

URL パラメータの数字は 0 から始まる整数になります。

たとえば、book=1 とすると、bookList.txt の上から「2番め」のタイトルを読み込みます。
index.html?book=1&article=2 と入力すると、
bookList.txt の上から 2 番めの、3番めの記事を読み込みます。

画面の上の方をクリックもしくはタップすると、
各記事（エピソード等）に移動するセレクトボックスが出てきます。

画面の下の方をクリックもしくはタップすると、
任意のページまで素早く移動できるスライダーが表示されます。



############################################################################################
############################################################################################
About Slide Page Reader

##############################################
Terms of service
##############################################

This "SPR (Slide Page Reader)" is the App that I "Enin Fujimi" developed for exhibition my novels.

SPR is MIT license.
If specify a copyright, you can edit SPR and give it out on the Web.
I never take responsibility even if SPR leads any troubles.

I regard you accept this agreement as you start to use SPR.

If you find any bug, tell me it. I will fix the bugs, but I don't know when it resolves.

SPR is very simple and being developed quickly.


Copyright (C) Enin Fujimi All Rights Reserved.