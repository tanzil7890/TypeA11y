import ts from "typescript";
import { validRoles, ariaAttributesByRole, ARIARole } from "../types/aria";

export function createTransformer(): ts.TransformerFactory<ts.SourceFile> {
  return context => {
    return sourceFile => {
      const visitor = (node: ts.Node): ts.Node => {
        if (ts.isJsxElement(node)) {
          validateJsxElement(node, sourceFile);
        }
        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    };
  };
}

function findAttribute(element: ts.JsxOpeningElement, name: string): ts.JsxAttribute | undefined {
  return element.attributes.properties.find(
    attr => ts.isJsxAttribute(attr) && ts.isIdentifier(attr.name) && attr.name.escapedText === name
  ) as ts.JsxAttribute | undefined;
}

function validateJsxElement(node: ts.JsxElement, sourceFile: ts.SourceFile) {
  const roleAttr = findAttribute(node.openingElement, "role");
  if (roleAttr) {
    validateRole(roleAttr, sourceFile);
  }

  validateAriaAttributes(node.openingElement, roleAttr, sourceFile);
  validateImgAlt(node, sourceFile);
  validateHeadingStructure(node, sourceFile);

  return node;
}

function validateRole(attr: ts.JsxAttribute, sourceFile: ts.SourceFile) {
  if (attr.initializer && ts.isStringLiteral(attr.initializer)) {
    const role = attr.initializer.text;
    if (!validRoles.includes(role as any)) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(attr.pos);
      throw new Error(
        `Invalid ARIA role "${role}" at ${sourceFile.fileName}:${line + 1}:${character + 1}. ` +
        `Valid roles are: ${validRoles.join(", ")}`
      );
    }
  }
}

function validateAriaAttributes(element: ts.JsxOpeningElement, roleAttr: ts.JsxAttribute | undefined, sourceFile: ts.SourceFile) {
  const role = roleAttr?.initializer && ts.isStringLiteral(roleAttr.initializer) 
    ? roleAttr.initializer.text as ARIARole 
    : null;

  const ariaAttributes = element.attributes.properties.filter(
    attr => ts.isJsxAttribute(attr) && 
           ts.isIdentifier(attr.name) && 
           attr.name.escapedText.toString().startsWith("aria-")
  ) as ts.JsxAttribute[];

  for (const attr of ariaAttributes) {
    if (role && ts.isIdentifier(attr.name) && !ariaAttributesByRole[role].includes(attr.name.escapedText.toString())) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(attr.pos);
      throw new Error(
        `Invalid ARIA attribute "${attr.name.escapedText}" for role "${role}" at ${sourceFile.fileName}:${line + 1}:${character + 1}. ` +
        `Allowed attributes are: ${ariaAttributesByRole[role].join(", ")}`
      );
    }
  }
}

function validateImgAlt(node: ts.JsxElement, sourceFile: ts.SourceFile) {
  if (ts.isIdentifier(node.openingElement.tagName) && node.openingElement.tagName.text === 'img') {
    const altAttr = findAttribute(node.openingElement, "alt");
    if (!altAttr) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.pos);
      throw new Error(
        `img elements must have an alt attribute at ${sourceFile.fileName}:${line + 1}:${character + 1}`
      );
    }
  }
}

function validateHeadingStructure(node: ts.JsxElement, sourceFile: ts.SourceFile) {
  if (ts.isIdentifier(node.openingElement.tagName)) {
    const tagName = node.openingElement.tagName.text;
    if (/^h[1-6]$/.test(tagName)) {
      const level = parseInt(tagName.substring(1));
      let parent = node.parent;
      while (parent) {
        if (ts.isJsxElement(parent) && 
            ts.isIdentifier(parent.openingElement.tagName) && 
            /^h[1-6]$/.test(parent.openingElement.tagName.text)) {
          const parentLevel = parseInt(parent.openingElement.tagName.text.substring(1));
          if (level - parentLevel > 1) {
            const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.pos);
            throw new Error(
              `Heading structure is invalid at ${sourceFile.fileName}:${line + 1}:${character + 1}. ` +
              `Found h${level} after h${parentLevel}. Missing h${parentLevel + 1}.`
            );
          }
          break;
        }
        parent = parent.parent;
      }
    }
  }
}

// Add more TypeScript validation functions here...