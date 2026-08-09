# 移行ガイド: yarn + Pages Router 環境から乗り換える

以前 `dango` を `yarn` で環境構築していた人向けの手順です。教材のベースが大きく変わったので、上から順に実行してください。

## 何が変わったか

| 項目 | 旧 | 新 |
| --- | --- | --- |
| パッケージマネージャ | yarn (Berry) | pnpm |
| Node/pnpmのバージョン管理 | 各自の環境任せ | [mise](https://mise.jdx.dev/) でリポジトリ内に固定 |
| ルーティング | Pages Router (`src/pages/`) | App Router (`src/app/`) |
| Next.js | 14.x | 16.x |
| React | 18.x | 19.x |
| TypeScript | 5.x | 6.x |
| Tailwind CSS | 3.x (`tailwind.config.ts`) | 4.x (CSSファイルで`@import`) |
| ESLint | あり | 削除（教育上使わない方針のため） |

## 1. mise をインストールする

Node.js と pnpm のバージョンは `mise.toml` にリポジトリで固定してあります。各自でNode/pnpmを個別インストールする必要はありません。

### macOS / Linux

```
curl https://mise.run | sh
```

インストール後、シェルの設定（`.zshrc` など）に以下を追加してターミナルを再起動してください。

```
eval "$(mise activate zsh)"
```

`bash` を使っている場合は `mise activate bash` にしてください。

### Windows

PowerShell を開いて、以下のどちらかでインストールします。

**方法1: winget を使う場合（まずはこちらを試してください）**

Windows 11、および最近のWindows 10には winget が標準で入っています。

```powershell
winget install jdx.mise
```

`winget : 用語 'winget' は... 認識されません` のようなエラーが出た場合は、winget自体が入っていません。[Microsoft Store の「App Installer」](https://apps.microsoft.com/detail/9nblggh4nns1) をインストールしてから、もう一度実行してください。

**方法2: Scoop を使う場合**

Scoop は最初から入っていないので、先にScoop自体をインストールする一手間が必要です（その代わり、mise用のシムへのPATH追加まで自動でやってくれます）。

```powershell
irm get.scoop.sh | iex
scoop install mise
```

---

どちらかの方法でインストールできたら、PowerShellのプロファイルに以下を追加してターミナル（PowerShell）を再起動してください。

```powershell
echo '(&mise activate pwsh) | Out-String | Invoke-Expression' >> $HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```

> プロファイルファイルの場所が無いと言われた場合は、`$HOME\Documents\PowerShell` フォルダを先に作成してから再実行してください。
> コマンドプロンプト（`cmd.exe`）ではなく **PowerShell** を使ってください。VS Codeのターミナルもデフォルト設定でPowerShellになっているはずです。

### 共通: インストール確認

ターミナルを開き直した後、以下でバージョンが表示されればOKです。

```
mise --version
```

## 2. 古い環境を掃除する

`dango` のディレクトリで以下を実行し、yarn時代の成果物を削除します。

**macOS / Linux**

```
rm -rf node_modules .next out .yarn
rm -f yarn.lock
```

**Windows (PowerShell)**

```powershell
Remove-Item -Recurse -Force node_modules, .next, out, .yarn -ErrorAction SilentlyContinue
Remove-Item -Force yarn.lock -ErrorAction SilentlyContinue
```

`yarn.lock` や `.yarnrc.yml` はリポジトリからもすでに削除済みなので、`git pull` すれば手元からも消えます。

## 3. 最新化した内容を取り込む

```
git checkout main
git pull
```

## 4. mise でツールを揃える

`dango` ディレクトリ内で実行してください（`mise.toml` を検出して初回は信頼確認が入ります）。

```
mise trust
mise install
```

`node -v` と `pnpm -v` が `mise.toml` に書かれているバージョンになっていれば成功です。

## 5. 依存パッケージをインストールする

```
pnpm install
```

## 6. コマンドの対応表

| やりたいこと | 旧 (yarn) | 新 (pnpm) |
| --- | --- | --- |
| 依存インストール | `yarn` / `yarn install` | `pnpm install` |
| 開発サーバー起動 | `yarn dev` | `pnpm dev` |
| ビルド | `yarn build` | `pnpm build` |
| 本番起動 | `yarn start` | `pnpm start` |
| テスト | `yarn test` | `pnpm test` |
| フォーマット/lint | `yarn format` | なし（ESLint削除のため） |
| パッケージ追加 | `yarn add <pkg>` | `pnpm add <pkg>` |
| 開発用パッケージ追加 | `yarn add -D <pkg>` | `pnpm add -D <pkg>` |

## 7. コードの置き場所が変わっている

- `src/pages/index.tsx` は廃止され、以下に分割されました。
  - `src/app/page.tsx` … サーバー側で `countries.json` を読み込む Server Component
  - `src/components/HomeView.tsx` … ボタンやフォームなど、画面上で状態を持つ部分（`'use client'`）
- `src/pages/_app.tsx` → `src/app/layout.tsx`（共通レイアウト、`globals.css` の読み込みもここ）
- `src/pages/404.tsx` → `src/app/not-found.tsx`
- 新しいページを作るときは `src/pages/xxx.tsx` ではなく `src/app/xxx/page.tsx` を作成してください。

## 8. Tailwind CSS の書き方が変わっている

- `tailwind.config.ts` は廃止しました。デフォルト設定のままだったため、v4では設定ファイル自体が不要です。
- スタイルの起点は `src/styles/globals.css` の `@import 'tailwindcss';` です。クラス名（`bg-cyan-600` など）の使い方自体は変わっていません。

## 9. エディタの ESLint 拡張について

このリポジトリからは ESLint 設定を削除しました。VS Code などで ESLint 拡張を有効にしていると「設定が見つからない」という警告が出ることがありますが、動作に影響はないので無視して問題ありません。気になる場合はこのワークスペースだけ拡張を無効化してください。

## うまくいかないときは

- `pnpm install` でエラーが出る → `node -v` / `pnpm -v` が `mise.toml` の値と一致しているか確認してください（`mise install` をやり直す）。
- 画面が真っ白 / 古いページが表示される → `.next` を消してから `pnpm dev` をやり直してください（macOS/Linux: `rm -rf .next` / Windows: `Remove-Item -Recurse -Force .next`）。
- それでも解決しない場合は `node_modules` ごと消して `pnpm install` からやり直してください。
