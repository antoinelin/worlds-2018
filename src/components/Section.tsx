import * as React from 'react'
import { Query } from 'react-apollo'

class Section extends React.Component<SectionProps, SectionStates> {
  public render() {
    const { props: { query } } = this
    return (
      <Query query={ query }>
        {({ data }) => {
          console.log(data)
          return (
            <h3>Niceru</h3>
          )
        }}
      </Query>
    )
  }
}

export default Section

interface SectionProps {
  label: string
  query: any
}

interface SectionStates {}
