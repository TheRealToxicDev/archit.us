/* eslint-disable react/prop-types */
import { getColorModeInitScriptElement } from "@xstyled/emotion";
import axios from "axios";
import fs from "fs";
import path from "path";
import React from "react";
import SoureMapSupport from "source-map-support";

const TypeScript = require("ts-node");

// Bootstrap TypeScript
SoureMapSupport.install();
TypeScript.register({
  files: true,
  isolatedModules: false,
  compilerOptions: {
    module: "commonjs",
    target: "es2019",
  },
});

const { API_BASE } = require("./src/utility/api.node");

const noFlashPath = path.resolve(__dirname, "./src/build/no-flash.js");
const noFlashScript = fs.readFileSync(noFlashPath);
const config = {
  entry: path.join(__dirname, "src", "index.tsx"),
  minLoadTime: 500,
  getRoutes: async () => {
    // Load usage count from API
    let guildCount = 0;
    let userCount = 0;
    try {
      const result = await axios.get(`${API_BASE}/guild-count`);
      guildCount = result.data.guildCount;
      userCount = result.data.userCount;
    } catch (e) {
      console.log("An error ocurred while fetching usage count");
      console.log(e.toString());
    }

    return [
      {
        path: "/",
        template: "src/pages/Homepage",
        getData: async () => ({
          guildCount,
          userCount,
        }),
      },
      {
        path: "login",
        template: "src/pages/Login",
      },
      {
        path: "404",
        template: "src/pages/NotFound",
      },
      {
        path: "app",
        template: "src/dynamic/AppRoot",
      },
    ];
  },

  plugins: [
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
    require.resolve("react-static-plugin-sass"),
    require.resolve("react-static-plugin-emotion"),
  ],

  Document: ({ Html, Head, Body, children }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body className="dark-mode">
        {getColorModeInitScriptElement()}
        {children}
      </Body>
      <script
        // Dark mode anti-flash script
        dangerouslySetInnerHTML={{
          __html: noFlashScript,
        }}
      />
    </Html>
  ),
};

if (process.env.SITE_ROOT) {
  console.log(`Using SITE_ROOT=${process.env.SITE_ROOT}`);
  config.siteRoot = process.env.SITE_ROOT;
}

if (process.env.SITE_BASE_PATH) {
  console.log(`Using SITE_BASE_PATH=${process.env.SITE_BASE_PATH}`);
  config.basePath = process.env.SITE_BASE_PATH;
}

// Configure typescript based on args
const args = process.argv.slice(3);
let typeCheck = true;
if (args.includes("--no-type-check")) {
  console.log("Skipping type check");
  typeCheck = false;
}
config.plugins.push([
  require.resolve("react-static-plugin-typescript"),
  { typeCheck },
]);

export default config;
