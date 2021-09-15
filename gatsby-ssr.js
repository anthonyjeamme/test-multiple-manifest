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

  if (findDestination) {
    headComponents.push(
      <link rel="manifest" href={`/${findDestination.slug}/manifest.json`} />
    )
  }
  replaceHeadComponents(headComponents)
}
