const { destinations } = require("./data/destinations")
const path = require("path")
const fs = require("fs")

exports.onPostBuild = async () => {
  console.log("POST BUILD")

  fs.writeFileSync("public/lyon/bla.txt", "super")
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  const DestinationTemplate = path.resolve(
    `src/templates/DestinationTemplate.tsx`
  )

  for (const destination of destinations) {
    await createPage({
      path: `${destination.slug}`,
      component: DestinationTemplate,
      context: {
        title: destination.title,
      },
    })
  }
}
