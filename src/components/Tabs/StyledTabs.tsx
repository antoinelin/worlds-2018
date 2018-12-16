import styled from 'styled-components'

export const StyleTabs = styled.div`
  width: 100%;
  margin-top: 4.5rem;
`

export const TabList = styled.ul`
  width: 100%;
  padding: 0;
  list-style: none;
  display: inline-flex;
`

export const TabsDivider = styled('div')<{ index: number }>`
  width: 100%;
  margin: 2rem 0;

  .Tabs__Divider-slider {
    width: 230px;
    height: 3px;
    background: #9013FE;
    transform: translate(${props => props.index ? props.index * 250 : 0 }px, 1px);
    transition: 200ms ease-out;

    @media (max-width: 1000px) {
      width: calc((100vw - 6rem) / 4);
      transform: translate(${props => props.index ? props.index * ((window.innerWidth - 48) / 4) : 0 }px, 1px);
    }
  }

  .Tabs__Divider-background {
    width: 100%;
    height: 1px;
    background: #292B2F;
  }
`
export const TabContent = styled.div`
  width: 100%;
`

export const StyleTab = styled.li`
  display: inline-flex;
  width: 230px;
  margin-right: 20px;

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 1000px) {
    margin-right: 0;
  }
`

export const Label = styled('button')<{ isActive: boolean }>`
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

    @media (max-width: 640px) {
      display: none;
    }
  }

  @media (max-width: 1000px) {
    font-size: 1.8rem;
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`
