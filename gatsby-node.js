/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

//this gets called every single time the Gatsby build process is looking at each file
//We get access to each individual node with `node`
exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators; //createNodeField attaches a field (like frontmatter, html, excerpt) onto our blog posts

  //console.log(node.internal.type)
  //if this is a markdown remark file, let's get the slug from it and set it on the node itself
  if (node.internal.type === 'MarkdownRemark') {
    console.log('Markdown file found!')
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'posts'
    })

    createNodeField({
      node,
      name: 'slug',
      value: `/posts${slug}`
    })
  }

}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      } 
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/posts/PostPage.js'),
            context: {
              slug: node.fields.slug
            }
          })
        })
        resolve()
      })
  })
}