import * as React from 'react'
import styled from 'styled-components'
import Tab from '@components/Tab'

const StyleTabs = styled.div`
  width: 100%;
  padding: 0;
  margin-top: 4.5rem;
`

const TabList = styled.ul`
  width: 100%;
  padding: 0;
  list-style: none;
`

const TabsDivider = styled('div')<{ index: number }>`
  width: 100%;
  margin: 2rem 0;

  .Tabs__Divider-slider {
    width: ${ props => props.theme.gridColumnWidth };
    height: 0.2rem;
    background: ${ props => props.theme.violet };
    transform: translateX(${props => props.index
      ? props.index * (props.theme.gridColumnWidthNumber + props.theme.gridGutterWidthNumber)
      : 0 }px);
    transition: 200ms ease-out;
  }

  .Tabs__Divider-background {
    width: 100%;
    height: 0.1rem;
    background: ${ props => props.theme.darkGrey }
  }
`

const TabContent = styled.div`
  width: 100%;
`

class Tabs extends React.Component<TabsProps, TabsStates> {
  static displayName = 'Tabs'

  state = {
    activeTab: this.props.children[0].props['data-label'],
    activeTabIndex: 0,
  }

  public onTabClick = (tab, tabIndex) => {
    return this.setState({
      activeTab: tab,
      activeTabIndex: tabIndex,
    })
  }

  public render() {
    const { onTabClick, props: { children }, state: { activeTab, activeTabIndex } } = this

    return (
      <StyleTabs>
        <TabList>
          {
            children.map((child, index) => {
              return (
                <Tab
                  key={ index }
                  activeTab={ activeTab }
                  activeTabIndex={ index }
                  label={ child.props['data-label'] }
                  onClick={ onTabClick }
                />
              )
            })
          }
        </TabList>
        <TabsDivider index={ activeTabIndex }>
          <div className="Tabs__Divider-slider" />
          <div className="Tabs__Divider-background" />
        </TabsDivider>
        <TabContent>
          {
            children.map(child => {
              return child.props['data-label'] === activeTab
                ? child.props.children
                : false
            })
          }
        </TabContent>
      </StyleTabs>
    )
  }
}

export default Tabs

interface TabsProps {
  children: JSX.Element[]
}

interface TabsStates {}
