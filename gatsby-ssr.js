const React = require("react")

export const onPreRenderHTML = ({
  pathname,
  getHeadComponents,
  replaceHeadComponents,
  ...props
}) => {
  const headComponents = getHeadComponents()

  console.log("ICI", pathname, props)
  if (pathname.includes("/lyon/")) {
    headComponents.push(<link rel="manifest" href="/lyon/manifest.json" />)
  }

  replaceHeadComponents(headComponents)
}
