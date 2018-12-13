import * as React from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { withRouter } from 'next/router'

import { FlexColumnCentered } from '@components/styles/FlexMixins'
import { ButtonMixin } from '@components/styles/ButtonStyle'

const StyledHomepage = styled.section`
  ${ FlexColumnCentered }
  height: calc(100vh - 30rem);
`

const Logo = styled.img`
  opacity: 0;
  width: auto;
  height: 30vh;
  transform: translateY(80px);
`

const StyledLink = styled.a`
  ${ ButtonMixin }
  font-size: 2rem;
  opacity: 0;
`

const Title = styled.h1`
  opacity: 0;
`

class Home extends React.Component<HomeProps, HomeStates> {
  state = { isMounted: false }

  public componentDidMount = () => {
    this.setState({ isMounted: true }, () => this.show() )
  }

  public show = () => {
    const timeline = anime.timeline()
    timeline
      .add({
        targets: '#worlds-logo',
        delay: 500,
        duration: 600,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#worlds-logo',
        duration: 600,
        easing: 'easeInOutQuart',
        translateY: [80, 0],
      })
      .add({
        targets: '.staggeredItem',
        duration: 600,
        delay: (element, index) =>  index * 100,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
  }

  public hide = () => {
    const timeline = anime.timeline({
      complete: () => this.props.router.push('/stage/play-in-groups'),
    })

    timeline
      .add({
        targets: '#worlds-logo, .staggeredItem',
        duration: 600,
        delay: (element, i) =>  i * 100,
        easing: 'easeInOutQuart',
        opacity: 0,
      })
  }

  public render() {
    return (
      <React.Fragment>
        <StyledHomepage>
          <Logo id="worlds-logo" className="Styled__Homepage-logo" src="/static/worlds-logo.png" alt="Worlds Logotype"/>
          <Title className="staggeredItem">Worlds 2018 scoreboard</Title>
          <StyledLink className="staggeredItem" onClick={ () => this.hide() }>
            Discover
          </StyledLink>
        </StyledHomepage>
      </React.Fragment>
    )
  }
}

export default withRouter(Home)

interface HomeProps {
  router: any
}

interface HomeStates {
  isMounted: boolean
}
