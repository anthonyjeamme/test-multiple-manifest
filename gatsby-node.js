const { destinations } = require("./data/destinations")
const path = require("path")
const fs = require("fs")
const request = require("request")
const sharp = require("sharp")

const download = (uri, filename, callback) =>
  new Promise(resolve => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", resolve)
    })
  })

const resize = async (originalImagePath, sizes, outpath) => {
  for (const size of sizes) {
    try {
      await sharp(originalImagePath)
        .resize(size, size)
        .toFile(`${outpath}/icon-${size}x${size}.png`)
    } catch (error) {
      console.log(error)
    }
  }
}

const generateIcons = async (originalIconUri, rootPath) => {
  await download(originalIconUri, `${rootPath}/icon-512x512.png`)

  await resize(
    `${rootPath}/icon-512x512.png`,
    [384, 256, 192, 144, 96, 72, 48],
    `${rootPath}`
  )
}

exports.onPostBuild = async () => {
  for (const { slug, color, icon } of destinations) {
    fs.writeFileSync(
      `public/${slug}/manifest.json`,
      JSON.stringify(generateManifest(slug, slug, `/${slug}`, color))
    )

    await generateIcons(icon, `public/${slug}`)
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
        src: "./icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "./icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "./icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "./icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "./icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "./icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "./icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
