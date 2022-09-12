import * as React from 'react'
import { render } from 'react-dom'
// import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
//アップデートで名前が変更になる可能性もあり
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Editor } from './pages/editor'
import { History } from './pages/history'

const GlobalStyle = createGlobalStyle`
   body * {
     box-sizing: border-box;
   }
 `

const Main = (
  <>
    <GlobalStyle />
    {/* ルーティングの範囲を定義 Router外は対象外 */}
    <Router>
      {/* exactは完全一致 */}
      <Route exact path={'/editor'}>
        <Editor />
      </Route>
      <Route exact path="/history">
        <History />
      </Route>
      <Redirect to="/editor" path="*" />
    </Router>
  </>
)

//画面を描写する
render(Main, document.getElementById('app'))

//props.children -> 子要素の値を取得できる
//イベントの発生->状態の更新->画面の更新->イベントの発生
//状態を変更させる場合はuseState専用の巻子を実行する必要がある
//Reactを使用する場合はブラウザ上でのDOM操作は実行してはいけない
