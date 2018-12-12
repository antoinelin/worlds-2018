import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { FlexInline } from '@components/styles/FlexMixins'

const StyledHeader = styled.header`
  width: 100%;
`

const Nav = styled.nav`
  width: 100%;
  padding: 0;
  margin-top: 4.5rem;

  .Nav__Link-links {
    width: 100%;
    padding: 0;
  }
`

const NavLink = styled('li')<{ isActive: boolean }>`
  ${ FlexInline };
  width: ${props => props.theme.gridColumnWidth};
  margin-right: ${props => props.theme.gridGutterWidth};

  &:last-of-type {
    margin-right: 0;
  }

  .Nav__Link-link {
    color: ${props => props.isActive ? props.theme.white : props.theme.mediumGrey};
  }
`

const NavSlider = styled('nav')<{ index: number }>`
  width: 100%;
  margin: 2rem 0;

  .Nav__Slider-slider {
    width: ${ props => props.theme.gridColumnWidth };
    height: 0.2rem;
    background: ${ props => props.theme.violet };
    transform: translateX(${props => props.index
      ? props.index * (props.theme.gridColumnWidthNumber + props.theme.gridGutterWidthNumber)
      : 0 }px);
    transition: 200ms ease-out;
  }

  .Nav__Slider-background {
    width: 100%;
    height: 0.1rem;
    background: ${ props => props.theme.darkGrey }
  }
`

const NavLinks = [
  {
    id: 0,
    href: '/stage?slug=play-in-groups',
    as: '/stage/play-in-groups',
    label: 'Play-in groups',
  },
  {
    id: 1,
    href: '/stage?slug=play-in-elimination',
    as: '/stage/play-in-elimination',
    label: 'Play-in elimination',
  },
  {
    id: 2,
    href: '/stage?slug=group-stage',
    as: '/stage/group-stage',
    label: 'Group stage',
  },
  {
    id: 3,
    href: '/stage?slug=finals',
    as: '/stage/finals',
    label: 'Finals',
  },
]

const Header: React.SFC<HeaderProps> = ({ queryId }) => (
  <StyledHeader>
    <h1>Worlds 2018 scoreboard!!!</h1>
    <Nav>
      <ul className="Nav__Link-links">
        {
          NavLinks.map(link => (
            <NavLink key={ link.id } isActive={ queryId === link.id }>
              <Link href={ link.href } as={ link.as }>
                <a className="Nav__Link-link">{ link.label }</a>
              </Link>
            </NavLink>
          ))
        }
      </ul>
    </Nav>
    <NavSlider index={ queryId }>
      <div className="Nav__Slider-slider" />
      <div className="Nav__Slider-background" />
    </NavSlider>
  </StyledHeader>
)

export default Header

interface HeaderProps {
  queryId: number
}
