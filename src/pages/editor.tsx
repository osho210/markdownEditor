import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'

const { useState } = React
interface Props {
  text: string
  setText: (text: string) => void
}

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`
const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

//Editor <- React.FCという型、Reactのコンポーネントを返却する
// Jsxで<Editor>という形式で呼び出すことができる
//localstorageの初期値にstorangeKeyを設定する
export const Editor: React.FC<Props> = (props) => {
  const { text, setText } = props
  const [showModal, setShowModal] = useState(false)
  //itemの値が格納されていない場合はnullが返却されるので空文字を返却するように
  return (
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea value="テキスト入力エリア" />
        <TextArea
          //文字が入力された場合valueの値を更新して表示する
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Preview>
          {/* 子要素を取得する必要がある */}
          <ReactMarkdown children={text} />
        </Preview>
      </Wrapper>

      {/* モーダル表示有無の判定式 */}
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text)
            setShowModal(false)
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}
