import * as React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    backgroud: white;
    border: 1px solid gray;
    color: gray;
  }
`

//コンポーネントに渡すパラメータの型の定義
interface Props {
  cancel?: boolean
  //ボタン内に表示するテキスト
  children: string
  //処理を行うだけで返り値を返却しない
  onClick: () => void
}

export const Button: React.FC<Props> = (props) => (
  <StyledButton
    onClick={props.onClick}
    //キャンセルがクリックされた場合
    className={props.cancel ? 'cancel' : ''}
  >
    {props.children}
  </StyledButton>
)
