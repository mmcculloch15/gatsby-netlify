import React, { Component } from 'react'

export default class PostPage extends Component {
  render() {
    const { frontmatter, html } = this.props.data.markdownRemark
    return (
      <div>
        <h1>{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        <p>{html}
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: {
      slug: {
        eq: $slug
      }
    }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD YYYY")
      }
    }
  }
`
