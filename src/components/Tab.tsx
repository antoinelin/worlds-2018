import * as React from 'react'
import styled from 'styled-components'

const StyleTab = styled.li`
  display: inline-flex;
  width: 230px;
  margin-right: 20px;

  &:last-of-type {
    margin-right: 0;
  }
`

const Label = styled('button')<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: ${ props => props.isActive ? '#D1D1D1' : '#525252' };
  font-size: 2.4rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: left;
  transition: 200ms ease-out;

  &:hover {
    color: #D1D1D1;
  }

  .Tab__Label-icon {
    width: 2rem;
    height: auto;
    margin-right: 1rem;
  }
`

class Tab extends React.Component<TabProps, TabStates> {
  public onClick = () => {
    const { onClick, index, slug } = this.props

    return onClick(index, slug)
  }

  public render() {
    const { onClick, props: { label, activeTab, index } } = this

    let icon: JSX.Element

    if (activeTab === index) {
      icon = <img className="Tab__Label-icon" src="/static/worlds-icon.svg" alt="League of Legends Worlds icon" />
    }

    return (
      <StyleTab className="tab" onClick={ onClick }>
        <Label isActive={ activeTab === index }>
          { icon }
          { label }
        </Label>
      </StyleTab>
    )
  }
}

export default Tab

interface TabProps {
  activeTab: number
  index: number
  label: string
  onClick: any
  slug: string
}

interface TabStates {}
