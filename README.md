# ARM Video Player Pro 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ARM Video Player Pro** は、Google Chrome の最新機能（Side Panel API）を活用した、Chromebook 専用の軽量・高速な動画プレイヤー拡張機能です。特に ARM プロセッサ（MediaTek Kompanio 等）を搭載したデバイスでの最適な動作を目指しています。

## 🌟 プロジェクトのビジョン
多くの動画プレイヤーが Intel 環境を前提とする中、本プロジェクトは ARM アーキテクチャを搭載した **Chromebook Plus** において、リソース消費を抑えつつ快適な視聴体験を提供することに特化しています。

## 📍 現在の状況とロードマップ
プロジェクトの透明性を保つため、現在の開発状況と今後の予定を公開しています。

- [x] **Phase 1**: Side Panel API への移行と UI の基本設計
- [x] **Phase 2**: キーボードショートカット（Space/左右キー）の実装
- [x] **Phase 3**: ドラッグ＆ドロップによる直感的なファイル読み込み
- [ ] **Phase 4**: 30日間の継続開発による安定性向上と、1Password OSS支援プログラムへの申請
- [ ] **Phase 5**: MKV 形式における PGS 字幕デコード機能のプロトタイプ作成
- [ ] **Phase 6**: ARM マルチコアを活かしたシーク速度の最適化

## ✨ 特徴
- **Side Panel 統合**: 作業を中断せずに動画を視聴可能。
- **ARM 最適化**: 低消費電力でスムーズなデコード。
- **キーボードフレンドリー**: スペースキーでの再生/停止など、効率的な操作感。

## ⌨️ キーボードショートカット
| キー | 動作 |
| :--- | :--- |
| `Space` | 再生 / 一時停止 |
| `ArrowRight` | 5秒進む |
| `ArrowLeft` | 5秒戻る |
| `F` | フルスクリーン表示 |

## 🛠️ 技術スタック
- Chrome Extension Manifest V3 / Side Panel API
- HTML5 Video API (Local Object URL)

## 📝 ライセンス
[MIT License](LICENSE)