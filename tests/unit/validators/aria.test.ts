import { AriaValidator } from '../../../src/babel/aria-validator';
import * as t from '@babel/types';
import { NodePath } from '@babel/core';
import { it, describe, expect, beforeEach } from '@jest/globals';

describe('AriaValidator', () => {
  let validator: AriaValidator;

  beforeEach(() => {
    validator = new AriaValidator();
  });

  describe('validateRole', () => {
    it('should accept valid ARIA roles', () => {
      const jsxElement = createJSXElement('div', [
        createAttribute('role', 'button')
      ]);

      expect(() => {
        validator.validateJSXElement(createNodePath(jsxElement));
      }).not.toThrow();
    });

    it('should reject invalid ARIA roles', () => {
      const jsxElement = createJSXElement('div', [
        createAttribute('role', 'invalid-role')
      ]);

      expect(() => {
        validator.validateJSXElement(createNodePath(jsxElement));
      }).toThrow(/Invalid ARIA role/);
    });
  });

  // Helper functions with proper implementations
  function createJSXElement(
    name: string, 
    attributes: t.JSXAttribute[] = []
  ): t.JSXElement {
    const identifier = t.jsxIdentifier(name);
    const openingElement = t.jsxOpeningElement(identifier, attributes, false);
    const closingElement = t.jsxClosingElement(identifier);
    
    return t.jsxElement(
      openingElement,
      closingElement,
      [], // children
      false // self-closing
    );
  }

  function createAttribute(
    name: string, 
    value: string
  ): t.JSXAttribute {
    return t.jsxAttribute(
      t.jsxIdentifier(name),
      t.stringLiteral(value)
    );
  }

  function createNodePath(element: t.JSXElement): NodePath<t.JSXElement> {
    // This is a simplified mock of NodePath
    return {
      node: element,
      buildCodeFrameError: (msg: string) => new Error(msg)
    } as unknown as NodePath<t.JSXElement>;
  }
}); 