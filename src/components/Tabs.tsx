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
  display: inline-flex;
`

const TabsDivider = styled('div')<{ index: number }>`
  width: 100%;
  margin: 2rem 0;

  .Tabs__Divider-slider {
    width: 230px;
    height: 0.2rem;
    background: #9013FE;
    transform: translateX(${props => props.index ? props.index * 250 : 0 }px);
    transition: 200ms ease-out;
  }

  .Tabs__Divider-background {
    width: 100%;
    height: 0.1rem;
    background: #292B2F;
  }
`

const TabContent = styled.div`
  width: 100%;
`

class Tabs extends React.Component<TabsProps, TabsStates> {
  static displayName = 'Tabs'

  constructor(props: TabsProps) {
    super(props)

    this.state = {
      activeTabSlug: this.props.activeTabSlug ? this.props.activeTabSlug : this.props.children[0].props['data-slug'],
      activeTabIndex: this.props.activeTabIndex ? this.props.activeTabIndex : 0,
    }

    this.onTabClick = this.onTabClick.bind(this)
  }

  public async onTabClick(tabIndex: number, tabSlug: string) {
    if (typeof this.props.onTabClick !== undefined) {
      this.setState({
        activeTabIndex: tabIndex,
      })

      await this.props.onTabClick(tabSlug)

      return this.setState({ activeTabSlug: tabSlug })
    }

    return this.setState({
      activeTabIndex: tabIndex,
      activeTabSlug: tabSlug,
    })
  }

  public render() {
    const { onTabClick, props: { children }, state: { activeTabIndex, activeTabSlug } } = this

    return (
      <StyleTabs>
        <TabList>
          {
            children.map((child, index) => {
              return (
                <Tab
                  key={ index }
                  activeTab={ activeTabIndex }
                  index={ index }
                  label={ child.props['data-label'] }
                  slug={ child.props['data-slug'] }
                  onClick={ onTabClick }
                />
              )
            })
          }
        </TabList>
        <TabsDivider className="Tabs__Divider" index={ activeTabIndex }>
          <div className="Tabs__Divider-slider" />
          <div className="Tabs__Divider-background" />
        </TabsDivider>
        <TabContent>
          {
            children.map(child => {
              return child.props['data-slug'] === activeTabSlug
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
  onTabClick?: any
  activeTabSlug?: string
  activeTabIndex?: number
}

interface TabsStates {
  activeTabIndex: number
  activeTabSlug: string
}
