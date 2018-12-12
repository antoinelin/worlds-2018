import * as React from 'react'
import styled from 'styled-components'
import { FlexInline, FlexRowAlignCentered } from '@components/styles/FlexMixins'

const StyleTab = styled.li`
  ${ FlexInline };
  width: ${props => props.theme.gridColumnWidth};
  margin-right: ${props => props.theme.gridGutterWidth};

  &:last-of-type {
    margin-right: 0;
  }
`

const Label = styled('button')<{ isActive: boolean }>`
  ${ FlexRowAlignCentered }
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: ${props => props.isActive ? props.theme.white : props.theme.mediumGrey};
  font-size: 2.4rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: left;
  transition: 200ms ease-out;

  .Tab__Label-icon {
    width: 2rem;
    height: auto;
    margin-right: 1rem;
  }
`

class Tab extends React.Component<TabProps, TabStates> {
  public onClick = () => {
    const { onClick, label, activeTabIndex } = this.props

    return onClick(label, activeTabIndex)
  }

  public render() {
    const { onClick, props: { activeTab, label } } = this

    let icon: JSX.Element

    if (activeTab === label) {
      icon = <img className="Tab__Label-icon" src="/static/worlds-icon.svg" alt="League of Legends Worlds icon" />
    }

    return (
      <StyleTab onClick={ onClick }>
        <Label isActive={ activeTab === label }>
          { icon }
          { label }
        </Label>
      </StyleTab>
    )
  }
}

export default Tab

interface TabProps {
  activeTab: string
  activeTabIndex: number
  label: string
  onClick: any
}

interface TabStates {}
