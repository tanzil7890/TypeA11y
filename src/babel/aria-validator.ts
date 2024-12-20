import { NodePath } from "@babel/core";
import * as t from "@babel/types";
import { validRoles, ariaAttributesByRole, ARIARole } from "../types/aria";

export class AriaValidator {
  validateJSXElement(path: NodePath<t.JSXElement>) {
    const openingElement = path.node.openingElement;
    const roleAttribute = this.findAttribute(openingElement, "role");
    
    if (roleAttribute) {
      this.validateRole(path, roleAttribute);
    }

    this.validateAriaAttributes(path, openingElement);
    this.validateImgAlt(path);
    this.validateHeadingStructure(path);
  }

  private validateRole(path: NodePath<t.JSXElement>, roleAttribute: t.JSXAttribute) {
    if (t.isJSXExpressionContainer(roleAttribute.value)) {
      // Can't validate dynamic roles at compile time
      return;
    }

    if (t.isStringLiteral(roleAttribute.value)) {
      const role = roleAttribute.value.value;
      if (!validRoles.includes(role as any)) {
        throw path.buildCodeFrameError(`Invalid ARIA role "${role}". Valid roles are: ${validRoles.join(", ")}`);
      }
    }
  }

  private validateAriaAttributes(path: NodePath<t.JSXElement>, openingElement: t.JSXOpeningElement) {
    const roleAttribute = this.findAttribute(openingElement, "role");
    const role = roleAttribute && t.isStringLiteral(roleAttribute.value) ? roleAttribute.value.value as ARIARole : null;

    const ariaAttributes = openingElement.attributes.filter(attr => 
      t.isJSXAttribute(attr) && attr.name.name.toString().startsWith("aria-")
    ) as t.JSXAttribute[];

    for (const attr of ariaAttributes) {
      const attrName = attr.name.name.toString();
      if (role && !ariaAttributesByRole[role].includes(attrName)) {
        throw path.buildCodeFrameError(
          `Invalid ARIA attribute "${attrName}" for role "${role}". ` +
          `Allowed attributes are: ${ariaAttributesByRole[role].join(", ")}`
        );
      }
    }
  }

  private validateImgAlt(path: NodePath<t.JSXElement>) {
    const openingElement = path.node.openingElement;
    if (t.isJSXIdentifier(openingElement.name) && openingElement.name.name === "img") {
      const altAttribute = this.findAttribute(openingElement, "alt");
      if (!altAttribute) {
        throw path.buildCodeFrameError('img elements must have an alt attribute');
      }
    }
  }

  private validateHeadingStructure(path: NodePath<t.JSXElement>) {
    const openingElement = path.node.openingElement;
    if (
      t.isJSXIdentifier(openingElement.name) && 
      /^h[1-6]$/.test(openingElement.name.name)
    ) {
      const level = parseInt(openingElement.name.name.substring(1));
      const parentPath = path.findParent(p => {
        if (!p.isJSXElement()) return false;
        const parentName = p.node.openingElement.name;
        return t.isJSXIdentifier(parentName) && /^h[1-6]$/.test(parentName.name);
      });

      if (parentPath && parentPath.isJSXElement()) {
        const parentElement = parentPath.node.openingElement.name;
        if (t.isJSXIdentifier(parentElement)) {
          const parentLevel = parseInt(parentElement.name.substring(1));
          if (level - parentLevel > 1) {
            throw path.buildCodeFrameError(
              `Heading structure is invalid. Found h${level} after h${parentLevel}. ` +
              `Missing h${parentLevel + 1}.`
            );
          }
        }
      }
    }
  }

  private findAttribute(element: t.JSXOpeningElement, name: string): t.JSXAttribute | undefined {
    return element.attributes.find(
      attr => t.isJSXAttribute(attr) && attr.name.name === name
    ) as t.JSXAttribute | undefined;
  }
}