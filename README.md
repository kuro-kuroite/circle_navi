# circle_navi

外部要因(その情報によって今後の予定が変化する可能性のある)情報を取得し，文章を作り上げたり，Google Homeが発話したりするスクリプトファイルをまとめたサブプロジェクト．
具体的には，以下のスクリプトファイルを持つ．

- Web APIから以下の情報をjsonに保存するスクリプトファイル群のfetch_xxx_json.js．
  - 天気(OpenWeatherMap API)のfetch_weather_json.js
  - カレンダー(Google Calendar API)のfetch_calendar_json.js

- 以下の2つの機能を実行するスクリプトファイルのapp.js
  - それらのjson情報を使用した文章を生成する機能(generate_speak_string.js)．
  - その文章をGoogle Homeが発話する機能

- Google Homeがコマンドライン引数の文字列を発話するスクリプトファイルのnotifier.js

## インストール方法

```bash
$ git clone https://github.com/kuro-kuroite/circle_navi.git
```

## 公開APIの詳細

基本的には，`src/js` 内にある`app.js`, `fetch_xxx_json.js`, `notifier.js`にスクリプトファイルとして公開している．

このプロジェクトには，補助ライブラリが存在する．その形式は，[npm_template](https://github.com/kuro-kuroite/npm_template)や[ライブラリ開発方法](https://github.com/kuro-kuroite/prelude#%E6%9C%AC%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%AE%E9%96%8B%E7%99%BA%E8%80%85%E5%90%91%E3%81%91)と同等である

### Google Home発話(notifier.js)

- Google Home の設定を行う．(詳細は，[Google Homeの設定方法](https://github.com/kuro-kuroite/graduate_documents)を参照)

- Google HomeのIPアドレスを指定する．

.envの`GOOGLE_HOME_NAME_OR_IP`にデバイス名またはIPアドレスを追加(詳細は，[デバイス名の調べ方](https://github.com/kuro-kuroite/graduate_documents)か[IPアドレスの調べ方](https://github.com/kuro-kuroite/graduate_documents)で記述)

- 同様にGoogle Homeが発話する言語を指定する．

.envの`LANGUAGE`に言語を指定(詳細は，[mini-google-home-notifier.API.language](https://github.com/kuro-kuroite/mini-google-home-notifier#language)にある[言語サポート](https://cloud.google.com/translate/docs/languages)を参照)

例 (.env)

```env
LANGUAGE=ja
GOOGLE_HOME_NAME_OR_IP=192.168.1.172
```

- `node dist/notifier.js --message ハローワールド` で実行．

Google Homeが音とともに「ハローワールド」と発話する．

このスクリプトのコマンドライン引数は， `node dist/notifier.js --help`で確認できる．

### Google HomeがWeb API(今回は天気とカレンダー)の情報から作った文章を発話(app.js)

- 上述のGoogle Home発話が出来ることを確認する．

- events.json.sample と weathers.json.sample の`.sample`を削除する．
(本来は，.env ファイルにAPI Keyを設定したうえで，`node ./dist/fetch_weather_json.js`, `node ./dist/fetch_calendar_json.js`を実行し，上記jsonを上書きする)

```bash
$ pwd
path/to/circle_navi
$ mv events.json.sample events.json
$ mv weathers.json.sample weathers.json
```

- カレンダーの現地時刻とUTC時刻を相互変換できるように地域情報を指定する．
(詳細は，[CalendarEventList](https://github.com/kuro-kuroite/mini-googlecalendar-event#new-calendareventlistevents-googlecalendarevent--region-string--us--calendareventlist)を参照)
(内部実装を知りたい場合は，[DateFnsTz](https://github.com/kuro-kuroite/prelude#new-datefnstzregion-string-datefnstz)と[date-fns-tz](https://github.com/marnusw/date-fns-tz#todate)を参照)

.envの`REGION`に地域情報を指定([DateFnsTz](https://github.com/kuro-kuroite/prelude#new-datefnstzregion-string-datefnstz)の仕様により，`US`または`JP`のみ対応)

例 (.env)

```env
LANGUAGE=ja
REGION=JP
GOOGLE_HOME_NAME_OR_IP=192.168.1.172
```

- `node dist/app.js`で実行

サンプル例の場合

```bash
$ node dist/app.js
深夜 1時0分から，おやすみ
午後 13時0分から，昼休み
夜 23時0分から，お風呂

ただ今の天気は，薄い雲で，気温は0度です．
最高気温は, 0度，最低気温は0度です．
```

### Web API(今回は天気とカレンダー)からの情報をjsonに保存する(fetch_xxx_json.js)

- events.json と weathers.jsonの中身を削除する
(削除しなくても動作はするが，保存されたかの確認を行いやすいから)

```bash
$ pwd
path/to/circle_navi
$ rm events.json
$ rm weathers.json
$ touch events.json
$ touch weathers.json
```

- 天気(OpenWeatherMap)APIの設定

.envの`OPEN_WEATHER_MAP_KEY`に[OpenWeatherMapから取得したAPI Key](https://openweathermap.org/api)を指定
(詳細は，[OpenWeathenMapでAPI Keyを取得する](https://github.com/kuro-kuroite/graduate_documents)を参照)

同様に，`OPEN_WEATHER_MAP_CITY`と`LANGUAGE`も指定する
(詳細は，[By city name](https://openweathermap.org/current#name)と[多言語対応](https://openweathermap.org/current#multi)を参照)

例 (.env)

```env
LANGUAGE=ja
OPEN_WEATHER_MAP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPEN_WEATHER_MAP_CITY=Hachioji,JP
```

- カレンダー(Google Calendar)APIの設定

[mini-promisify-googlecalendar#最低動作例](https://github.com/kuro-kuroite/mini-promisify-googlecalendar#%E6%9C%80%E4%BD%8E%E5%8B%95%E4%BD%9C%E4%BE%8B)
に従って，`client_secret_xxxx.json`と`token.json`を取得する．

例 (client_secret_xxxx.json)

```json
{
  "installed": {
    "client_id": "rndawlirntseaorndahrtasporntaspodninrpanr.apps.googleusercontent.com",
    "project_id":"organic-gecko-210102",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://www.googleapis.com/oauth2/v3/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"rndwouitsnastpadie",
    "redirect_uris": [
      "urn:ietf:wg:oauth:2.0:oob",
      "http://localhost"
    ],
  },
}
```

例 (token.json)

```json
{
 "access_token": "rntasoprndaoprntseoaprntsapofndritreaostrnjvnatpkudwionrtjaspgntrspoarntndinr",
 "token_type": "Bearer",
 "expires_in": 3600,
 "refresh_token": "dnidhrdpapnirdinidhrtoap"
}
```


`clinent_secret.json.sample`と`token.json.sample`の`.sample`を削除する．その後，それぞれのファイルの中身を変更する．

.envの`CLIENT_SECRET_PATH`にGoogle Calendar APIで使用するクライアント情報のjsonのパスを指定する
(相対パスは，プロジェクトルートとする)

同様に，`TOKEN_PATH`も指定する

例 (.env)

```env
CLIENT_SECRET_PATH=client_secret.json
TOKEN_PATH=token.json
```

- ここまで設定すると.envファイルは以下のようになる

例 (.env)

```env
LANGUAGE=ja
OPEN_WEATHER_MAP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPEN_WEATHER_MAP_CITY=Hachioji,JP
CLIENT_SECRET_PATH=client_secret.json
TOKEN_PATH=token.json
```

- `node dist/fetch_weather_json.js && node dist/fetch_calendar_json.js`で実行

上手くいくと，`weathers.json`と`events.json`に以下のような内容が加わる.
(これによって，上述の例の「Google HomeがWeb API(今回は天......」で正しい情報をもとに文章を生成可能となる)

```bash
$ pwd
path/to/circle_navi
$ node dist/fetch_weather_json.js && node dist/fetch_calendar_json.js
$ more weathers.json # q で終了
{
  "cod": "200",
  "message": 0.0069,
  "cnt": 40,
  "list": [
    {
      "dt": 1550502000,
      "main": {
$ more events.json # q で終了
[
  {
    "kind": "calendar#event",
    "etag": "3063785192938000",
    "id": "btveawnrsumn",
    "status": "confirmed",
```

## 本ライブラリの開発者向け

### 開発(補助ライブラリ)

このライブラリは，src/js/index.js(理由: `yarn deploy`)がメインプログラムの記述箇所である．
ライブラリとして公開されている関数，クラスはこのファイルの`export`のみである．
もちろん，ダーティーハックで非公開部分の変更は可能である．

基本的なディレクトリ構成は，[Atomic Design](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B/) を採用した．
すなわち，原子(atom) -> 分子(molecule) -> 有機体(organism) の多重階層となっている．
これは，Promise化といった単純な関数をatomsに，公開する関数やクラスを organisms に，このorganismsが使用する子関数，子クラスをmolecules に分類するためだ．

この階層の中身は，`ライブラリ・種類名/機能名 or index.js` とした．
特別な意味はないが，ファイルよりはディレクトリとして小分類したかったためである．
内部実装が気になる場合は，この部分のjsファイルを参照するとよい．

もし，本ライブラリを変更した場合は，`yarn deploy`をすると，`dist/` ディレクトリに [Babel](https://babeljs.io/) される．
簡単な実行であれば，`yarn babel-node path/to/file.js` するとよい．
念のために，`sandbox/`は自由に使える場所としており，`yarn deploy:sandbox && node tmp/file.js` でテストも可能だ．


### 開発(プロジェクト)

スクリプトファイルは，全て`src/js`の中に置いている．というのも，このスクリプトファイルは外部から実行される可能性があるので，なるべく浅い階層にしておきたかったからだ．

もし，変更した場合は，`yarn deploy`をすると，`dist/` ディレクトリに [Babel](https://babeljs.io/) される．
簡単な実行であれば，`yarn babel-node path/to/file.js` するとよい．
念のために，`sandbox/`は自由に使える場所としており，`yarn deploy:sandbox && node tmp/file.js` でテストも可能だ．

### 整形

もし，jsファイルを整形したい場合は，`yarn .lint` または，`yarn .prettier:all` を試してほしい．
この部分は特にこだわって，作成した．
`scripts/` 以下が，npm-scripts 用のコマンドの実装となっている．

もし，この部分の.babel.jsファイルを変更した場合，`yarn .babel:all`をすると，.js も変更される．

## 最後に

本ライブラリは，出来るだけ美しい開発が出来るように，ディレクトリの階層と整形処理に時間をかけた．
プロジェクトルートにある他のドットファイルについて説明しきれなかったが，もし気になる場合は調べたうえで是非とも試してみてほしい．

補足であるが，JavaScript(Node.js) を使用する場合は，絶対にBabelとPromise(async, await or callback)の理解が必須である．
Babelで最新の書き方を覚え，Node.jsの非同期処理に慣れた後に，自分なりに新しいライブラリを作成してほしい．
ただ，最近はTypeScript が主流みたいなので，挑戦したい方はそちらがいいかもしれない．JS の上位互換でBabelは勝手にやってくれるみたいだし．

その際に，本ライブラリのディレクトリの階層と設定ファイルを参考にしてくれると幸いである．

あぁ，あと強者はWebpackをやるのがよい時間つぶしになるだろう．かといって，Parcelが良いというわけでもない．
私は「Webpack疲れ」をしたのでお勧めはしないが...．あれは，大量の素晴らしいエラーを吐いてくれたので最高？のツールだから．

### License

- [MIT](https://github.com/kuro-kuroite/LICENSE/blob/master/LICENSE.md)
 
