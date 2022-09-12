import Dexie from 'dexie'

//IndexdDBに保存するデータの型
export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

//データベースの作成(インスタンスの作成)
const datebase = new Dexie('markdown-editor')
//データベースのバージョン(dataetimeは一意)
datebase.version(1).stores({ memos: '&datetime' })
//テーブルで型宣言
const memos: Dexie.Table<MemoRecord, string> = datebase.table('memos')

export const putMemo = async (title: string, text: string): Promise<void> => {
  //dbを保存する
  const datetime = new Date().toISOString()
  //キャッシュに保存された値を上書きする
  await memos.put({ datetime, title, text })
}

//テキスト履歴を取得する関数
export const getMemos = (): Promise<MemoRecord[]> => {
  return memos.orderBy('datetime').reverse().toArray()
}
