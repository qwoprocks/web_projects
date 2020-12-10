module.exports = {
    pathPrefix: "/web_projects",
    plugins: [
        "gatsby-plugin-styled-components",
        "gatsby-plugin-typescript",
        "gatsby-plugin-root-import",
        {
            resolve: "gatsby-plugin-web-font-loader",
            options: {
                google: {
                    families: ["Roboto", "Material Icons"]
                }
            }
        }
    ]
}
