import { defineConfig } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(
        compat.extends("eslint:recommended", "plugin:import/errors", "plugin:import/warnings"),
    ),

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: babelParser,
        ecmaVersion: 11,
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,
        },
    },

    rules: {
        indent: ["error", 4, {
            SwitchCase: 1,
            MemberExpression: 0,
        }],

        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-trailing-spaces": ["error"],
        "prefer-const": ["warn"],
        "no-var": ["warn"],
        eqeqeq: ["warn"],
        "no-new-object": ["error"],
        "no-array-constructor": ["error"],
        "space-before-blocks": ["error"],
        "no-duplicate-imports": ["error"],
        "one-var": ["error", "never"],
        "no-nested-ternary": ["error"],
        "no-unneeded-ternary": ["error"],
    },
}]);