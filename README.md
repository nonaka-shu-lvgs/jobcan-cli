# Jobcan-CLI
CLIからコマンドを使ってJobcan上で出勤・退勤の打刻を行うツール

## インストール
下記の手順で実行してください
```bash
git clone git@github.com:lv-technology-strategy/jobcan-cli.git
yarn install
yarn setup
```

## 利用方法
打刻する前に認証情報を設定してください
```bash
jobcan auth configure
# メールアドレスとパスワードを聞かれるので入力してください。
# パスワードは平文で保存されるので気をつけてください
```

以下のコマンドを実行して問題なくメールアドレスとパスワードが表示されれば準備完了です
```bash
jobcan auth current
```

準備できれば次のコマンドで出勤・退勤の打刻を実行できます  
※ステータスを考慮して入力制御などは行っていないので十分に気をつけてください
```bash
jobcan timestamp attend #出勤
jobcan timestamp exit   #退勤
```
