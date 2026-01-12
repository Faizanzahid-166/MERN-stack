const keywords = {
  // Frontend Frameworks / Libraries
  react: ["react", "reactjs", "usestate", "useeffect", "usecontext", "redux", "jsx", "reactrouter", "router"],
  vue: ["vue", "vuejs", "vuex", "compositionapi", "vue-router"],
  angular: ["angular", "typescript", "ngif", "ngfor", "angularcli", "services", "components"],

  // Backend / Node.js
  node: ["node", "nodejs", "express", "app.listen", "router", "middleware", "cors", "bodyparser"],
  nestjs: ["nestjs", "nestjsjs", "decorators", "modules", "providers", "controllers", "services"],

  // Databases
  mongodb: ["mongo", "mongodb", "mongoose", "collection", "document", "db", "aggregate", "find", "insert"],
  mysql: ["mysql", "mariadb", "sql", "query", "table", "select", "insert", "update", "delete"],
  postgres: ["postgres", "postgresql", "sequelize", "pg", "table", "query", "insert", "update", "delete"],

  // CSS / Styling
  css: ["css", "scss", "sass", "tailwind", "bootstrap", "materialui", "styledcomponents", "flex", "grid"],
  html: ["html", "html5", "doctype", "head", "body", "div", "span", "section", "header", "footer"],

  // Programming Languages
  javascript: ["javascript", "js", "es6", "typescript", "ts", "async", "await", "promise", "callback", "function"],
  python: ["python", "django", "flask", "pandas", "numpy", "tensorflow", "keras", "script", "def", "lambda"],
  java: ["java", "spring", "springboot", "jvm", "maven", "gradle", "class", "object", "interface"],

  // Testing
  jest: ["jest", "test", "expect", "describe", "it", "mock", "enzyme"],
  mocha: ["mocha", "chai", "assert", "describe", "it"],

  // DevOps / Tools
  docker: ["docker", "container", "dockerfile", "compose", "volume", "image"],
  git: ["git", "github", "gitlab", "branch", "commit", "merge", "pull", "push", "clone"],
  ci_cd: ["ci", "cd", "jenkins", "githubactions", "pipeline", "workflow"],

  // APIs / Networking
  rest: ["rest", "api", "endpoint", "get", "post", "put", "delete", "fetch", "axios"],
  graphql: ["graphql", "query", "mutation", "resolver", "apollo", "typegraphql"],

  // Cloud / Hosting
  aws: ["aws", "s3", "ec2", "lambda", "cloudwatch", "route53", "rds"],
  firebase: ["firebase", "firestore", "auth", "functions", "realtime", "storage"],

  // Mobile / Cross-platform
  reactnative: ["reactnative", "rn", "usestate", "useeffect", "jsx", "components", "navigation"],
  flutter: ["flutter", "dart", "widget", "statelesswidget", "statefulwidget"],

  // Machine Learning / AI
  tensorflow: ["tensorflow", "keras", "model", "fit", "compile", "layers", "activation"],
  pytorch: ["pytorch", "tensor", "autograd", "nn", "module", "optimizer"],

  // Misc / Utilities
  npm: ["npm", "package", "install", "script", "dependency"],
  yarn: ["yarn", "add", "install", "remove", "upgrade"],
  webpack: ["webpack", "bundle", "loader", "plugin", "config"],
  babel: ["babel", "transform", "preset", "plugin"],
};

const detectStack = (text) => {
  const detected = [];

  for (const tech in keywords) {
    for (const word of keywords[tech]) {
      if (text.includes(word)) {
        detected.push(tech);
        break;
      }
    }
  }

  return detected;
};

export default detectStack;
