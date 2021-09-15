const React = require("react")

const { destinations } = require("./data/destinations")

export const onPreRenderHTML = ({
  pathname,
  getHeadComponents,
  replaceHeadComponents,
  ...props
}) => {
  const headComponents = getHeadComponents()

  const findDestination = destinations.find(({ slug }) =>
    pathname.includes(slug)
  )

  console.log(findDestination)

  if (pathname.includes("/lyon/")) {
    headComponents.push(<link rel="manifest" href="/lyon/manifest.json" />)
  }

  replaceHeadComponents(headComponents)
}
