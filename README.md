# CLEAN PULSE - 清掃管理アプリ

## セットアップ手順

### 1. Vercelにデプロイ

1. GitHubにリポジトリを作成してこのコードをpush
2. https://vercel.com/ にアクセス
3. 「Import Project」→ GitHubリポジトリを選択
4. 環境変数を設定（下記参照）
5. 「Deploy」をクリック

### 2. 環境変数（Vercelに設定）

| 変数名 | 値 |
|--------|-----|
| `LINE_CHANNEL_ID` | `2008788577` |
| `LINE_CHANNEL_SECRET` | LINE Developersから取得した値 |

### 3. LINE DevelopersにコールバックURL設定

デプロイ後、Vercelから発行されるURLを使って：

1. LINE Developers → LINEログインチャネル
2. 「LINEログイン設定」→「コールバックURL」
3. `https://あなたのドメイン.vercel.app/api/auth/line-callback` を登録

### 4. 招待コード

| コード | 権限 |
|--------|------|
| `jomostay-clean` | スタッフ |
| `jomostay-admin` | 管理者 |
