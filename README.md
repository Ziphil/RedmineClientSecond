<div align="center">
<h1>Redmine に作業時間を登録するやつ</h1>
</div>


## 使い方
### API キーの確認
Redmine のマイページを開き、ページ右部に記載されている API キーをコピーしておいてください。

### インストール
GitHub Actions にビルド済みのファイルがあるので、これをダウンロードするのが簡便です。

1. [Actions のページ](https://github.com/Ziphil/RedmineClientSecond/actions/workflows/deploy.yml)に移動
2. 表示されているリストの一番上をクリック
3. ページ下部の「Artifacts」欄で OS に合ったものをクリック
4. ダウンロードした ZIP ファイルを解凍
5. 中にあるインストーラを起動

Mac の場合は、さらにコンソールで以下のコマンドを実行してください。
```
xattr -c "/Applications/Redmine Client Second.app"
```

### 手動ビルド
GitHub Actions のファイルが存在しなかったり使えなかったりする場合は、ローカル環境で手動でビルドすることもできます。

このリポジトリをクローンして、以下のコマンドを順番に実行してください。
`product` ファイル内にビルドしたファイルが生成されます。
```
npm ci
npm run build
npm run pack:mac
```

### 設定
以下の場所に `settings.json` を作ってください。

- Windows — `%APPDATA%/redmine-client-second`
- Mac OS — `~/Library/Application Support/redmine-client-second`

その上で、以下の内容を書き込んでください。

```json
{
  "redmineUrl": "https://vildas.cloudmine.jp",
  "redmineKey": "(API キー)"
}
```

`redmineUrl` と `redmineKey` 以外にも、任意で設定できる項目があります。
詳細は以下をご覧ください。

## 設定項目
### `exceptionalOffDates`
追加の休日です。
`YYYY-MM-DD` 形式の文字列の配列を指定してください。

デフォルトでは、週末と祝日が休日扱いされ、最初に表示されるタイムラインから除外されます。
ここに追加の休日を設定しておくと、その日も除外されるようになります。

```json
"exceptionalOffDates": [
  "2024-01-01",
  "2024-03-06"
],
```