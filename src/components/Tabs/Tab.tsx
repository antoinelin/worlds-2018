import * as React from 'react'

import {
  StyleTab,
  Label,
} from './StyledTabs'

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
