const { destinations } = require("./data/destinations")
const path = require("path")
const fs = require("fs")

exports.onPostBuild = async () => {
  for (const { slug } of destinations) {
    fs.writeFileSync(
      `public/${slug}/manifest.json`,
      JSON.stringify(generateManifest(slug, slug, `/${slug}`, "#ff0000"))
    )
  }
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

const generateManifest = (name, short_name, start_url, color) => {
  return {
    name,
    short_name,
    start_url,
    background_color: color,
    theme_color: color,
    display: "minimal-ui",
    cacheDigest: "4a9773549091c227cd2eb82ccd9c5e3a",
    icons: [
      {
        src: "icons/icon-48x48.png?v=4a9773549091c227cd2eb82ccd9c5e3a",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icons/icon-72x72.png?v=4a9773549091c227cd2eb82ccd9c5e3a",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icons/icon-96x96.png?v=4a9773549091c227cd2eb82ccd9c5e3a",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icons/icon-144x144.png?v=4a9773549091c227cd2eb82ccd9c5e3a",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icons/icon-192x192.png?v=4a9773549091c227cd2eb82ccd9c5e3a",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/icon-256x256.png?v=4a9773549091c227cd2eb82ccd9c5e3a",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "icons/icon-384x384.png?v=4a9773549091c227cd2eb82ccd9c5e3a",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "icons/icon-512x512.png?v=4a9773549091c227cd2eb82ccd9c5e3a",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
