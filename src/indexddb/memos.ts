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

//1ページ当たりの数量
const NUM_PER_PAGE: number = 10
export const getMemoPageCount = async (): Promise<number> => {
  // 配列の要素数を返却する
  const totalCount = await memos.count()
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
  return pageCount > 0 ? pageCount : 1
}

//テキスト履歴を取得する関数
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  // 取得する最初の位置を取得する
  const offset = (page - 1) * NUM_PER_PAGE
  return (
    memos
      .orderBy('datetime')
      .reverse()
      //リスト内の開始位置を設定
      .offset(offset)
      .limit(NUM_PER_PAGE)
      .toArray()
  )
}
