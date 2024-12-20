
export const validRoles = [
    "alert",
    "button",
    "checkbox",
    "dialog",
    "grid",
    "heading",
    "img",
    "link",
    "menu",
    "menuitem",
    "progressbar",
    "tab",
    "tabpanel",
    "textbox"
  ] as const;
  
  export type ARIARole = typeof validRoles[number];
  
  export const ariaAttributesByRole: Record<ARIARole, string[]> = {
    button: ["aria-pressed", "aria-expanded", "aria-label", "aria-labelledby"],
    checkbox: ["aria-checked", "aria-label", "aria-labelledby"],
    dialog: ["aria-labelledby", "aria-label", "aria-modal"],
    // Add more role-specific attributes here
    heading: ["aria-level", "aria-label", "aria-labelledby"],
    // Default fallback for other roles
    alert: ["aria-label", "aria-labelledby"],
    grid: ["aria-label", "aria-labelledby"],
    img: ["aria-label", "aria-labelledby"],
    link: ["aria-label", "aria-labelledby"],
    menu: ["aria-label", "aria-labelledby"],
    menuitem: ["aria-label", "aria-labelledby"],
    progressbar: ["aria-label", "aria-labelledby", "aria-valuenow", "aria-valuemin", "aria-valuemax"],
    tab: ["aria-label", "aria-labelledby", "aria-selected"],
    tabpanel: ["aria-label", "aria-labelledby"],
    textbox: ["aria-label", "aria-labelledby", "aria-placeholder"]
  };