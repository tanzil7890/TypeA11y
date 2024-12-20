import { declare } from "@babel/helper-plugin-utils";
import { AriaValidator } from "./aria-validator";

export default declare(api => {
  api.assertVersion(7);
  
  const validator = new AriaValidator();

  return {
    name: "babel-plugin-a11y-compiler",
    visitor: {
      JSXElement(path) {
        validator.validateJSXElement(path);
      }
    }
  };
});