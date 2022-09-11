import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

const Header = styled.h1`
  color: red;
`

const Main =(<Header>Markdown Editor</Header>)

//画面を描写する
render(Main,document.getElementById('app'))