module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
          alias: {
            "@mobile": "./src",
            "@shared": "../../packages/shared/src",
            "@supabase": "../../packages/supabase/src"
          }
        }
      ]
    ]
  };
};
